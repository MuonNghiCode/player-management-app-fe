# Football Player Management System - Frontend

## 📖 Mô tả dự án

Đây là phần Frontend của hệ thống quản lý cầu thủ bóng đá, được xây dựng bằng **React** với **TypeScript**, **Vite**, và **TailwindCSS**. Giao diện hiện đại với hiệu ứng glassmorphism, animation mượt mà và responsive design hoàn hảo.

## 🚀 Tính năng chính

- **Giao diện hiện đại**: Design premium với glassmorphism và gradient effects
- **Responsive Design**: Tối ưu cho mọi thiết bị (Desktop, Tablet, Mobile)
- **Animation mượt mà**: Sử dụng Framer Motion cho transitions và animations
- **Quản lý cầu thủ**: Xem, tạo, sửa, xóa thông tin cầu thủ
- **Quản lý đội bóng**: CRUD operations cho đội bóng
- **Dashboard Admin**: Giao diện quản trị với thống kê và biểu đồ
- **Authentication**: Đăng nhập/đăng ký với JWT
- **Comment System**: Bình luận và tương tác với cầu thủ
- **Search & Filter**: Tìm kiếm và lọc cầu thủ theo nhiều tiêu chí
- **Dark/Light Mode**: Chế độ sáng/tối (tùy chọn)

## 🛠 Công nghệ sử dụng

### Core Technologies

- **React 18** - UI Library
- **TypeScript** - Type safety
- **Vite** - Build tool và dev server
- **React Router DOM** - Client-side routing

### Styling & UI

- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Icons** - Icon components
- **Lucide React** - Modern icon library
- **Headless UI** - Unstyled, accessible UI components

### State Management & API

- **Axios** - HTTP client
- **React Query/SWR** (optional) - Server state management

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks (optional)

## 📁 Cấu trúc thư mục

```
AssignmentFE/
├── index.html             # Entry HTML file
├── package.json           # Dependencies và scripts
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # TailwindCSS configuration
├── tsconfig.json          # TypeScript configuration
├── eslint.config.js       # ESLint configuration
├── public/
│   └── vite.svg          # Static assets
├── src/
│   ├── main.tsx          # Application entry point
│   ├── App.tsx           # Main App component
│   ├── App.css           # Global styles
│   ├── vite-env.d.ts     # Vite type definitions
│   ├── assets/           # Static assets (images, icons)
│   │   └── react.svg
│   ├── components/       # Reusable components
│   │   ├── common/       # Common UI components
│   │   ├── players/      # Player-related components
│   │   ├── teams/        # Team-related components
│   │   └── ui/           # Base UI components
│   ├── constants/        # Application constants
│   │   ├── api.ts        # API endpoints
│   │   └── index.ts      # Export all constants
│   ├── layouts/          # Layout components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── layout.tsx
│   ├── pages/            # Page components
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── admin/        # Admin pages
│   │   └── index.ts      # Export all pages
│   ├── routes/           # Routing configuration
│   │   └── index.tsx
│   ├── services/         # API services
│   │   ├── base.ts       # Base API service
│   │   ├── authService.ts
│   │   ├── playerService.ts
│   │   ├── teamService.ts
│   │   ├── memberService.ts
│   │   └── index.ts      # Export all services
│   ├── styles/           # Custom styles
│   │   ├── globals.css   # Global CSS
│   │   └── scrollbar.css # Custom scrollbar styles
│   └── types/            # TypeScript type definitions
│       ├── entities.ts   # Entity types
│       ├── requests.ts   # Request types
│       ├── responses.ts  # Response types
│       └── index.ts      # Export all types
```

## ⚙️ Cài đặt và chạy dự án

### 1. Clone repository

```bash
git clone <repository-url>
cd AssignmentFE
```

### 2. Cài đặt dependencies

```bash
npm install
# hoặc
yarn install
# hoặc
pnpm install
```

### 3. Cấu hình Environment Variables

Tạo file `.env` trong thư mục gốc:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_NAME=Football Management System
```

### 4. Khởi chạy development server

```bash
npm run dev
# hoặc
yarn dev
# hoặc
pnpm dev
```

Ứng dụng sẽ chạy tại `http://localhost:5173`

### 5. Build cho production

```bash
npm run build
# hoặc
yarn build
# hoặc
pnpm build
```

### 6. Preview production build

```bash
npm run preview
# hoặc
yarn preview
# hoặc
pnpm preview
```

## 🎨 Design System

### Color Palette

- **Primary**: Emerald (Green) - `emerald-500`, `emerald-600`
- **Secondary**: Blue - `blue-500`, `blue-600`
- **Accent**: Purple - `purple-500`, `purple-600`
- **Neutral**: Gray scales - `gray-100` to `gray-900`
- **Success**: Green - `green-500`
- **Warning**: Yellow - `yellow-500`
- **Error**: Red - `red-500`

### Typography

- **Font Family**: Inter, system-ui, sans-serif
- **Headings**: Bold weights (600-800)
- **Body**: Regular weight (400)
- **Captions**: Light weight (300)

### Spacing

- **Base unit**: 4px (0.25rem)
- **Common spacing**: 8px, 12px, 16px, 24px, 32px, 48px

### Border Radius

- **Small**: 4px (`rounded`)
- **Medium**: 8px (`rounded-lg`)
- **Large**: 12px (`rounded-xl`)
- **Extra Large**: 16px (`rounded-2xl`)

## 🧩 Components

### Common Components

