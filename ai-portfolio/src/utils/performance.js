export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export const throttle = (func, limit) => {
  let inThrottle
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

export const optimizeImage = (src, width = 1920, quality = 80) => {
  if (!src) return ''
  // Add image optimization logic here when deploying to production
  return src
}

export const checkGPUPerformance = async () => {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    
    if (!gl) return 'low'
    
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
    if (debugInfo) {
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
      // Check for integrated vs dedicated GPU
      if (renderer.toLowerCase().includes('intel') || 
          renderer.toLowerCase().includes('amd radeon graphics')) {
        return 'medium'
      }
      return 'high'
    }
    return 'medium'
  } catch (e) {
    return 'low'
  }
}