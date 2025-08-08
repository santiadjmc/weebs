# CiberNiños - Interactive Cybersecurity Education Platform

CiberNiños is a React 19 + Vite frontend with Express.js backend that teaches cybersecurity concepts to children through interactive games, password strength testing, and educational content. The application is mobile-friendly and specifically designed to work with Termux on Android devices.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Bootstrap, Build, and Test the Repository
- Install dependencies: `npm install` (takes ~25 seconds)
- Build the application: `npm run build` (takes ~2 seconds - VERY FAST)
- Run linting: `npm run lint` (takes ~1 second - VERY FAST) 
- No test suite exists - this is an educational frontend application without test infrastructure

### Start Development Server
- Development server: `npm run dev` (starts Vite dev server in ~200ms at http://localhost:5173)
- Production server: `npm start` (starts Express server at http://localhost:3000 with built files)
- Development with Express: `npm run start:dev` (starts Express in development mode)

### Interactive Setup (Recommended for First-Time Users)
- Use the beautiful interactive setup script: `npm run setup` or `node setup.js`
- Features animated ASCII art, system checks, dependency installation, and server configuration
- Includes progress bars, spinners, and full mobile/Termux compatibility
- Setup script automatically runs `npm install`, `npm run build`, and configures Express server

### Build and Deploy Commands
- Full build and start: `npm run build:start` (builds then starts production server)
- Preview build: `npm run preview` (Vite preview server)

## Validation

### Manual Functionality Testing
ALWAYS test the application manually after making changes:

1. **Start the server**: `npm start`
2. **Open browser**: Navigate to http://localhost:3000
3. **Test password functionality**:
   - Enter weak password like "123" and verify it shows as weak
   - Click "🎲 Generar" button to generate strong password
   - Verify password strength meter shows "Muy Fuerte" for strong passwords
4. **Test interactive features**:
   - Click "▶ Ver Consejos" to expand password tips
   - Navigate through different sections using the nav menu (🏠 Inicio, 🔐 Contraseñas, etc.)
   - Test the cyber-heroes hover effects in the hero section
5. **API endpoints validation**:
   - Test health check: `curl http://localhost:3000/api/health`
   - Test app info: `curl http://localhost:3000/api/info`

### Pre-Commit Validation
ALWAYS run these commands before committing code changes:
- `npm run lint` - ESLint validation (required - build will fail without this)
- `npm run build` - Ensure production build succeeds
- Test the application manually using the validation steps above

## Application Architecture

### Frontend Structure (React + Vite)
- **Entry point**: `src/main.jsx` - React application bootstrap
- **Root component**: `src/App.jsx` - Main application shell with routing
- **Components**:
  - `src/components/Hero.jsx` + `Hero.css` - Welcome section with cyber-heroes
  - `src/components/Navbar.jsx` + `Navbar.css` - Navigation with cybersecurity sections
  - `src/components/PasswordSection.jsx` + `PasswordSection.css` - Interactive password strength tester
- **Context**: `src/contexts/ThemeContext.jsx` - Theme switching (light/dark mode)
- **Styling**: `src/index.css` + component-specific CSS files
- **Build configuration**: `vite.config.js` (standard React plugin setup)

### Backend Structure (Express.js)
- **Main server**: `server.js` - Express server serving static files and API endpoints
- **API Endpoints**:
  - `/api/health` - Server health check and status
  - `/api/info` - Application information and features
- **Static files**: Serves built React app from `dist/` directory
- **Middleware**: Compression, CORS, JSON parsing, static file serving

### Key Application Features
- **Password Strength Checker**: Real-time analysis with scoring system (0-100 points)
- **Password Generator**: Creates cryptographically secure passwords
- **Cyber Heroes**: Animated mascots (🔐 Contraseñina, 🛡️ Anti-Phishing, 🔒 Privacidad, 🌐 Navegador Seguro)
- **Educational Content**: Interactive tips and best practices for cybersecurity
- **Mobile Optimization**: Specifically designed for Termux on Android devices
- **Theme Switching**: Light/dark mode support

## Development Workflow

### Making Changes to Components
- React components are in `src/components/` with corresponding CSS files
- Use React 19 features and hooks as needed
- Follow the existing cyber-themed emoji and styling patterns
- Test interactive features manually in browser after changes

### Making Changes to Server/API
- Server logic is in `server.js` 
- API endpoints follow `/api/` prefix pattern
- Server runs on port 3000 by default, host 0.0.0.0 for mobile access
- Test API endpoints with curl commands after changes

### Styling and Design
- Main styles in `src/index.css` with CSS custom properties for theming
- Component-specific styles in corresponding `.css` files
- Uses cyber-themed color palette: `--cyber-blue`, `--cyber-purple`, `--cyber-green`, `--cyber-orange`
- Mobile-first responsive design approach

## Mobile Development (Termux)

### Termux-Specific Features
- Interactive setup script detects Termux environment automatically
- Server configured for external access (0.0.0.0 host) by default
- Displays local IP addresses for mobile device access
- Uses emojis and Unicode characters compatible with Termux terminal
- All commands work identically in Termux and desktop environments

### Mobile Testing Commands
After making changes, test on mobile:
1. `npm start` - Start server
2. Find your device IP in server output (displayed automatically)
3. Access via mobile browser: `http://[device-ip]:3000`
4. Test touch interactions and responsive design

## Common Tasks and File Locations

### Repository Root Structure
```
.
├── README.md              - Project documentation and setup instructions
├── SETUP_DEMO.md         - Interactive setup script features demo
├── package.json          - Dependencies and npm scripts
├── vite.config.js        - Vite build configuration
├── eslint.config.js      - ESLint rules for React and Node.js files
├── index.html            - HTML entry point for Vite
├── server.js             - Express.js production server
├── setup.js              - Interactive setup script with animations
├── dist/                 - Built production files (created by npm run build)
├── src/                  - React application source code
├── public/               - Static assets
└── node_modules/         - Dependencies (created by npm install)
```

### Frequently Modified Files
- `src/App.jsx` - Add new sections or modify main application structure
- `src/components/PasswordSection.jsx` - Password strength checking logic
- `src/components/Hero.jsx` - Welcome section and cyber-heroes
- `src/components/Navbar.jsx` - Navigation menu and routing
- `server.js` - API endpoints and server configuration
- `src/index.css` - Global styles and CSS custom properties

### Configuration Files
- `package.json` - All npm scripts and dependencies are here
- `eslint.config.js` - Separate rules for React components and Node.js server files
- `vite.config.js` - Minimal Vite configuration with React plugin

## Troubleshooting

### Common Issues
- **Build fails**: Run `npm run lint` to check for ESLint errors
- **Server won't start**: Check if port 3000 is already in use
- **Dependencies missing**: Run `npm install` to reinstall packages
- **Fonts not loading**: External fonts are blocked in some environments - application works without them

### Mobile/Termux Issues
- **Unicode not displaying**: Ensure Termux has proper font support installed
- **Can't access server**: Verify firewall allows port 3000 connections
- **Setup script fails**: Run individual npm commands manually if interactive script has issues

## Performance Notes
- **Build time**: ~2 seconds (very fast Vite build)
- **Dev server startup**: ~200 milliseconds  
- **Production server startup**: ~1 second
- **Dependency installation**: ~25 seconds
- **Linting**: ~1 second

All operations are very fast - no need for extended timeouts or cancellation concerns.