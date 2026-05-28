import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minimize2, Send, Mic, Bot, Sparkles, ChevronUp, ChevronDown } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'
import useStore from '../../store/useStore'

const Assistant = () => {
  const { isAssistantOpen, toggleAssistant, addAssistantMessage, assistantMessages, isThinking, setIsThinking } = useStore()
  const [inputMessage, setInputMessage] = useState('')
  const [isMinimized, setIsMinimized] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // AI Response suggestions
  const aiSuggestions = [
    "Tell me about your projects",
    "What technologies do you use?",
    "Explain your AI experience",
    "How can I contact you?",
    "Show me your GitHub stats",
    "What's your background?"
  ]

  useEffect(() => {
    if (isAssistantOpen && inputRef.current) {
      inputRef.current.focus()
    }
    scrollToBottom()
  }, [isAssistantOpen, assistantMessages])

  useEffect(() => {
    // Add welcome message when assistant first opens
    if (assistantMessages.length === 0) {
      addAssistantMessage({
        id: uuidv4(),
        type: 'ai',
        content: `✨ Hello! I'm your AI assistant. I can help you learn about Manish's skills, experience, projects, and more. What would you like to know?`,
        timestamp: Date.now()
      })
      
      // Set suggestions after welcome
      setTimeout(() => {
        setSuggestions(aiSuggestions)
      }, 1000)
    }
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const generateAIResponse = async (message) => {
    setIsThinking(true)
    
    // Simulate AI thinking delay
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500))
    
    const lowerMessage = message.toLowerCase()
    let response = ''
    
    // Intelligent response system based on keywords
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      response = `👋 Hello! Great to meet you! I'm Manish's AI assistant. Feel free to ask me about his work, skills, or anything you'd like to know!`
    }
    else if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
      response = `🎯 **Manish's Featured Projects:**

1. AI-Powered Portfolio - Interactive 3D portfolio with AI assistant
   → React Three Fiber, OpenAI API, Tailwind CSS

2. Neural Style Transfer - Real-time art style transfer app
   → TensorFlow.js, React, Flask

3. Predictive Analytics Dashboard - ML-powered sales forecasting
   → Python, Scikit-learn, D3.js

4. 3D Product Configurator - Real-time customization tool
   → Three.js, React, Node.js

Would you like details about any specific project?`
    }
    else if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech stack')) {
      response = `💻 **Technical Skills:**

Frontend: React 19, Next.js, Three.js, Tailwind CSS, Framer Motion
AI/ML: TensorFlow, PyTorch, OpenAI API, LangChain, Computer Vision
Backend: Node.js, Python, Django, FastAPI
Database: PostgreSQL, MongoDB, Redis
DevOps: Docker, AWS, Vercel, GitHub Actions
3D & Design: WebGL, Blender, Figma

Manish is particularly passionate about combining AI with immersive web experiences!`
    }
    else if (lowerMessage.includes('experience') || lowerMessage.includes('background') || lowerMessage.includes('career')) {
      response = `📈 **Professional Experience:**

Senior AI Engineer @ TechCorp AI Solutions (2023-Present)
→ Lead AI model deployment for 5+ projects
→ Improved model accuracy by 35%
→ Mentored 3 junior developers

Full Stack Developer @ WebInnovate Labs (2021-2023)
→ Built 10+ production web applications
→ Reduced load time by 60%
→ Implemented CI/CD pipelines

Freelance Developer (2019-2021)
→ Delivered 20+ client projects
→ 100% client satisfaction rate

Manish has 5+ years of experience in software development!`
    }
    else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
      response = `📬 **Contact Information:**

Email: manish.kumar@example.com
LinkedIn: /in/manishkumar
GitHub: github.com/manishkumar
Twitter: @manishkumar
Portfolio: manishkumar.dev

💬 Open for collaborations, freelance work, and opportunities!`
    }
    else if (lowerMessage.includes('github') || lowerMessage.includes('git')) {
      response = `📊 **GitHub Statistics:**

• 45 Public Repositories
• 1,284 Total Stars ⭐
• 342 Forks 🍴
• 1,847 Contributions this year

Top Languages: JavaScript (45%), Python (30%), TypeScript (15%), Others (10%)

Recent Activity:
→ Created: AI-Portfolio (2 days ago)
→ Starred: awesome-machine-learning (5 days ago)
→ PR merged: three.js-examples (1 week ago)`
    }
    else if (lowerMessage.includes('education') || lowerMessage.includes('study') || lowerMessage.includes('degree')) {
      response = `🎓 **Education:**

Master's in Computer Science (AI Specialization)
Indian Institute of Technology (IIT)
2020 - 2022 | CGPA: 9.2/10

Bachelor's in Computer Engineering
National Institute of Technology (NIT)
2016 - 2020 | CGPA: 8.9/10

Certifications:
→ Advanced Machine Learning (Stanford Online)
→ Full Stack Development (Meta)
→ Three.js Journey (Three.js Journey)`
    }
    else if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
      response = `📄 **Resume Download**

You can download Manish's resume by clicking the "Download Resume" button on the hero section, or type 'resume' in the terminal!

Quick Summary:
→ 5+ years of experience
→ Expert in AI/ML & Full Stack
→ 20+ successful projects
→ Open to opportunities`
    }
    else if (lowerMessage.includes('award') || lowerMessage.includes('achievement') || lowerMessage.includes('recognition')) {
      response = `🏆 **Achievements & Recognition:**

→ Best AI Innovation Award 2024
→ Published research paper on Neural Style Transfer
→ Featured in "Top 30 Under 30 Developers" 2023
→ 5+ Open Source Contributions
→ Speaker at Tech Conference 2024
→ 90+ Lighthouse score on all projects`
    }
    else if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
      response = `🤖 **I can help you with:**

• Learning about Manish's projects
• Understanding his technical skills
• Getting contact information
• Downloading his resume
• Exploring his GitHub activity
• Learning about his experience
• Getting career advice
• And much more!

Just ask me anything about Manish! ✨`
    }
    else if (lowerMessage.includes('thank')) {
      response = `🙏 You're very welcome! I'm glad I could help. Is there anything else you'd like to know about Manish or his work?`
    }
    else if (lowerMessage.includes('ai_master_2024') || lowerMessage.includes('secret') || lowerMessage.includes('easter')) {
      response = `🎉 **SECRET CODE ACCEPTED!** 🎉

Congratulations! You found the super secret easter egg!

🌟 You've unlocked:
→ Special access to Manish's private projects
→ Priority response from AI assistant
→ Exclusive behind-the-scenes content

✨ Bonus: Here's a sneak peek at an upcoming project:
"Next-gen AI platform for creative developers"

Keep exploring for more surprises! 🔮`
    }
    else {
      response = `🤔 That's an interesting question! While I'm still learning, let me share some highlights about Manish:

Quick Facts:
→ Specializes in AI/ML & 3D Web
→ Built 20+ production applications
→ Passionate about teaching coding
→ Always learning new technologies

Want to know more? Try asking about:
• "Tell me about your projects"
• "What technologies do you use?"
• "Share your experience"
• "How to contact you"

What would you like to explore? 💫`
    }
    
    setIsThinking(false)
    return response
  }

  const formatMessage = (content) => {
    // Simple formatting for bold text
    const parts = content.split(/(\*\*[^*]+\*\*)/g)
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="text-accent-green">{part.slice(2, -2)}</strong>
      }
      // Handle line breaks
      return part.split('\n').map((line, i) => (
        <React.Fragment key={i}>
          {line}
          {i < part.split('\n').length - 1 && <br />}
        </React.Fragment>
      ))
    })
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return
    
    // Add user message
    const userMessage = {
      id: uuidv4(),
      type: 'user',
      content: inputMessage,
      timestamp: Date.now()
    }
    addAssistantMessage(userMessage)
    
    // Clear suggestions after user types
    setSuggestions([])
    
    // Clear input
    const question = inputMessage
    setInputMessage('')
    
    // Generate AI response
    const aiResponse = await generateAIResponse(question)
    
    // Add AI response
    const aiMessage = {
      id: uuidv4(),
      type: 'ai',
      content: aiResponse,
      timestamp: Date.now()
    }
    addAssistantMessage(aiMessage)
    
    // Show new suggestions after response
    setTimeout(() => {
      setSuggestions(aiSuggestions)
    }, 2000)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion)
    setTimeout(() => handleSendMessage(), 100)
  }

  if (!isAssistantOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 400 }}
        animate={{ 
          opacity: 1, 
          x: 0,
          height: isMinimized ? 'auto' : '600px',
          width: isMinimized ? '300px' : '400px'
        }}
        exit={{ opacity: 0, x: 400 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className={`fixed bottom-6 right-6 z-[1000] glassmorphism-strong rounded-xl overflow-hidden shadow-2xl border border-accent-cyan/30 ${
          isMinimized ? 'h-auto' : 'h-[600px]'
        } w-[400px]`}
      >
        {/* Assistant Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-accent-cyan/20 to-accent-purple/20 border-b border-accent-cyan/20">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bot className="w-5 h-5 text-accent-cyan" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent-green rounded-full animate-pulse" />
            </div>
            <span className="text-sm font-mono text-accent-cyan font-semibold">AI ASSISTANT</span>
            {isThinking && (
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-accent-cyan rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-accent-purple rounded-full animate-bounce delay-100" />
                <div className="w-1.5 h-1.5 bg-accent-green rounded-full animate-bounce delay-200" />
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-text/10 rounded transition-colors"
            >
              {isMinimized ? <ChevronUp className="w-4 h-4 text-text/60" /> : <ChevronDown className="w-4 h-4 text-text/60" />}
            </button>
            <button
              onClick={toggleAssistant}
              className="p-1 hover:bg-text/10 rounded transition-colors"
            >
              <X className="w-4 h-4 text-text/60" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages Area */}
            <div className="flex-1 h-[480px] overflow-y-auto p-4 space-y-4">
              {assistantMessages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg p-3 ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-accent-cyan to-accent-purple text-primary'
                        : 'glassmorphism border border-accent-cyan/20'
                    }`}
                  >
                    <div className="text-sm whitespace-pre-wrap">
                      {message.type === 'ai' ? formatMessage(message.content) : message.content}
                    </div>
                    <span className="text-[10px] opacity-60 block mt-1">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </motion.div>
              ))}
              
              {isThinking && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="glassmorphism rounded-lg p-3">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-accent-cyan rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-accent-purple rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-accent-green rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="px-4 py-2 border-t border-accent-cyan/10">
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="text-xs px-3 py-1 rounded-full glassmorphism text-accent-cyan hover:bg-accent-cyan/10 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-accent-cyan/10">
              <div className="flex gap-2">
                <button className="p-2 rounded-lg glassmorphism hover:border-accent-cyan/50 transition-colors">
                  <Mic className="w-4 h-4 text-accent-cyan" />
                </button>
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about Manish..."
                  className="flex-1 bg-secondary/50 rounded-lg px-3 py-2 text-sm text-text outline-none border border-accent-cyan/20 focus:border-accent-cyan/50 transition-colors resize-none"
                  rows="1"
                  style={{ minHeight: '40px', maxHeight: '100px' }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isThinking}
                  className="p-2 rounded-lg bg-gradient-to-r from-accent-cyan to-accent-purple disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
                >
                  <Send className="w-4 h-4 text-primary" />
                </button>
              </div>
              <div className="text-center mt-2 text-[10px] text-text/30">
                Press Enter to send • AI-powered assistant
              </div>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default Assistant