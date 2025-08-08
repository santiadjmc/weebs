# CyberNiños - Aplicación Web Educativa de Ciberseguridad para Niños

Una aplicación web interactiva y educativa en español diseñada para enseñar ciberseguridad a niños de manera divertida y engaging.

## 🌟 Características Principales

### 📚 Contenido Educativo Completo
- **Contraseñas Seguras**: Juego interactivo para crear contraseñas fuertes
- **Conciencia sobre Phishing**: Detective anti-phishing con emails reales de ejemplo
- **Redes Sociales Seguras**: Quiz interactivo sobre privacidad en redes sociales
- **Privacidad en Línea**: Juegos sobre protección de información personal
- **Uso Responsable de Dispositivos**: Educación sobre bienestar digital

### 🎨 Diseño y UX/UI
- **Tema Oscuro/Claro**: Toggle animado con transiciones suaves
- **Diseño Responsivo**: Optimizado para desktop, tablet y móvil
- **Colores Kid-Friendly**: Paleta de colores brillante y atractiva
- **Animaciones Fluidas**: Efectos CSS avanzados y microinteracciones
- **Tipografía Legible**: Fuentes optimizadas para niños

### 🎮 Funcionalidades Interactivas
- **Mini-Juegos Educativos**: Juegos interactivos para cada sección
- **Sistema de Progreso**: Seguimiento del aprendizaje con logros
- **Notificaciones**: Sistema de feedback inmediato
- **Quiz Interactivos**: Preguntas con explicaciones detalladas
- **Animaciones de Entrada**: Efectos visuales atractivos

### ♿ Accesibilidad
- **Navegación por Teclado**: Soporte completo para teclado
- **ARIA Labels**: Etiquetas para lectores de pantalla
- **Alto Contraste**: Soporte para preferencias de contraste
- **Reduced Motion**: Respeta las preferencias de movimiento reducido
- **Focus Management**: Gestión adecuada del foco

## 🛠 Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica y accesible
- **CSS3**: Variables CSS, Grid, Flexbox, animaciones avanzadas
- **JavaScript ES6+**: Funcionalidad interactiva moderna
- **Progressive Web App**: Service Worker para funcionalidad offline

### Características Técnicas
- **Modular**: Código organizado en módulos separados
- **Responsive**: Mobile-first design
- **Performance**: Optimizaciones de rendimiento
- **SEO Friendly**: Meta tags y estructura optimizada
- **Cross-Browser**: Compatible con navegadores modernos

## 📱 Características Responsive

### Mobile (320px - 768px)
- Layout de una columna
- Navegación móvil con menú hamburguesa
- Botones optimizados para touch
- Tipografía adaptativa

### Tablet (769px - 1024px)
- Layout de dos columnas
- Navegación completa
- Elementos de interfaz optimizados

### Desktop (1025px+)
- Layout de tres columnas
- Efectos hover completos
- Experiencia de escritorio optimizada

## 🎯 Objetivos Educativos

### Contraseñas Seguras
- Crear contraseñas de al menos 8 caracteres
- Usar combinación de letras, números y símbolos
- Evitar información personal obvia
- Entender la importancia de contraseñas únicas

### Conciencia sobre Phishing
- Identificar emails sospechosos
- Reconocer URLs maliciosas
- Verificar remitentes legítimos
- Desarrollar pensamiento crítico online

### Redes Sociales Seguras
- Configurar privacidad adecuadamente
- Entender qué información compartir
- Reconocer riesgos de sobreexposición
- Mantener identidad digital segura

### Privacidad en Línea
- Proteger información personal
- Entender cookies y rastreadores
- Usar navegación segura (HTTPS)
- Desarrollar hábitos de privacidad

### Uso Responsable de Dispositivos
- Balance entre tiempo digital y offline
- Reconocer señales de uso excesivo
- Establecer límites saludables
- Promover bienestar digital

## 🚀 Instalación y Uso

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- JavaScript habilitado
- Conexión a internet (para fuentes y iconos)

### Instalación Local
1. Clona el repositorio:
   ```bash
   git clone https://github.com/santiadjmc/weebs.git
   cd weebs
   ```

2. Inicia un servidor local:
   ```bash
   # Con Python 3
   python -m http.server 8000
   
   # Con Node.js
   npx http-server
   
   # Con PHP
   php -S localhost:8000
   ```

