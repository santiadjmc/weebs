# CyberAmigos - Cybersecurity Education for Children

An interactive and educational web application in Spanish focused on teaching cybersecurity to children.

## 🎯 Features

- **Interactive Learning**: Mini-games, quizzes, and hands-on activities
- **Comprehensive Content**: Password security, phishing detection, social media safety, privacy protection, and responsible device usage
- **Kid-Friendly Design**: Bright colors, animations, and engaging interface
- **Dark/Light Mode**: Smooth toggle between themes
- **Fully Responsive**: Works perfectly on desktop, tablet, and mobile
- **Accessibility**: Screen reader support, keyboard navigation, and WCAG compliance
- **Spanish Content**: All educational content is in Spanish for native speakers

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Python 3 (for local development server) or any web server

### Running the Application

1. Clone the repository:
```bash
git clone <repository-url>
cd weebs
```

2. Start a local server:
```bash
# Using Python 3
python3 -m http.server 8000

# Or using Node.js (if you have it installed)
npx http-server

# Or open index.html directly in your browser
```

3. Open your browser and navigate to `http://localhost:8000`

## 📚 Educational Sections

### 🔐 Contraseñas Super Fuertes (Strong Passwords)
- Password creation techniques
- Interactive password generator
- Strength testing tools

### 🎣 Detecta el Phishing (Phishing Detection)
- Email analysis game
- Warning signs identification
- Interactive detective game

### 📱 Redes Sociales Seguras (Safe Social Media)
- Privacy settings guide
- Sharing decision quiz
- Safety checklists

### 🔒 Privacidad en Línea (Online Privacy)
- Personal information protection
- Stranger danger awareness
- Privacy settings simulator

### 💻 Uso Responsable de Dispositivos (Responsible Device Usage)
- Update importance
- Screen time management
- Security checklist

## 🎮 Interactive Games

1. **Password Strength Game**: Create the strongest password possible
2. **Phishing Detective**: Identify dangerous vs. safe emails
3. **Privacy Hero**: Make decisions to protect privacy
4. **Safe Surfer**: Navigate internet safely

## 🛠️ Technologies Used

- **HTML5**: Semantic structure and accessibility
- **CSS3**: Modern styling with animations and responsive design
- **Vanilla JavaScript**: Interactive functionality and games
- **CSS Grid & Flexbox**: Responsive layouts
- **CSS Custom Properties**: Theme management
- **Intersection Observer**: Scroll animations
- **Local Storage**: Theme preferences

## ♿ Accessibility Features

- ARIA labels and roles
- Keyboard navigation support
- Screen reader announcements
- High contrast support
- Reduced motion preferences
- Skip to content link
- Focus management

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🎨 Design System

### Colors
- Primary: #4F46E5 (Indigo)
- Secondary: #7C3AED (Purple)
- Kid-friendly palette: Blues, greens, yellows, pinks
- Dark mode support with automatic switching

### Typography
- Font: Segoe UI system font stack
- Scalable sizes using CSS custom properties
- Readable contrast ratios

### Animation
- Smooth transitions (0.3s ease-in-out)
- Floating animations for hero section
- Scroll-triggered reveals
- Hover effects and microinteractions

## 🔧 Customization

### Adding New Content
1. Update the HTML structure in `index.html`
2. Add corresponding styles in `styles.css`
3. Implement functionality in `script.js`

### Modifying Games
Games are modular and can be extended by:
1. Adding new game types to the `startGame()` function
2. Creating corresponding load functions
3. Adding game data arrays

### Theme Customization
Modify CSS custom properties in `:root` to change:
- Colors
- Spacing
- Typography
- Animations

## 🧪 Testing

### Manual Testing Checklist
- [ ] All navigation links work
- [ ] Dark/light mode toggle functions
- [ ] Mobile menu operates correctly
- [ ] Games load and function properly
- [ ] Forms submit and validate
- [ ] Responsive design on all devices
- [ ] Accessibility features work

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 📈 Performance

- Optimized images and SVG icons
- Minimal JavaScript bundle
- CSS optimizations
- Lazy loading where applicable
- Efficient animations using CSS transforms

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Icons and emojis for visual appeal
- Web accessibility guidelines (WCAG 2.1)
- Child safety and education best practices
- Spanish language educational resources

## 📞 Support

For questions or support, please open an issue in the repository or contact the development team.

---

**Made with ❤️ for children's cybersecurity education**