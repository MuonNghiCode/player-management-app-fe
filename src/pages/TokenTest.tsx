import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { memberService } from "../services";

const TokenTest: React.FC = () => {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const [tokenInfo, setTokenInfo] = useState<any>(null);
  const [apiTest, setApiTest] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setTokenInfo(payload);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  const testMemberAPI = async () => {
    try {
      const response = await memberService.getAll({ page: 1, limit: 10 });
      setApiTest({ success: true, data: response });
    } catch (error: any) {
      setApiTest({ success: false, error: error.message });
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Token & Auth Test</h1>

      {/* Auth Status */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Auth Status</h2>
        <div className="space-y-2">
          <p>Authenticated: {isAuthenticated ? "✅" : "❌"}</p>
          <p>Is Admin: {isAdmin ? "✅" : "❌"}</p>
          <p>User: {user ? JSON.stringify(user, null, 2) : "Not logged in"}</p>
        </div>
      </div>

      {/* Token Info */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Token Info</h2>
        <div className="space-y-2">
          <p>Token exists: {localStorage.getItem("token") ? "✅" : "❌"}</p>
          <p>
            Token (first 50 chars):{" "}
            {localStorage.getItem("token")?.substring(0, 50)}...
          </p>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {tokenInfo ? JSON.stringify(tokenInfo, null, 2) : "No token info"}
          </pre>
        </div>
      </div>

      {/* API Test */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">API Test</h2>
        <button
          onClick={testMemberAPI}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Test Member API
        </button>

        {apiTest && (
          <div className="mt-4">
            <h3 className="font-semibold">Result:</h3>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(apiTest, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenTest;
