# Steven Bolin - Portfolio Website

A modern, animated portfolio website built with React, Vite, and Framer Motion. Features a dynamic loading screen, animated background elements, and responsive design showcasing my projects and skills as a Full-Stack Software Developer.

## 🚀 Live Demo

[View Live Portfolio](https://your-portfolio-url.netlify.app) _(Update with your actual Netlify URL)_

## ✨ Features

- **Animated Loading Screen** - Progress bar with smooth animations
- **Dynamic Background** - Animated gradient circles that respond to scroll
- **Responsive Design** - Mobile-first approach using Tailwind CSS
- **Framer Motion Animations** - Smooth page transitions and hover effects
- **Project Showcase** - Interactive project cards with external links
- **Modern Stack** - Built with React 18, Vite, and modern web technologies

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Deployment:** Netlify
- **Package Manager:** npm

## 🏗️ Project Structure

```
my_portfolio/
├── src/
│   ├── components/
│   │   ├── App.jsx          # Main application component
│   │   ├── App.css          # Custom styles and animations
│   │   └── Main.jsx         # Additional components
│   ├── assets/              # Images and static files
│   ├── utils/               # Utility functions
│   ├── index.css           # Global styles and Tailwind imports
│   └── main.jsx            # Application entry point
├── public/                 # Static assets
├── dist/                   # Build output
└── package.json           # Dependencies and scripts
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/fauxfox117/my_portfolio.git
   cd my_portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🎨 Customization

### Adding Projects

Update the `projects` array in `src/components/App.jsx`:

```jsx
const projects = [
  {
    title: "Your Project Name",
    description: "Brief description of your project",
    image: "./src/assets/your-image.png",
    link: "https://your-project-url.com", // Optional
  },
  // Add more projects...
];
```

### Changing Colors

Modify the gradient colors in `src/components/App.css`:

```css
.circle-gradient-1 {
  background: radial-gradient(circle, your-color-here);
}
```

### Updating Content

- **Name & Title:** Update in the loading screen section
- **About Text:** Modify the about section content
- **Contact Info:** Update email and social links
- **Location:** Change "Greenville SC" to your location

## 🚀 Deployment

### Netlify (Recommended)

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Deploy automatically on push to main branch

### Manual Deployment

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Upload the `dist` folder** to your hosting provider

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Contact

**Steven Bolin** - Full-Stack Software Developer

- Email: [info@stevenabolin.com](mailto:info@stevenabolin.com)
- GitHub: [@fauxfox117](https://github.com/fauxfox117)
- Location: Greenville, SC

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

⭐ If you found this project helpful, please consider giving it a star!
