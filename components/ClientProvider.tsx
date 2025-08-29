'use client'

import { useEffect, ReactNode } from 'react'

interface ClientProviderProps {
  children: ReactNode
}

export default function ClientProvider({ children }: ClientProviderProps) {
  useEffect(() => {
    // Initialize cursor trail effect
    let mouseX = 0
    let mouseY = 0
    let trails: { element: HTMLDivElement; age: number }[] = []
    
    // Skip cursor trail on mobile devices
    if (window.innerWidth > 768) {
      // Create cursor trail container
      const trailContainer = document.createElement('div')
      trailContainer.className = 'cursor-trail-container'
      trailContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9998;
      `
      document.body.appendChild(trailContainer)
      
      // Track mouse movement
      const handleMouseMove = (e: MouseEvent) => {
        mouseX = e.clientX
        mouseY = e.clientY
        
        // Create new trail element occasionally for performance
        if (Math.random() > 0.8) {
          createCursorTrail(mouseX, mouseY, trailContainer, trails)
        }
      }
      
      document.addEventListener('mousemove', handleMouseMove)
      
      // Clean up old trails periodically
      const cleanupInterval = setInterval(() => {
        trails = trails.filter(trail => {
          if (trail.age > 100) {
            if (trail.element.parentNode) {
              trail.element.parentNode.removeChild(trail.element)
            }
            return false
          }
          trail.age++
          trail.element.style.opacity = Math.max(0, 1 - trail.age / 100).toString()
          return true
        })
      }, 16) // ~60fps
      
      // Cleanup function
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        clearInterval(cleanupInterval)
        if (trailContainer.parentNode) {
          trailContainer.parentNode.removeChild(trailContainer)
        }
      }
    }
    
    function createCursorTrail(
      x: number, 
      y: number, 
      container: HTMLDivElement, 
      trails: { element: HTMLDivElement; age: number }[]
    ) {
      const trail = document.createElement('div')
      const size = Math.random() * 10 + 5
      const hue = Math.random() > 0.5 ? 320 : 45 // Pink or orange
      
      trail.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, hsl(${hue}, 70%, 60%) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        mix-blend-mode: screen;
        transform: translate(-50%, -50%);
        opacity: 0.8;
      `
      
      container.appendChild(trail)
      trails.push({
        element: trail,
        age: 0
      })
    }
  }, [])

  useEffect(() => {
    // Initialize fade-in animations for elements
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, observerOptions)

    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in')
    fadeElements.forEach((el) => observer.observe(el))

    return () => {
      fadeElements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return <>{children}</>
}