3. Abre tu navegador en `http://localhost:8000`

### Estructura de Archivos
```
/
├── index.html              # Página principal
├── css/
│   ├── styles.css         # Estilos principales
│   ├── animations.css     # Animaciones y efectos
│   └── responsive.css     # Diseño responsivo
├── js/
│   ├── main.js           # Funcionalidad principal
│   ├── theme-toggle.js   # Gestión de temas
│   └── games.js          # Mini-juegos educativos
├── assets/
│   ├── images/           # Imágenes e ilustraciones
│   └── videos/           # Videos educativos
└── README.md
```

## 🎮 Guía de Juegos

### Juego de Fortaleza de Contraseñas
1. **Objetivo**: Crear la contraseña más fuerte posible
2. **Mecánica**: Escribe una contraseña y observa la puntuación en tiempo real
3. **Criterios**: Longitud, mayúsculas, minúsculas, números, símbolos especiales
4. **Puntuación**: 0-100 puntos con feedback visual
5. **Logro**: "Maestro de Contraseñas" al alcanzar 80+ puntos

### Detective Anti-Phishing
1. **Objetivo**: Identificar emails de phishing
2. **Mecánica**: Revisar emails y decidir si son legítimos o maliciosos
3. **Elementos**: Remitente, asunto, contenido, URLs
4. **Feedback**: Explicación detallada de cada respuesta
5. **Logro**: "Detective Anti-Phishing" con 80%+ de precisión

### Quiz de Redes Sociales
1. **Objetivo**: Aprender sobre seguridad en redes sociales
2. **Mecánica**: Responder preguntas de opción múltiple
3. **Temas**: Configuración de privacidad, información a compartir
4. **Explicaciones**: Cada respuesta incluye explicación educativa
5. **Logro**: "Guardián de Redes Sociales" con alta puntuación

## 🏆 Sistema de Logros

### Progreso General
- **0-25%**: "¡Estás empezando tu aventura!"
- **26-50%**: "¡Vas por buen camino!"
- **51-75%**: "¡Excelente progreso!"
- **76-99%**: "¡Casi eres un experto!"
- **100%**: "¡Eres un Cyber-Héroe!"

### Logros Específicos
- 🌟 **Explorador Digital**: Completar primera sección
- 🔐 **Maestro de Contraseñas**: Crear contraseña de 80+ puntos
- 🕵️ **Detective Anti-Phishing**: 80%+ precisión en phishing game
- 🛡️ **Guardián de Privacidad**: Completar todas las secciones

## 🌐 Funcionalidades Avanzadas

### Gestión de Temas
- **Auto-detección**: Sistema que detecta preferencia de tema del OS
- **Programación Automática**: Cambio automático según hora del día
- **Ahorro de Batería**: Cambio automático a tema oscuro con batería baja
- **Persistencia**: Recordar preferencia del usuario

### Sistema de Progreso
- **LocalStorage**: Progreso guardado localmente
- **Sync Visual**: Actualización en tiempo real
- **Logros**: Sistema de reconocimiento de logros
- **Estadísticas**: Seguimiento detallado del aprendizaje

## 🔒 Privacidad y Seguridad

- **Sin Cookies de Terceros**: Solo almacenamiento local
- **Sin Tracking**: No se recopilan datos personales
- **Offline-First**: Funciona sin conexión tras primera carga
- **HTTPS Ready**: Preparado para despliegue seguro
- **CSP Compatible**: Content Security Policy implementada

## 🚀 Próximas Características

- [ ] Más mini-juegos educativos
- [ ] Sistema de puntuación global
- [ ] Contenido para diferentes edades
- [ ] Soporte multiidioma
- [ ] Integración con aulas virtuales
- [ ] Reportes para padres/educadores

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork del proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👥 Autores

- **Desarrollador Principal** - Implementación completa de la aplicación educativa

## 🙏 Agradecimientos

- Iconos por [Font Awesome](https://fontawesome.com/)
- Fuentes por [Google Fonts](https://fonts.google.com/)
- Inspiración en las mejores prácticas de educación digital infantil

---

**¡Ayuda a los niños a convertirse en Cyber-Héroes! 🦸‍♂️🦸‍♀️**