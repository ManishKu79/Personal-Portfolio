// ============================================
// REAL GITHUB API INTEGRATION
// ============================================

const GITHUB_USERNAME = 'https://github.com/ManishKu79' // Replace with your GitHub username
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN // Optional: Add token for higher rate limits

// Real GitHub API calls
export const githubService = {
  async getUserStats() {
    try {
      const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
        headers: GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {}
      })
      
      if (!response.ok) throw new Error('Failed to fetch user data')
      const data = await response.json()
      
      // Fetch additional stats
      const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`, {
        headers: GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {}
      })
      const repos = await reposResponse.json()
      
      // Calculate total stars
      const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0)
      const totalForks = repos.reduce((acc, repo) => acc + repo.forks_count, 0)
      
      return {
        username: data.login,
        name: data.name || GITHUB_USERNAME,
        avatar: data.avatar_url,
        bio: data.bio || "AI/ML Developer & Full Stack Engineer",
        company: data.company || "TechCorp AI Solutions",
        location: data.location || "Bangalore, India",
        website: data.blog,
        twitter: data.twitter_username,
        followers: data.followers,
        following: data.following,
        publicRepos: data.public_repos,
        totalStars: totalStars,
        totalForks: totalForks,
        totalContributions: await getContributionsCount(),
        contributionStreak: await getContributionStreak(),
        longestStreak: await getLongestStreak()
      }
    } catch (error) {
      console.error('Error fetching GitHub stats:', error)
      return getMockUserStats() // Fallback to mock data if API fails
    }
  },

  async getRepositories() {
    try {
      const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`, {
        headers: GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {}
      })
      
      if (!response.ok) throw new Error('Failed to fetch repos')
      const repos = await response.json()
      
      return repos.map(repo => ({
        id: repo.id,
        name: repo.name,
        description: repo.description || "No description provided",
        language: repo.language || "Unknown",
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        size: repo.size,
        updatedAt: repo.updated_at,
        url: repo.html_url
      }))
    } catch (error) {
      console.error('Error fetching repositories:', error)
      return []
    }
  },

  async getContributions() {
    // This requires GitHub GraphQL API for contribution data
    // For now, return mock data structure
    return generateMockContributions()
  },

  async getLanguageStats() {
    try {
      const repos = await this.getRepositories()
      const langStats = {}
      
      repos.forEach(repo => {
        if (repo.language && repo.language !== 'Unknown') {
          langStats[repo.language] = (langStats[repo.language] || 0) + 1
        }
      })
      
      const total = Object.values(langStats).reduce((a, b) => a + b, 0)
      
      return Object.entries(langStats).map(([name, value]) => ({
        name,
        value: Math.round((value / total) * 100),
        color: getLanguageColor(name)
      }))
    } catch (error) {
      console.error('Error fetching language stats:', error)
      return []
    }
  },

  async getRecentActivity() {
    try {
      const eventsResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=10`, {
        headers: GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {}
      })
      
      if (!eventsResponse.ok) throw new Error('Failed to fetch events')
      const events = await eventsResponse.json()
      
      return events.map(event => ({
        id: event.id,
        type: event.type.replace('Event', '').toLowerCase(),
        repo: event.repo.name.split('/')[1],
        message: getEventMessage(event),
        timestamp: event.created_at
      }))
    } catch (error) {
      console.error('Error fetching recent activity:', error)
      return []
    }
  }
}

// Helper functions
const getLanguageColor = (language) => {
  const colors = {
    JavaScript: '#F7DF1E',
    Python: '#3776AB',
    TypeScript: '#3178C6',
    HTML: '#E34F26',
    CSS: '#1572B6',
    Java: '#007396',
    Go: '#00ADD8',
    Rust: '#DEA584'
  }
  return colors[language] || '#9CA3AF'
}

const getEventMessage = (event) => {
  switch (event.type) {
    case 'PushEvent':
      return `Pushed ${event.payload.commits.length} commits`
    case 'CreateEvent':
      return `Created ${event.payload.ref_type}`
    case 'WatchEvent':
      return `Starred repository`
    case 'ForkEvent':
      return `Forked repository`
    default:
      return `Performed ${event.type}`
  }
}

// Helper functions for contribution stats
const getContributionsCount = async () => {
  // Implement GraphQL query for contribution count
  return 1847 // Placeholder
}

const getContributionStreak = async () => {
  return 15 // Placeholder
}

const getLongestStreak = async () => {
  return 28 // Placeholder
}

// Mock data for fallback
const getMockUserStats = () => ({
  username: GITHUB_USERNAME,
  name: "Your Name",
  avatar: "https://github.com/github.png",
  bio: "Your bio here",
  company: "Your Company",
  location: "Your Location",
  followers: 100,
  following: 50,
  publicRepos: 20,
  totalStars: 500,
  totalForks: 100,
  totalContributions: 1000,
  contributionStreak: 10,
  longestStreak: 20
})

const generateMockContributions = () => {
  const contributions = []
  const today = new Date()
  
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    const count = Math.floor(Math.random() * 10)
    
    contributions.push({
      date: date.toISOString().split('T')[0],
      count: count,
      level: count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 9 ? 3 : 4
    })
  }
  
  return contributions
}