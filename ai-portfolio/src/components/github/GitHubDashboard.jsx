import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Github, Star, GitFork, Users, Calendar, 
  TrendingUp, Award, Code, Database, 
  Activity, GitCommit, ChevronRight,
  ExternalLink, Clock, MapPin, Building2,
  Twitter, Link2, BarChart3, PieChart
} from 'lucide-react'
import { 
  LineChart, Line, AreaChart, Area, 
  BarChart, Bar, PieChart as RePieChart, 
  Pie, Cell, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend 
} from 'recharts'
import { format, formatDistance } from 'date-fns'
import { githubService } from '../../services/githubService'

const GitHubDashboard = () => {
  const [userData, setUserData] = useState(null)
  const [repos, setRepos] = useState([])
  const [contributions, setContributions] = useState([])
  const [languageStats, setLanguageStats] = useState([])
  const [recentActivity, setRecentActivity] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedRepo, setSelectedRepo] = useState(null)

  useEffect(() => {
    loadGitHubData()
  }, [])

  const loadGitHubData = async () => {
    setLoading(true)
    try {
      const [user, repoData, contribData, langData, activityData] = await Promise.all([
        githubService.getUserStats(),
        githubService.getRepositories(),
        githubService.getContributions(),
        githubService.getLanguageStats(),
        githubService.getRecentActivity()
      ])
      
      setUserData(user)
      setRepos(repoData)
      setContributions(contribData)
      setLanguageStats(langData)
      setRecentActivity(activityData)
    } catch (error) {
      console.error('Error loading GitHub data:', error)
    } finally {
      setLoading(false)
    }
  }

  const StatCard = ({ icon: Icon, label, value, color, trend }) => (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className="glassmorphism rounded-xl p-4 border border-accent-cyan/20"
    >
      <div className="flex items-center justify-between mb-2">
        <div className={`p-2 rounded-lg bg-${color}/10`}>
          <Icon className={`w-5 h-5 text-${color}`} />
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-accent-green text-xs">
            <TrendingUp className="w-3 h-3" />
            <span>+{trend}%</span>
          </div>
        )}
      </div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-text/40 text-sm">{label}</div>
    </motion.div>
  )

  const ContributionCell = ({ count, level, date }) => (
    <div
      className={`w-3 h-3 rounded-sm transition-all hover:scale-150 cursor-pointer
        ${level === 0 ? 'bg-secondary' : ''}
        ${level === 1 ? 'bg-accent-green/30' : ''}
        ${level === 2 ? 'bg-accent-green/60' : ''}
        ${level === 3 ? 'bg-accent-green' : ''}
        ${level === 4 ? 'bg-accent-green shadow-lg' : ''}
      `}
      title={`${date}: ${count} contributions`}
    />
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent-cyan/20 border-t-accent-cyan rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text/60">Fetching GitHub data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glassmorphism-strong rounded-2xl p-6 border border-accent-cyan/20"
      >
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-accent-cyan to-accent-purple p-0.5">
              <div className="w-full h-full rounded-full bg-secondary flex items-center justify-center">
                <Github className="w-12 h-12 text-accent-cyan" />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-accent-green flex items-center justify-center">
              <Activity className="w-3 h-3 text-primary" />
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-1">{userData?.name}</h3>
            <p className="text-accent-cyan font-mono text-sm mb-2">@{userData?.username}</p>
            <p className="text-text/60 text-sm mb-3 max-w-2xl">{userData?.bio}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1 text-text/40">
                <MapPin className="w-3 h-3" />
                <span>{userData?.location}</span>
              </div>
              <div className="flex items-center gap-1 text-text/40">
                <Building2 className="w-3 h-3" />
                <span>{userData?.company}</span>
              </div>
              <div className="flex items-center gap-1 text-text/40">
                <Link2 className="w-3 h-3" />
                <a href={userData?.website} className="hover:text-accent-cyan transition-colors">Portfolio</a>
              </div>
              <div className="flex items-center gap-1 text-text/40">
                <Twitter className="w-3 h-3" />
                <span>{userData?.twitter}</span>
              </div>
            </div>
          </div>
          
          <a
            href={`https://github.com/${userData?.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg glassmorphism hover:border-accent-cyan/50 transition-all flex items-center gap-2"
          >
            <Github className="w-4 h-4" />
            <span>View Profile</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Star} label="Total Stars" value={userData?.totalStars.toLocaleString()} color="accent-cyan" trend={12} />
        <StatCard icon={GitFork} label="Forks" value={userData?.totalForks.toLocaleString()} color="accent-purple" trend={8} />
        <StatCard icon={Users} label="Followers" value={userData?.followers.toLocaleString()} color="accent-green" trend={5} />
        <StatCard icon={Code} label="Repositories" value={userData?.publicRepos} color="accent-cyan" />
      </div>

      {/* Contribution Graph */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glassmorphism rounded-2xl p-6 border border-accent-cyan/20"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold mb-1">Contribution Graph</h3>
            <p className="text-text/40 text-sm">Last 365 days of activity</p>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-accent-cyan" />
            <span className="text-sm font-mono text-accent-cyan">
              {userData?.contributionStreak} day streak 🔥
            </span>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-52 gap-1">
              {contributions.map((day, index) => (
                <ContributionCell key={index} {...day} />
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end items-center gap-2 mt-4">
          <span className="text-text/40 text-xs">Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-secondary" />
            <div className="w-3 h-3 rounded-sm bg-accent-green/30" />
            <div className="w-3 h-3 rounded-sm bg-accent-green/60" />
            <div className="w-3 h-3 rounded-sm bg-accent-green" />
            <div className="w-3 h-3 rounded-sm bg-accent-green shadow-lg" />
          </div>
          <span className="text-text/40 text-xs">More</span>
        </div>
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Language Stats */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glassmorphism rounded-2xl p-6 border border-accent-cyan/20"
        >
          <div className="flex items-center gap-2 mb-6">
            <PieChart className="w-5 h-5 text-accent-purple" />
            <h3 className="text-lg font-semibold">Language Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RePieChart>
              <Pie
                data={languageStats}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {languageStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: '#0B1120',
                  border: '1px solid rgba(0,245,255,0.2)',
                  borderRadius: '8px',
                  color: '#E2E8F0'
                }}
              />
              <Legend />
            </RePieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Contribution Trend */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glassmorphism rounded-2xl p-6 border border-accent-cyan/20"
        >
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-accent-green" />
            <h3 className="text-lg font-semibold">Contribution Trend</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={contributions.slice(-90)}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00F5FF" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#00F5FF" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
              <XAxis 
                dataKey="date" 
                stroke="#475569"
                tick={{ fill: '#94A3B8', fontSize: 12 }}
                tickFormatter={(date) => format(new Date(date), 'MMM dd')}
              />
              <YAxis stroke="#475569" />
              <Tooltip
                contentStyle={{
                  background: '#0B1120',
                  border: '1px solid rgba(0,245,255,0.2)',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="count" 
                stroke="#00F5FF" 
                fillOpacity={1} 
                fill="url(#colorCount)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Top Repositories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glassmorphism rounded-2xl p-6 border border-accent-cyan/20"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold mb-1">Top Repositories</h3>
            <p className="text-text/40 text-sm">Most starred projects</p>
          </div>
          <GitCommit className="w-5 h-5 text-accent-cyan" />
        </div>
        
        <div className="space-y-4">
          {repos.slice(0, 3).map((repo, index) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="border border-accent-cyan/10 rounded-lg p-4 hover:border-accent-cyan/30 transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-accent-cyan">{repo.name}</h4>
                  <p className="text-text/60 text-sm mt-1">{repo.description}</p>
                </div>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text/40 hover:text-accent-cyan transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full bg-[${repo.language === 'JavaScript' ? '#F7DF1E' : '#3776AB'}]`} />
                  <span className="text-text/60">{repo.language}</span>
                </div>
                <div className="flex items-center gap-1 text-text/60">
                  <Star className="w-3 h-3" />
                  <span>{repo.stars}</span>
                </div>
                <div className="flex items-center gap-1 text-text/60">
                  <GitFork className="w-3 h-3" />
                  <span>{repo.forks}</span>
                </div>
                <div className="flex items-center gap-1 text-text/60">
                  <Clock className="w-3 h-3" />
                  <span>Updated {formatDistance(new Date(repo.updatedAt), new Date(), { addSuffix: true })}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="glassmorphism rounded-2xl p-6 border border-accent-cyan/20"
      >
        <div className="flex items-center gap-2 mb-6">
          <Activity className="w-5 h-5 text-accent-green" />
          <h3 className="text-lg font-semibold">Recent Activity</h3>
        </div>
        
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={activity.id} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                {activity.type === 'push' && <GitCommit className="w-4 h-4 text-accent-cyan" />}
                {activity.type === 'star' && <Star className="w-4 h-4 text-accent-green" />}
                {activity.type === 'pr' && <GitFork className="w-4 h-4 text-accent-purple" />}
                {activity.type === 'issue' && <Activity className="w-4 h-4 text-red-500" />}
                {activity.type === 'fork' && <GitFork className="w-4 h-4 text-accent-cyan" />}
              </div>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="text-accent-cyan">{activity.repo}</span>
                  {' - '}
                  <span className="text-text/80">{activity.message}</span>
                </p>
                <p className="text-text/40 text-xs mt-1">
                  {formatDistance(new Date(activity.timestamp), new Date(), { addSuffix: true })}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-text/40" />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default GitHubDashboard