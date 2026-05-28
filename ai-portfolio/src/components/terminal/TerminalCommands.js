// Command definitions with responses
export const terminalCommands = {
  help: {
    description: 'Show all available commands',
    execute: () => ({
      type: 'help',
      content: `
╔══════════════════════════════════════════════════════════════╗
║                    AVAILABLE COMMANDS                         ║
╠══════════════════════════════════════════════════════════════╣
║  about         - About Manish Kumar                          ║
║  skills        - Technical skills & expertise                ║
║  projects      - List all projects                          ║
║  resume        - Download resume                             ║
║  contact       - Contact information                         ║
║  github        - GitHub statistics                           ║
║  experience    - Work experience                             ║
║  education     - Educational background                      ║
║  system        - Portfolio system info                       ║
║  ai [question] - Ask AI assistant                           ║
║  theme [dark/light] - Change terminal theme                  ║
║  clear         - Clear terminal                              ║
║  matrix        - Matrix rain effect                          ║
║  easter egg    - Hidden surprise                            ║
╚══════════════════════════════════════════════════════════════╝
      `
    })
  },

  about: {
    description: 'About Manish Kumar',
    execute: () => ({
      type: 'about',
      content: `
┌─────────────────────────────────────────────────────────────┐
│                     👨‍💻 ABOUT MANISH                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Name:        Manish Kumar                                  │
│  Role:        AI/ML Developer & Full Stack Engineer        │
│  Location:    India                                         │
│  Experience:  5+ Years                                      │
│                                                             │
│  Passionate about building cutting-edge AI solutions       │
│  and immersive web experiences. Specializing in            │
│  machine learning, computer vision, and 3D web             │
│  technologies.                                              │
│                                                             │
│  "Code that thinks, designs that inspire"                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
      `
    })
  },

  skills: {
    description: 'Show technical skills',
    execute: () => ({
      type: 'skills',
      content: `
╔══════════════════════════════════════════════════════════════╗
║                      TECHNICAL SKILLS                         ║
╠══════════════════════════════════════════════════════════════╣
║                                                               ║
║  🚀 FRONTEND                                                  ║
║  └─ React, Next.js, Three.js, Tailwind, Framer Motion       ║
║                                                               ║
║  🤖 AI/ML                                                     ║
║  └─ TensorFlow, PyTorch, OpenAI API, LangChain              ║
║                                                               ║
║  ⚙️ BACKEND                                                   ║
║  └─ Node.js, Python, Django, FastAPI                        ║
║                                                               ║
║  🗄️ DATABASE                                                  ║
║  └─ PostgreSQL, MongoDB, Redis                              ║
║                                                               ║
║  ☁️ DEVOPS                                                    ║
║  └─ Docker, AWS, Vercel, GitHub Actions                     ║
║                                                               ║
║  🎨 3D & DESIGN                                               ║
║  └─ WebGL, Blender, Figma, Adobe Suite                      ║
║                                                               ║
╚══════════════════════════════════════════════════════════════╝
      `
    })
  },

  projects: {
    description: 'List all projects',
    execute: () => ({
      type: 'projects',
      content: `
┌─────────────────────────────────────────────────────────────┐
│                       PROJECT SHOWCASE                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  🎯 AI-POWERED PORTFOLIO [2024]                            │
│     └─ Interactive 3D portfolio with AI assistant          │
│     └─ Stack: React Three Fiber, OpenAI, Tailwind          │
│                                                             │
│  🧠 NEURAL STYLE TRANSFER APP [2024]                       │
│     └─ Real-time art style transfer using CNNs             │
│     └─ Stack: TensorFlow.js, React, Flask                  │
│                                                             │
│  📊 PREDICTIVE ANALYTICS DASHBOARD [2023]                  │
│     └─ Real-time sales forecasting with ML                 │
│     └─ Stack: Python, Scikit-learn, D3.js, Django          │
│                                                             │
│  🎮 3D PRODUCT CONFIGURATOR [2023]                         │
│     └─ Real-time 3D product customization                  │
│     └─ Stack: Three.js, React, Node.js                     │
│                                                             │
│  🤖 CHATBOT WITH SENTIMENT ANALYSIS [2023]                 │
│     └─ AI chatbot with emotion detection                   │
│     └─ Stack: Python, NLTK, Flask, Socket.io               │
│                                                             │
│  Type 'project [number]' for more details                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
      `
    })
  },

  'project 1': {
    description: 'AI-Powered Portfolio details',
    execute: () => ({
      type: 'project',
      content: `
📁 PROJECT: AI-POWERED PORTFOLIO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 Role: Lead Developer & AI Engineer
📅 Duration: 2024 - Present

🔧 TECHNOLOGIES:
   • Frontend: React 19, Three.js, Framer Motion
   • Backend: Node.js, Express
   • AI: OpenAI GPT-4, LangChain
   • Database: PostgreSQL
   • Deployment: Vercel, AWS

✨ KEY FEATURES:
   • Cinematic 3D hero section
   • AI-powered assistant with context
   • Real-time GitHub analytics
   • Interactive coding terminal
   • Holographic UI components

🏆 ACHIEVEMENTS:
   • 60 FPS performance on mid-range devices
   • 90+ Lighthouse score
   • Fully responsive design

🔗 Live Demo: Coming Soon
📂 GitHub: /manishkumar/ai-portfolio
      `
    })
  },

  resume: {
    description: 'Download resume',
    execute: () => {
      window.open('/resume.pdf', '_blank')
      return {
        type: 'success',
        content: '📄 Downloading resume... Check your downloads folder.'
      }
    }
  },

  contact: {
    description: 'Contact information',
    execute: () => ({
      type: 'contact',
      content: `
╔══════════════════════════════════════════════════════════════╗
║                    CONTACT INFORMATION                        ║
╠══════════════════════════════════════════════════════════════╣
║                                                               ║
║  📧 Email:    manish.kumar@example.com                       ║
║  💼 LinkedIn: /in/manishkumar                                ║
║  🐙 GitHub:   github.com/manishkumar                         ║
║  🐦 Twitter:  @manishkumar                                   ║
║  🌐 Portfolio: manishkumar.dev                               ║
║                                                               ║
║  📱 Phone:    +91 XXXXXXXXXX                                 ║
║  📍 Location: Bangalore, India                               ║
║                                                               ║
║  💬 Open for collaborations and opportunities!               ║
║                                                               ║
╚══════════════════════════════════════════════════════════════╝
      `
    })
  },

  github: {
    description: 'GitHub statistics',
    execute: async () => {
      // Simulate GitHub API call
      return {
        type: 'github',
        content: `
┌─────────────────────────────────────────────────────────────┐
│                    GITHUB STATISTICS                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📊 REPOSITORIES: 45                                        │
│  ⭐ TOTAL STARS: 1,284                                      │
│  🍴 FORKS: 342                                              │
│  👥 CONTRIBUTIONS: 1,847 this year                         │
│                                                             │
│  🔥 CONTRIBUTION STREAK: 15 days                           │
│  🏆 TOP LANGUAGE: JavaScript (45%)                         │
│                                                             │
│  📈 RECENT ACTIVITY:                                        │
│     • Created: AI-Portfolio (2 days ago)                   │
│     • Starred: awesome-machine-learning (5 days ago)       │
│     • PR merged: three.js-examples (1 week ago)            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
        `
      }
    }
  },

  experience: {
    description: 'Work experience',
    execute: () => ({
      type: 'experience',
      content: `
╔══════════════════════════════════════════════════════════════╗
║                    WORK EXPERIENCE                            ║
╠══════════════════════════════════════════════════════════════╣
║                                                               ║
║  🏢 SENIOR AI ENGINEER                                        ║
║     TechCorp AI Solutions | 2023 - Present                   ║
║     • Lead AI model deployment for 5+ projects               ║
║     • Improved model accuracy by 35%                         ║
║     • Mentored 3 junior developers                           ║
║                                                               ║
║  🏢 FULL STACK DEVELOPER                                      ║
║     WebInnovate Labs | 2021 - 2023                           ║
║     • Built 10+ production web applications                  ║
║     • Reduced load time by 60% through optimization          ║
║     • Implemented CI/CD pipelines                            ║
║                                                               ║
║  🏢 FREELANCE DEVELOPER                                       ║
║     Self-employed | 2019 - 2021                              ║
║     • Delivered 20+ client projects                          ║
║     • 100% client satisfaction rate                          ║
║                                                               ║
╚══════════════════════════════════════════════════════════════╝
      `
    })
  },

  system: {
    description: 'System information',
    execute: () => ({
      type: 'system',
      content: `
┌─────────────────────────────────────────────────────────────┐
│                    SYSTEM INFORMATION                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  🖥️ OS: ${navigator.platform}                                    │
│  🌐 Browser: ${navigator.userAgent.split(' ').pop()}               │
│  📐 Screen: ${window.screen.width}x${window.screen.height}         │
│  🎨 Color Depth: ${window.screen.colorDepth}-bit                  │
│                                                             │
│  ⚡ Performance:                                           │
│     • CPU Cores: ${navigator.hardwareConcurrency || 'N/A'}        │
│     • Memory: ${navigator.deviceMemory ? navigator.deviceMemory + 'GB' : 'N/A'} │
│                                                             │
│  🚀 Portfolio Version: 2.0.0                               │
│  📅 Build Date: ${new Date().toLocaleDateString()}               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
      `
    })
  },

  matrix: {
    description: 'Matrix rain effect',
    execute: () => ({
      type: 'effect',
      content: '💊 Matrix mode activated! Type "stop" to end...',
      effect: 'matrix'
    })
  },

  'easter egg': {
    description: 'Hidden surprise',
    execute: () => ({
      type: 'easter',
      content: `
🎉 CONGRATULATIONS! You found the easter egg! 🎉

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│    ⭐ You're a true explorer! ⭐                           │
│                                                             │
│    Here's a secret code: AI_MASTER_2024                    │
│                                                             │
│    Use this code in the AI assistant for a special         │
│    surprise!                                               │
│                                                             │
│    🔥 Bonus: You've unlocked the rainbow theme!            │
│                                                             │
└─────────────────────────────────────────────────────────────┘

🌈 Theme changed to rainbow mode!
      `,
      effect: 'rainbow'
    })
  },

  clear: {
    description: 'Clear terminal',
    execute: () => ({
      type: 'clear',
      content: ''
    })
  },

  whoami: {
    description: 'Display current user',
    execute: () => ({
      type: 'whoami',
      content: 'manish@ai-portfolio:~$ Currently logged in as: Manish Kumar (AI/ML Developer)'
    })
  },

  date: {
    description: 'Show current date and time',
    execute: () => ({
      type: 'date',
      content: `📅 ${new Date().toString()}`
    })
  }
}

// Command aliases
export const commandAliases = {
  ls: 'projects',
  cd: 'help',
  dir: 'projects',
  echo: 'about',
  info: 'system',
  status: 'system'
}