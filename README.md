# CiberNiños - Interactive Cybersecurity Education 🛡️

This is an interactive web application designed to teach cybersecurity concepts to children and young people in a fun and engaging way.

## Features

- **Interactive Password Checker**: Real-time password strength analysis
- **Cyber Heroes**: Meet our cybersecurity mascots
- **Educational Games**: Learn about phishing, safe browsing, and more
- **Mobile Friendly**: Works on desktop and mobile devices
- **Termux Compatible**: Perfect for Android users

## 🚀 Quick Setup with Interactive Script

The easiest way to set up CiberNiños is using our interactive setup script:

```bash
# Run the interactive setup
npm run setup

# Or directly with node
node setup.js
```

The setup script will:
- ✅ Check your system requirements
- ✅ Install all dependencies automatically
- ✅ Configure an Express.js server
- ✅ Build the React application
- ✅ Set up mobile-friendly hosting
- ✅ Provide cool terminal animations!

## 📱 Mobile Setup (Termux on Android)

1. Install Termux from F-Droid or Google Play
2. Update packages: `pkg update && pkg upgrade`
3. Install Node.js: `pkg install nodejs-lts`
4. Clone this repository: `git clone https://github.com/santiadjmc/weebs.git`
5. Navigate to directory: `cd weebs`
6. Run setup: `npm run setup`

## 💻 Manual Setup

If you prefer to set up manually:

```bash
# Install dependencies
npm install

# Build the application
npm run build

# Start the server
npm start
```

## Available Scripts

- `npm run setup` - Interactive setup with cool animations
- `npm start` - Start production server
- `npm run start:dev` - Start development server
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

## 🌐 Server Configuration

The Express server runs on:
- **Default Port**: 3000
- **Default Host**: 0.0.0.0 (accessible from other devices)
- **API Endpoints**:
  - `/api/health` - Server health check
  - `/api/info` - Application information

## 📚 Educational Content

CiberNiños teaches:
- **Password Security**: How to create strong passwords
- **Phishing Recognition**: Identifying suspicious emails and websites
- **Safe Browsing**: Tips for secure internet navigation
- **Social Media Safety**: Protecting privacy online
- **Digital Citizenship**: Responsible technology use

## 🤖 Technology Stack

- **Frontend**: React 19 + Vite
- **Backend**: Node.js + Express
- **Animations**: Framer Motion + GSAP
- **Styling**: CSS3 with cyber-themed design
- **Compatibility**: Works on desktop, mobile, and Termux

## 🔧 Development

For development with hot reload:

```bash
npm run dev
```

This starts the Vite development server on `http://localhost:5173`

## 🚀 Production Deployment

The application is production-ready and can be deployed to:
- Heroku
- Vercel
- Netlify
- Digital Ocean
- Any VPS with Node.js

Environment variables:
- `PORT` - Server port (default: 3000)
- `HOST` - Server host (default: 0.0.0.0)
- `NODE_ENV` - Environment (development/production)

## 🎨 Customization

The application uses CSS custom properties for easy theming. Main colors can be modified in the CSS files:
- `--cyber-blue`
- `--cyber-purple`
- `--cyber-green`
- `--cyber-orange`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

---

**Made with ❤️ for cybersecurity education**

*¡Aprende a protegerte en línea de forma divertida!*
