# Fable + Sutil + TailwindCSS + Vite Template

![Tech Stack](https://img.shields.io/badge/F%23-Fable-blue)
![Sutil](https://img.shields.io/badge/UI-Sutil-green)
![TailwindCSS](https://img.shields.io/badge/CSS-TailwindCSS-38bdf8)
![Vite](https://img.shields.io/badge/Bundler-Vite-646cff)

A modern, high-performance web application template combining the type safety of F#, the reactive UI patterns of Sutil, the utility-first approach of TailwindCSS, and the lightning-fast developer experience of Vite.

## 🚀 Features

- **F# with Fable**: Write statically-typed code that compiles to clean JavaScript
- **Sutil Framework**: Sutil is a web application framework for F# that features a simple DOM builder, no dependencies, reactivity with IObservable and stores, and support for the Elmish architecture, while being inspired by Svelte in its design and functionality.
- **TailwindCSS v4**: Utility-first CSS framework for rapid UI development
- **Vite**: Extremely fast hot module replacement and build optimization

## 📦 Quick Start

### Prerequisites

- [.NET SDK 9.0+](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) or [Bun](https://bun.sh/)
- [Fable 4.x](https://fable.io/)

### Installation

Clone the repository:

```bash
git clone https://github.com/muqiuhan/fable-sutil-tailwind-vite-template
cd fable-sutil-tailwind-vite-template
```

Install dependencies:

```bash
# Using npm
dotnet tool restore && npm install

# Or using bun
dotnet tool restore && bun install
```

### Development

Start the development server:

```bash
# Using npm
npm run dev

# Or using bun
bun run dev
```

This will:
1. Start Fable to compile F# to JavaScript
2. Run Vite development server with HMR
3. Automatically open your browser at `http://localhost:5173`

### Production Build

Create a production build:

```bash
# Using npm
npm run build

# Or using bun
bun run build
```

The output will be in the `dist` directory.

## 🧰 Project Structure

```
├── .config/                # .NET tool configuration
├── public/                 # Static assets
├── src/
│   ├── App/                # F# application code
│   │   ├── Pages/          # Page components
│   │   ├── App.fs          # Application entry point
│   │   ├── Router.fs       # Routing logic
│   │   ├── State.fs        # Global state management
│   │   └── Types.fs        # Type definitions
│   └── style.css           # Global styles with Tailwind imports
├── index.html              # HTML entry point
├── tailwind.config.js      # Tailwind configuration
└── vite.config.ts          # Vite configuration
```

## 🔧 Customization

### Tailwind Configuration

Edit `tailwind.config.js` to customize themes, extend utilities, or add plugins.

### Routing

Add new pages by extending the `Page` type in `Types.fs` and updating the router in `Router.fs`.

### State Management

Global state is managed through the Elmish pattern in `State.fs`.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [Fable](https://fable.io/)
- [Sutil](https://sutil.dev)
- [TailwindCSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
