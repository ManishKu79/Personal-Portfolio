// Simulated GitHub API service (replace with actual API calls later)
export const githubService = {
  async getUserStats(username = 'manishkumar') {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    return {
      username: username,
      name: 'Manish Kumar',
      avatar: 'https://github.com/github.png',
      bio: 'AI/ML Developer & Full Stack Engineer passionate about building innovative solutions',
      company: 'TechCorp AI Solutions',
      location: 'Bangalore, India',
      website: 'https://manishkumar.dev',
      twitter: '@manishkumar',
      followers: 1247,
      following: 342,
      publicRepos: 45,
      totalStars: 1284,
      totalForks: 342,
      totalContributions: 1847,
      contributionStreak: 15,
      longestStreak: 28
    }
  },

  async getRepositories() {
    await new Promise(resolve => setTimeout(resolve, 600))
    
    return [
      {
        id: 1,
        name: 'ai-portfolio',
        description: 'Interactive 3D AI-powered portfolio with assistant and terminal',
        language: 'JavaScript',
        stars: 234,
        forks: 56,
        size: 12450,
        updatedAt: '2024-02-15T10:30:00Z',
        url: 'https://github.com/manishkumar/ai-portfolio'
      },
      {
        id: 2,
        name: 'neural-style-transfer',
        description: 'Real-time artistic style transfer using deep neural networks',
        language: 'Python',
        stars: 456,
        forks: 89,
        size: 8920,
        updatedAt: '2024-02-10T15:20:00Z',
        url: 'https://github.com/manishkumar/neural-style-transfer'
      },
      {
        id: 3,
        name: 'predictive-analytics-dashboard',
        description: 'ML-powered sales forecasting and analytics platform',
        language: 'Python',
        stars: 178,
        forks: 34,
        size: 15670,
        updatedAt: '2024-02-05T09:15:00Z',
        url: 'https://github.com/manishkumar/predictive-analytics'
      },
      {
        id: 4,
        name: '3d-product-configurator',
        description: 'Real-time 3D product customization tool',
        language: 'JavaScript',
        stars: 312,
        forks: 67,
        size: 23450,
        updatedAt: '2024-01-28T14:45:00Z',
        url: 'https://github.com/manishkumar/3d-configurator'
      },
      {
        id: 5,
        name: 'sentiment-analysis-chatbot',
        description: 'AI chatbot with emotion detection and sentiment analysis',
        language: 'Python',
        stars: 104,
        forks: 23,
        size: 6780,
        updatedAt: '2024-01-20T11:00:00Z',
        url: 'https://github.com/manishkumar/sentiment-chatbot'
      }
    ]
  },

  async getContributions() {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const contributions = []
    const today = new Date()
    
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(today.getDate() - i)
      
      // Generate realistic contribution pattern
      let count = 0
      const dayOfWeek = date.getDay()
      const weekOfYear = Math.floor(i / 7)
      
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        count = Math.floor(Math.random() * 5) // Weekends: 0-4 commits
      } else if (weekOfYear < 10 || weekOfYear > 48) {
        count = Math.floor(Math.random() * 8) // Off-season: 0-7 commits
      } else {
        count = Math.floor(Math.random() * 15) + 2 // Peak: 2-16 commits
      }
      
      contributions.push({
        date: date.toISOString().split('T')[0],
        count: count,
        level: count === 0 ? 0 : count < 4 ? 1 : count < 8 ? 2 : count < 12 ? 3 : 4
      })
    }
    
    return contributions
  },

  async getLanguageStats() {
    await new Promise(resolve => setTimeout(resolve, 400))
    
    return [
      { name: 'JavaScript', value: 45, color: '#F7DF1E' },
      { name: 'Python', value: 30, color: '#3776AB' },
      { name: 'TypeScript', value: 15, color: '#3178C6' },
      { name: 'HTML/CSS', value: 5, color: '#E34F26' },
      { name: 'Others', value: 5, color: '#9CA3AF' }
    ]
  },

  async getRecentActivity() {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    return [
      {
        id: 1,
        type: 'push',
        repo: 'ai-portfolio',
        message: 'Add AI assistant integration',
        branch: 'main',
        timestamp: '2024-02-15T10:30:00Z',
        commits: 3
      },
      {
        id: 2,
        type: 'star',
        repo: 'threejs-examples',
        message: 'Starred threejs-examples',
        timestamp: '2024-02-14T16:20:00Z'
      },
      {
        id: 3,
        type: 'pr',
        repo: 'react-three-fiber',
        message: 'Merged PR #123: Fix performance issues',
        timestamp: '2024-02-13T09:45:00Z'
      },
      {
        id: 4,
        type: 'issue',
        repo: 'ai-portfolio',
        message: 'Opened issue #5: Add dark mode toggle',
        timestamp: '2024-02-12T14:10:00Z'
      },
      {
        id: 5,
        type: 'fork',
        repo: 'awesome-machine-learning',
        message: 'Forked awesome-machine-learning',
        timestamp: '2024-02-11T11:30:00Z'
      }
    ]
  }
}