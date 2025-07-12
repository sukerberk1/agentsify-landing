import { useCallback, useEffect, useRef } from "react";

const ParticlesContainer = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: null, y: null, radius: 100, active: false });
  const isInitializedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Prevent double initialization
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles = [];
    const mouse = mouseRef.current;
    let isAnimating = false;
    let pixelRatio = 1; // Store pixel ratio to avoid recalculation

    // Particle class with mobile-friendly adjustments
    class Particle {
      constructor() {
        // Wait for canvas to be properly sized before creating particles
        const rect = canvas.getBoundingClientRect();
        const logicalWidth = rect.width || canvas.clientWidth || window.innerWidth;
        const logicalHeight = rect.height || canvas.clientHeight || window.innerHeight;

        this.x = Math.random() * logicalWidth;
        this.y = Math.random() * logicalHeight;

        // Adjust speed based on device (slower on mobile for better performance)
        const isMobile = window.innerWidth < 768;
        this.baseSpeed = isMobile ? 4 : 6; // Slower on mobile

        this.angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(this.angle) * this.baseSpeed;
        this.vy = Math.sin(this.angle) * this.baseSpeed;
        this.originalVx = this.vx;
        this.originalVy = this.vy;

        // Slightly larger particles on mobile for better visibility
        this.radius = isMobile ? Math.random() * 2 + 2 : Math.random() * 2 + 0.8;
        this.maxSpeed = isMobile ? 12 : 16;
      }

      update(deltaTime) {
        // Convert deltaTime from milliseconds to seconds
        const dt = deltaTime / 1000;

        // Get current canvas dimensions
        const rect = canvas.getBoundingClientRect();
        const logicalWidth = rect.width || canvas.clientWidth || window.innerWidth;
        const logicalHeight = rect.height || canvas.clientHeight || window.innerHeight;

        // Mouse/touch repulsion
        if (mouse.active && mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius && distance > 0) {
            const force = (mouse.radius - distance) / mouse.radius;
            const angle = Math.atan2(dy, dx);

            // Gentle repulsion (pixels per second)
            const repulsionForce = 40;
            this.vx += Math.cos(angle) * force * repulsionForce * dt;
            this.vy += Math.sin(angle) * force * repulsionForce * dt;
          }
        }

        // Return to original velocity gradually
        const returnForce = 1.5;
        this.vx += (this.originalVx - this.vx) * returnForce * dt;
        this.vy += (this.originalVy - this.vy) * returnForce * dt;

        // Apply gentle friction
        const friction = 0.98;
        this.vx *= Math.pow(friction, dt * 60);
        this.vy *= Math.pow(friction, dt * 60);

        // Limit speed
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > this.maxSpeed) {
          this.vx = (this.vx / speed) * this.maxSpeed;
          this.vy = (this.vy / speed) * this.maxSpeed;
        }

        // Update position based on time
        this.x += this.vx * dt;
        this.y += this.vy * dt;

        // Wrap around edges using logical dimensions
        if (this.x < -10) this.x = logicalWidth + 10;
        if (this.x > logicalWidth + 10) this.x = -10;
        if (this.y < -10) this.y = logicalHeight + 10;
        if (this.y > logicalHeight + 10) this.y = -10;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#d17a28'; // Darker orange
        ctx.globalAlpha = 0.8; // Slightly transparent
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    // Create particles function - defined before being used
    const createParticles = () => {
      particles = [];
      const rect = canvas.getBoundingClientRect();
      const logicalWidth = rect.width || canvas.clientWidth || window.innerWidth;
      const logicalHeight = rect.height || canvas.clientHeight || window.innerHeight;
      const area = logicalWidth * logicalHeight;

      // Reduce particle count on mobile for better performance
      const isMobile = window.innerWidth < 768;
      const densityDivisor = isMobile ? 18000 : 14000; // Less dense on mobile
      const density = area / densityDivisor;

      // Adjust particle count based on device
      const minCount = isMobile ? 20 : 35;
      const maxCount = isMobile ? 40 : 70;
      const count = Math.max(minCount, Math.min(maxCount, Math.floor(density)));

      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }

      particlesRef.current = particles;
    };

    // Draw connections function - defined before being used
    const drawConnections = () => {
      const isMobile = window.innerWidth < 768;
      const connectionDistance = isMobile ? 100 : 120; // Shorter connections on mobile
      const maxConnections = isMobile ? 2 : 4; // Limit connections on mobile for performance

      for (let i = 0; i < particles.length; i++) {
        let connectionCount = 0;

        for (let j = i + 1; j < particles.length && connectionCount < maxConnections; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = '#c7914d'; // Darker line color
            ctx.globalAlpha = (connectionDistance - distance) / connectionDistance * 0.5;
            ctx.lineWidth = isMobile ? 1 : 1.2; // Thinner on mobile
            ctx.stroke();
            ctx.globalAlpha = 1;
            connectionCount++;
          }
        }
      }
    };

    // Set canvas size with proper scaling for mobile/retina displays
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return; // Don't resize if dimensions are 0

      // Reset the transform matrix before applying new scaling
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      pixelRatio = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for performance

      // Set actual canvas size (accounting for device pixel ratio)
      canvas.width = rect.width * pixelRatio;
      canvas.height = rect.height * pixelRatio;

      // Scale the context to match device pixel ratio
      ctx.scale(pixelRatio, pixelRatio);

      // Set CSS size (what user sees)
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';

      // Recreate particles when canvas is resized
      createParticles();
    };

    // Wait for DOM to be ready and canvas to have dimensions
    const initializeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        resizeCanvas();
        return true;
      }
      return false;
    };

    // Try to initialize immediately, if not ready wait a bit
    if (!initializeCanvas()) {
      const initTimer = setTimeout(() => {
        initializeCanvas();
      }, 100);
    }

    window.addEventListener('resize', resizeCanvas);

    // Unified pointer event handling (works for both mouse and touch)
    const getPointerPosition = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : null);
      const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : null);

      if (clientX !== null && clientY !== null) {
        return {
          x: clientX - rect.left,
          y: clientY - rect.top
        };
      }
      return null;
    };

    // Touch events for mobile devices
    const handleTouchStart = (e) => {
      e.preventDefault();
      const pos = getPointerPosition(e);
      if (pos) {
        mouse.x = pos.x;
        mouse.y = pos.y;
        mouse.active = true;
      }
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      const pos = getPointerPosition(e);
      if (pos) {
        mouse.x = pos.x;
        mouse.y = pos.y;
        mouse.active = true;
      }
    };

    const handleTouchEnd = (e) => {
      e.preventDefault();
      mouse.active = false;
      // Delay clearing position to allow for smooth transition
      setTimeout(() => {
        if (!mouse.active) {
          mouse.x = null;
          mouse.y = null;
        }
      }, 200);
    };

    // Mouse events for desktop
    let mouseMoveTimeout;
    const handleMouseMove = (e) => {
      const pos = getPointerPosition(e);
      if (pos) {
        mouse.x = pos.x;
        mouse.y = pos.y;
        mouse.active = true;

        clearTimeout(mouseMoveTimeout);
        mouseMoveTimeout = setTimeout(() => {
          mouse.active = false;
        }, 400);
      }
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
      mouse.active = false;
    };

    // Add event listeners - prioritize touch events for mobile
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
      // Touch device - use touch events
      canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
      canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
      canvas.addEventListener('touchend', handleTouchEnd, { passive: false });
      canvas.addEventListener('touchcancel', handleTouchEnd, { passive: false });
    } else {
      // Non-touch device - use mouse events
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }

    // Animation loop with proper timing and mobile optimization
    let lastTime = 0;
    const animate = (currentTime) => {
      if (!isAnimating) return;

      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      // Skip if deltaTime is too large (tab was inactive) or too small
      if (deltaTime > 100 || deltaTime < 16) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      // Get current canvas dimensions
      const rect = canvas.getBoundingClientRect();
      const width = rect.width || canvas.clientWidth;
      const height = rect.height || canvas.clientHeight;

      // Clear canvas using client dimensions
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.update(deltaTime);
        particle.draw();
      });

      // Draw connections
      drawConnections();

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    isAnimating = true;
    animationRef.current = requestAnimationFrame(animate);

    // Visibility change handler to pause/resume animation
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isAnimating = false;
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      } else {
        isAnimating = true;
        lastTime = performance.now();
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup function
    return () => {
      isAnimating = false;
      isInitializedRef.current = false;

      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      if (isTouchDevice) {
        canvas.removeEventListener('touchstart', handleTouchStart);
        canvas.removeEventListener('touchmove', handleTouchMove);
        canvas.removeEventListener('touchend', handleTouchEnd);
        canvas.removeEventListener('touchcancel', handleTouchEnd);
      } else {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      clearTimeout(mouseMoveTimeout);
    };
  }, []);

  return (
    <div className="w-full h-full absolute top-0 left-0 z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          display: 'block',
          touchAction: 'none', // Prevent scrolling when touching canvas
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          userSelect: 'none'
        }}
      />
    </div>
  );
};

export default ParticlesContainer;
