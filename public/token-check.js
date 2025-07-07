// Check localStorage token
console.log("=== Token Check ===");
console.log("Token exists:", !!localStorage.getItem("token"));
console.log("Token length:", localStorage.getItem("token")?.length);
console.log("Token preview:", localStorage.getItem("token")?.substring(0, 100));

// Try to decode token
const token = localStorage.getItem("token");
if (token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    console.log("Token payload:", payload);
    console.log("Token expiry:", new Date(payload.exp * 1000));
    console.log(
      "Token valid until:",
      new Date(payload.exp * 1000).toLocaleString()
    );
  } catch (error) {
    console.error("Error decoding token:", error);
  }
}

// Test API call
fetch("http://localhost:5000/accounts", {
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log("API Test Result:", data);
  })
  .catch((error) => {
    console.error("API Test Error:", error);
  });
