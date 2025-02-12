
```
mini-sns
├─ api-gateway
│  ├─ .env
│  ├─ .yo-rc.json
│  ├─ config
│  │  ├─ gateway.config.yml
│  │  ├─ models
│  │  │  ├─ applications.json
│  │  │  ├─ credentials.json
│  │  │  └─ users.json
│  │  └─ system.config.yml
│  ├─ manifest.js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ policies
│  │  └─ jwt-policy.js
│  └─ server.js
├─ client
│  ├─ .env
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  └─ vite.svg
│  ├─ README.md
│  ├─ src
│  │  ├─ App.css
│  │  ├─ App.tsx
│  │  ├─ assets
│  │  │  └─ react.svg
│  │  ├─ index.css
│  │  ├─ main.tsx
│  │  ├─ setupProxy.ts
│  │  ├─ ui
│  │  │  ├─ components
│  │  │  │  ├─ feedback
│  │  │  │  │  └─ Loading.tsx
│  │  │  │  └─ input
│  │  │  │     ├─ Button.tsx
│  │  │  │     └─ Input.tsx
│  │  │  ├─ layout
│  │  │  │  ├─ Drawer.tsx
│  │  │  │  ├─ Frame.tsx
│  │  │  │  ├─ Header.tsx
│  │  │  │  ├─ SideBar.tsx
│  │  │  │  └─ style
│  │  │  │     └─ DrawerStyle.tsx
│  │  │  └─ pages
│  │  │     ├─ board
│  │  │     │  └─ Board.jsx
│  │  │     └─ main
│  │  │        ├─ 404.tsx
│  │  │        ├─ Login.tsx
│  │  │        └─ Main.jsx
│  │  ├─ util
│  │  │  ├─ axios
│  │  │  │  ├─ apiService.ts
│  │  │  │  └─ axiosInstance.ts
│  │  │  ├─ context
│  │  │  │  ├─ config.ts
│  │  │  │  ├─ directory.ts
│  │  │  │  └─ localStorage.ts
│  │  │  ├─ hook
│  │  │  │  ├─ useAlert.ts
│  │  │  │  └─ useIsMounted.ts
│  │  │  └─ validator
│  │  │     └─ emptyCheck.ts
│  │  └─ vite-env.d.ts
│  ├─ tsconfig.app.json
│  ├─ tsconfig.json
│  ├─ tsconfig.node.json
│  └─ vite.config.ts
├─ keys
├─ package-lock.json
├─ package.json
├─ server-auth
│  ├─ .env
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ src
│  │  ├─ app.ts
│  │  ├─ domain
│  │  │  ├─ auth
│  │  │  │  ├─ api
│  │  │  │  │  └─ authController.ts
│  │  │  │  ├─ application
│  │  │  │  │  ├─ authService.js
│  │  │  │  │  └─ authService.ts
│  │  │  │  └─ authRoutes.js
│  │  │  └─ models
│  │  │     ├─ user.js
│  │  │     └─ userToken.js
│  │  ├─ server.ts
│  │  └─ util
│  │     ├─ context
│  │     │  ├─ config.ts
│  │     │  ├─ directory.ts
│  │     │  └─ time.ts
│  │     ├─ database
│  │     │  └─ database.js
│  │     ├─ password.js
│  │     └─ validator
│  │        └─ emptyCheck.ts
│  └─ tsconfig.json
└─ server-board
   ├─ .env
   ├─ package-lock.json
   ├─ package.json
   └─ src
      ├─ app.js
      ├─ context
      │  └─ config.js
      ├─ controller
      │  └─ boardController.js
      ├─ database
      │  └─ database.js
      ├─ model
      │  ├─ boardContent.js
      │  └─ page.js
      ├─ routes
      │  └─ pageRoutes.js
      ├─ server.js
      └─ service
         └─ boardService.js

```