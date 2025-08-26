# Windows 95 Portfolio Website

A nostalgic portfolio website built with React and TailwindCSS, styled to look like Windows 95.

## Features

- **Desktop Interface**: Classic Windows 95 desktop with draggable icons
- **4 Main Applications**:
  - 📄 **Resume**: View and download resume with personal information
  - 💼 **Projects**: Browse project portfolio with GitHub/demo links
  - 🎨 **Drawings**: Image gallery for artwork showcase
  - 🎮 **Games**: Play embedded HTML5 games or view external game projects
- **Windows 95 UI**: Authentic draggable, closable windows with classic styling
- **Start Menu**: Quick access to LinkedIn and GitHub profiles
- **Live Clock**: Real-time digital clock in the taskbar
- **Splash Screen**: Animated "Starting Windows 95..." loading screen
- **Responsive Design**: Adapts to mobile devices with stacked icons and floating Start button

## Project Structure

```
├── public/
│   ├── drawings/          # Add your artwork images here
│   ├── games/            # HTML5 games (snake.html, tetris.html included)
│   ├── resume.pdf        # Your resume PDF file
│   └── index.html
├── src/
│   ├── components/       # React components
│   ├── data/
│   │   └── projects.js   # Edit this file to update your projects
│   ├── App.js
│   └── index.css
└── package.json
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Add your content**:
   - Replace `/public/resume.pdf` with your actual resume
   - Add artwork images to `/public/drawings/`
   - Edit `/src/data/projects.js` to showcase your projects
   - Update personal links in `/src/components/StartMenu.js`

3. **Run the development server**:
   ```bash
   npm start
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## Customization

### Adding Projects
Edit `src/data/projects.js` to add or modify your projects:

```javascript
{
  id: 1,
  title: "Your Project Name",
  description: "Project description",
  technologies: ["React", "Node.js"],
  githubUrl: "https://github.com/username/repo",
  demoUrl: "https://your-demo.com",
  image: "/projects/image.png"
}
```

### Adding Games
- Place HTML5 games in `/public/games/` folder
- Update the games array in `src/components/GamesWindow.js`
- Each game should be a complete HTML file with embedded CSS/JS

### Adding Artwork
- Add images to `/public/drawings/` folder
- Supported formats: JPG, PNG, GIF
- Images will automatically appear in the gallery

### Updating Personal Info
- Resume content: Edit `src/components/ResumeWindow.js`
- Social links: Edit `src/components/StartMenu.js`
- Replace `/public/resume.pdf` with your actual resume

## Deployment

This project is ready to deploy on:
- **Netlify**: Drag and drop the `build` folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Use the `gh-pages` branch

## Technologies Used

- React 18
- TailwindCSS
- HTML5 Canvas (for games)
- CSS Grid & Flexbox
- Local Storage (for settings)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT License - feel free to use this template for your own portfolio!

---

Built with ❤️ and nostalgia for the Windows 95 era.