- **Button**: Các variant khác nhau (primary, secondary, outline)
- **Input**: Form inputs với validation
- **Modal**: Dialog và popup modals
- **Card**: Container components với glassmorphism
- **Loader**: Loading states và spinners
- **Toast**: Notification system

### Player Components

- **PlayerCard**: Card hiển thị thông tin cầu thủ
- **PlayerDetail**: Trang chi tiết cầu thủ
- **PlayerForm**: Form tạo/sửa cầu thủ
- **PlayerList**: Danh sách cầu thủ với pagination

### Layout Components

- **Header**: Navigation bar với menu
- **Footer**: Footer với thông tin liên hệ
- **Sidebar**: Navigation sidebar cho admin
- **Layout**: Main layout wrapper

## 🔐 Authentication Flow

### Login Process

1. User nhập credentials
2. Gửi request đến `/auth/signin`
3. Nhận JWT token
4. Lưu token vào localStorage
5. Redirect đến dashboard

### Protected Routes

- Sử dụng HOC hoặc component guard
- Kiểm tra token validity
- Redirect về login nếu unauthorized

### Token Management

```typescript
// Token storage
localStorage.setItem("token", token);
localStorage.setItem("user", JSON.stringify(user));

// Token retrieval
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user") || "{}");

// Token cleanup
localStorage.removeItem("token");
localStorage.removeItem("user");
```

## 📱 Responsive Design

### Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Mobile-First Approach

```css
/* Mobile styles (default) */
.component {
  ...;
}

/* Tablet styles */
@media (min-width: 640px) {
  .component {
    ...;
  }
}

/* Desktop styles */
@media (min-width: 1024px) {
  .component {
    ...;
  }
}
```

## 🎭 Animation & Effects

### Glassmorphism Effect

```css
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

### Framer Motion Examples

```tsx
// Page transitions
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3 }}
>
  <Component />
</motion.div>

// Hover effects
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
>
  Click me
</motion.button>
```

## 📊 State Management

### Local State

- useState cho component state
- useReducer cho complex state logic

### Global State (nếu cần)

- Context API cho simple global state
- Redux Toolkit cho complex applications
- Zustand cho lightweight state management

### Server State

```typescript
// API service example
export const playerService = {
  getAll: () => api.get<Player[]>("/players"),
  getById: (id: string) => api.get<Player>(`/players/${id}`),
  create: (data: CreatePlayerRequest) => api.post<Player>("/players", data),
  update: (id: string, data: UpdatePlayerRequest) =>
    api.put<Player>(`/players/${id}`, data),
  delete: (id: string) => api.delete(`/players/${id}`),
};
```

## 🧪 Testing

### Testing Libraries

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

### Test Commands

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Example Test

```typescript
import { render, screen } from "@testing-library/react";
import { PlayerCard } from "./PlayerCard";

test("renders player name", () => {
  const player = { id: "1", name: "Cristiano Ronaldo" };
  render(<PlayerCard player={player} />);

  expect(screen.getByText("Cristiano Ronaldo")).toBeInTheDocument();
});
```

## 📦 Build & Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Environment Variables for Production

```env
VITE_API_BASE_URL=https://your-api-domain.com
VITE_APP_NAME=Football Management System
VITE_GA_TRACKING_ID=GA_MEASUREMENT_ID
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run type-check` - Run TypeScript type checking
- `npm run test` - Run tests
- `npm run test:coverage` - Run tests with coverage

## 🎯 Performance Optimization

### Code Splitting

```typescript
// Lazy loading pages
const HomePage = lazy(() => import("./pages/Home"));
const PlayerDetail = lazy(() => import("./pages/PlayerDetail"));

// Wrap with Suspense
<Suspense fallback={<Loading />}>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/players/:id" element={<PlayerDetail />} />
  </Routes>
</Suspense>;
```

### Image Optimization

- Sử dụng WebP format khi có thể
- Lazy loading images
- Responsive images với srcSet

### Bundle Analysis

```bash
npm run build
npx vite-bundle-analyzer dist
```

## 🤝 Contributing

### Development Workflow

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Code Standards

- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error boundaries
- Write meaningful commit messages
- Add tests for new features

### Pull Request Guidelines

- Update documentation if needed
- Add tests for new functionality
- Ensure all tests pass
- Update CHANGELOG.md

## 🐛 Known Issues & Troubleshooting

### Common Issues

1. **Build Errors**

   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **TypeScript Errors**

   - Check tsconfig.json configuration
   - Ensure all dependencies have type definitions

3. **Styling Issues**

   - Verify TailwindCSS purge configuration
   - Check for CSS specificity conflicts

4. **API Connection Issues**
   - Verify VITE_API_BASE_URL in .env
   - Check CORS configuration on backend

## 📞 Support & Documentation

- **GitHub Issues**: Report bugs và feature requests
- **Documentation**: Detailed docs trong `/docs` folder
- **API Documentation**: Swagger/OpenAPI docs từ backend

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Vite Team** - For the blazing fast build tool
- **TailwindCSS** - For the utility-first CSS framework
- **Framer** - For the beautiful animations
- **Community** - For all the open source libraries

---

**Built with ❤️ and ⚽️ by the Football Management Team**

## 🔮 Future Enhancements

- [ ] Real-time notifications với WebSocket
- [ ] Progressive Web App (PWA) support
- [ ] Multi-language support (i18n)
- [ ] Advanced analytics và charts
- [ ] Drag & drop team formation
- [ ] Social features (likes, shares)
- [ ] Mobile app với React Native
- [ ] AI-powered player recommendations
