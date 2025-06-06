# ⚡ Modern Electron Boilerplate

> A production-ready Electron boilerplate with React, TypeScript, and modern tooling

Build cross-platform desktop applications with the power of web technologies. This boilerplate provides everything you need to get started quickly with a modern development experience.

## ✨ Features

- 🚀 **Fast Development** - Hot reload with Vite
- ⚛️ **React 19** - Latest React with TypeScript support
- 🗃️ **Database Ready** - SQLite with Drizzle ORM
- 🎨 **Beautiful UI** - shadcn/ui components with Tailwind CSS
- 🧪 **Testing Setup** - Vitest for unit testing
- 📦 **Easy Packaging** - Electron Forge for distribution
- 🛣️ **Routing** - React Router for navigation

## 🛠️ Tech Stack

| Category          | Technology                                                                       |
| ----------------- | -------------------------------------------------------------------------------- |
| **Framework**     | [Electron](https://electronjs.org/) v36                                          |
| **Frontend**      | [React](https://reactjs.org/) 19 + [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool**    | [Vite](https://vitejs.dev/)                                                      |
| **Database**      | [SQLite](https://sqlite.org/) + [Drizzle ORM](https://orm.drizzle.team/)         |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) + [Tailwind CSS](https://tailwindcss.com/)   |
| **Routing**       | [React Router](https://reactrouter.com/en/main)                                  |
| **Testing**       | [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/)  |

## 🚀 Quick Start

### Prerequisites

- Node.js 22.12.0 or higher

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/kimizuy/electron-boilerplate
   cd electron-boilerplate
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm start
   ```

The app will open automatically with hot reload enabled!

## 📋 Available Scripts

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `npm start`       | Start development server         |
| `npm run package` | Package app for current platform |
| `npm run make`    | Create distributables            |
| `npm run lint`    | Run ESLint and type checking     |
| `npm test`        | Run tests with Vitest            |
| `npm run rebuild` | Rebuild native dependencies      |

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   └── shadcn-ui/      # shadcn/ui components
├── ipc-main-listeners/ # Electron main process IPC handlers
├── pages/              # Application pages/routes
│   ├── home/          # Home page with user management
│   └── about/         # About page
├── utils/             # Utility functions
│   ├── db.ts         # Database configuration
│   └── cn.ts         # Class name utilities
├── main.ts           # Electron main process
├── preload.ts        # Preload script
└── renderer.tsx      # React app entry point
```

## 🗄️ Database

This boilerplate includes a complete SQLite setup with:

- **Drizzle ORM** for type-safe database operations
- **Automatic migrations** on app startup
- **User management example** with CRUD operations

The database schema is defined in `src/schema.ts` and migrations are in the `drizzle/` folder.

## 🎨 UI Components

Pre-configured with shadcn/ui components including:

- Button, Input, and other form controls
- Tailwind CSS for styling
- Custom utility functions for class names

Add new components with:

```bash
npx shadcn@latest add <component-name>
```

## 🧪 Testing

The project includes:

- **Vitest** for fast unit testing
- **Testing Library** for React component testing
- **Happy DOM** for lightweight DOM simulation

Run tests with:

```bash
npm test
```

## 📦 Building & Distribution

### Development Build

```bash
npm run package
```

### Production Distributables

```bash
npm run make
```

This creates platform-specific installers in the `out/` directory.

## 🔧 Configuration

### Electron Forge

Configuration is in `forge.config.ts`. Modify this file to:

- Change app metadata
- Configure build targets
- Add plugins and makers

### Vite

Separate configs for different processes:

- `vite.main.config.ts` - Main process
- `vite.preload.config.ts` - Preload script
- `vite.renderer.config.ts` - Renderer process

## 📚 What's Included

This boilerplate demonstrates:

- **User Management System** - Complete CRUD operations
- **IPC Communication** - Secure main ↔ renderer communication
- **Database Integration** - SQLite with migrations
- **Modern React Patterns** - Custom hooks and components
- **Error Handling** - Error boundaries and validation
- **Production Builds** - Optimized for distribution

## ⚠️ Important Notes

- **Electron & SQLite Compatibility**: When upgrading Electron or better-sqlite3, ensure version compatibility. Check [better-sqlite3 releases](https://github.com/WiseLibs/better-sqlite3/releases) for supported Electron versions.
- **Node.js Version**: This project requires Node.js 22.12.0 or higher.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is based on the [Electron Forge Vite + TypeScript template](https://www.electronforge.io/templates/vite-+-typescript).

---

**Happy coding!** 🎉
