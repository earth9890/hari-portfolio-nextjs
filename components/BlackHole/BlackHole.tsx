'use client';

import { useEffect, useRef, useState } from 'react';

interface BlackHoleProps {
  className?: string;
  onCollapseStart?: () => void;
  onCollapseComplete?: () => void;
}

// State machine for black hole stability
type StabilityState = 'calm' | 'unstable' | 'collapsing' | 'transitioning';

// Shake detection configuration
const SHAKE_CONFIG = {
  threshold: 15,
  debounceDelay: 3000,
  surgeDuration: 600,           // Chromatic burst duration
  collapseDuration: 2500,       // Singularity pull duration
  snapDuration: 180,            // Snap to darkness
};

export default function BlackHole({ className = '', onCollapseStart, onCollapseComplete }: BlackHoleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const stabilityRef = useRef<StabilityState>('calm');
  const intensityRef = useRef<number>(0);
  const collapseProgressRef = useRef<number>(0);
  const lastShakeRef = useRef<number>(0);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    // Show hint on mobile after a few seconds
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      const hintTimer = setTimeout(() => setShowHint(true), 5000);
      const hideTimer = setTimeout(() => setShowHint(false), 12000);
      return () => {
        clearTimeout(hintTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [onCollapseComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let time = 0;
    const mouse = { x: 0.5, y: 0.5 };
    const gyro = { x: 0, y: 0, z: 0 }; // Gyroscope data

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // ============================================
    // GYROSCOPE (DeviceOrientation)
    // ============================================
    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (prefersReducedMotion || !event.beta || !event.gamma) return;

      // Beta: front-to-back tilt (-180 to 180), Gamma: left-to-right tilt (-90 to 90)
      // Normalize to -1 to 1 range
      gyro.x = (event.gamma || 0) / 45; // Tilt left/right
      gyro.y = (event.beta || 0) / 45;  // Tilt front/back
      gyro.z = 0; // Can use alpha for rotation if needed
    };

    // ============================================
    // SHAKE DETECTION (DeviceMotion API)
    // ============================================
    let lastX = 0, lastY = 0, lastZ = 0;
    let lastUpdateTime = Date.now();

    const handleMotion = (event: DeviceMotionEvent) => {
      if (prefersReducedMotion) return;

      const accel = event.accelerationIncludingGravity;
      if (!accel) return;

      const now = Date.now();
      const deltaTime = now - lastUpdateTime;

      if (deltaTime < 50) return;

      const deltaX = Math.abs((accel.x || 0) - lastX);
      const deltaY = Math.abs((accel.y || 0) - lastY);
      const deltaZ = Math.abs((accel.z || 0) - lastZ);
      const totalDelta = deltaX + deltaY + deltaZ;

      lastX = accel.x || 0;
      lastY = accel.y || 0;
      lastZ = accel.z || 0;
      lastUpdateTime = now;

      if (totalDelta > SHAKE_CONFIG.threshold) {
        if (now - lastShakeRef.current > SHAKE_CONFIG.debounceDelay) {
          triggerShake(now);
        }
      }
    };

    const triggerShake = (timestamp: number) => {
      if (stabilityRef.current !== 'calm') return;
      lastShakeRef.current = timestamp;
      stabilityRef.current = 'unstable';
    };

    // Request permissions for iOS
    const requestPermissions = async () => {
      // Motion permission
      if (typeof DeviceMotionEvent !== 'undefined' &&
          'requestPermission' in DeviceMotionEvent) {
        try {
          const motionPermission = await (DeviceMotionEvent as any).requestPermission();
          if (motionPermission === 'granted') {
            window.addEventListener('devicemotion', handleMotion);
          }
        } catch (error) {
          console.log('Motion permission error:', error);
        }
      } else {
        window.addEventListener('devicemotion', handleMotion);
      }

      // Orientation permission
      if (typeof DeviceOrientationEvent !== 'undefined' &&
          'requestPermission' in DeviceOrientationEvent) {
        try {
          const orientationPermission = await (DeviceOrientationEvent as any).requestPermission();
          if (orientationPermission === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          }
        } catch (error) {
          console.log('Orientation permission error:', error);
        }
      } else {
        window.addEventListener('deviceorientation', handleOrientation);
      }
    };

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile && !prefersReducedMotion) {
      const enableSensors = () => {
        requestPermissions();
        document.body.removeEventListener('click', enableSensors);
        document.body.removeEventListener('touchstart', enableSensors);
      };
      document.body.addEventListener('click', enableSensors);
      document.body.addEventListener('touchstart', enableSensors);
    }

    // Stars with depth layers
    const stars = Array.from({ length: 400 }, () => ({
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
      z: Math.random() * 20 - 10,
      size: Math.random() * 2.5 + 0.5,
      layer: Math.floor(Math.random() * 3), // 0=far, 1=mid, 2=near
      baseSpeed: Math.random() * 0.5 + 0.5,
    }));

    let collapseStartTime = 0;

    function animate() {
      time += 0.008;

      const now = Date.now();

      // Handle intensity and collapse state
      if (stabilityRef.current === 'unstable') {
        // Chromatic burst phase
        intensityRef.current = Math.min(intensityRef.current + 0.015, 1);
        if (intensityRef.current >= 1) {
          stabilityRef.current = 'collapsing';
          collapseStartTime = now;
          // Notify parent to start UI collapse animation
          onCollapseStart?.();
        }
      } else if (stabilityRef.current === 'collapsing') {
        // Singularity pull phase
        const collapseElapsed = now - collapseStartTime;
        collapseProgressRef.current = Math.min(collapseElapsed / SHAKE_CONFIG.collapseDuration, 1);

        if (collapseProgressRef.current >= 1) {
          stabilityRef.current = 'transitioning';
          // Trigger snap and callback
          setTimeout(() => {
            onCollapseComplete?.();
          }, SHAKE_CONFIG.snapDuration);
        }
      } else if (stabilityRef.current === 'transitioning') {
        // Snap to darkness - fade out everything
        intensityRef.current = Math.max(0, intensityRef.current - 0.1);
        collapseProgressRef.current = 1;
      } else {
        intensityRef.current = 0;
        collapseProgressRef.current = 0;
      }

      const intensity = intensityRef.current;
      const collapseProgress = collapseProgressRef.current;

      // Clear with deep black
      ctx!.fillStyle = '#000000';
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

      // Center position affected by mouse (desktop) and gyro (mobile)
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const offsetX = isMobile ? gyro.x * 30 : (mouse.x - 0.5) * 50;
      const offsetY = isMobile ? gyro.y * 30 : (mouse.y - 0.5) * 50;

      const centerX = canvas!.width / 2 + offsetX;
      const centerY = canvas!.height / 2 + offsetY;

      // ============================================
      // EVENT HORIZON GLOW (multiple layers)
      // ============================================
      const baseRadius = Math.min(canvas!.width, canvas!.height) * 0.08;

      // Outer glow layer
      for (let i = 0; i < 5; i++) {
        const glowRadius = baseRadius * (1 + i * 0.5) * (1 + intensity * 0.8);
        const gradient = ctx!.createRadialGradient(
          centerX, centerY, 0,
          centerX, centerY, glowRadius
        );

        const pulseAlpha = 0.15 + intensity * 0.3 + Math.sin(time * 2 + i) * 0.05;
        gradient.addColorStop(0, `rgba(255, 200, 150, ${pulseAlpha * 0.8})`);
        gradient.addColorStop(0.2, `rgba(255, 180, 120, ${pulseAlpha * 0.5})`);
        gradient.addColorStop(0.5, `rgba(200, 150, 100, ${pulseAlpha * 0.2})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx!.fillStyle = gradient;
        ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
      }

      // ============================================
      // CHROMATIC BURST (multicolor explosion)
      // ============================================
      if (intensity > 0.5) {
        const burstProgress = (intensity - 0.5) / 0.5;
        const burstRadius = baseRadius * (2 + burstProgress * 8);

        // Create multiple chromatic layers with different colors
        const chromaticColors = [
          { color: [180, 100, 255], phase: 0 },      // Purple
          { color: [100, 200, 255], phase: 0.3 },    // Cyan
          { color: [255, 80, 200], phase: 0.6 },     // Magenta
          { color: [80, 150, 255], phase: 0.9 },     // Electric blue
        ];

        chromaticColors.forEach(({ color, phase }) => {
          const chromaticRadius = burstRadius * (1 + Math.sin(burstProgress * Math.PI * 2 + phase) * 0.3);
          const chromaticGradient = ctx!.createRadialGradient(
            centerX, centerY, baseRadius * 0.5,
            centerX, centerY, chromaticRadius
          );

          const [r, g, b] = color;
          const alpha = burstProgress * 0.4 * (1 - phase * 0.3);

          chromaticGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.8})`);
          chromaticGradient.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, ${alpha * 0.5})`);
          chromaticGradient.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, ${alpha * 0.2})`);
          chromaticGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx!.globalCompositeOperation = 'screen';
          ctx!.fillStyle = chromaticGradient;
          ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
        });

        ctx!.globalCompositeOperation = 'source-over';
      }

      // Light bending distortion field
      const distortionStrength = 0.8 + intensity * 0.5;
      const distortionGradient = ctx!.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, Math.max(canvas!.width, canvas!.height) * distortionStrength
      );
      distortionGradient.addColorStop(0, `rgba(255, 220, 180, ${0.05 + intensity * 0.1})`);
      distortionGradient.addColorStop(0.3, `rgba(200, 180, 150, ${0.02 + intensity * 0.05})`);
      distortionGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx!.fillStyle = distortionGradient;
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

      // ============================================
      // ACCRETION DISK RINGS
      // ============================================
      for (let i = 0; i < 5; i++) {
        const pulseSpeed = 2 + intensity * 12;
        const ringRadius = (baseRadius + i * 40) * (1 + intensity * 0.6) +
                          Math.sin(time * pulseSpeed + i * 0.8) * (15 + intensity * 50);
        const ringAlpha = 0.03 + Math.sin(time + i * 0.6) * 0.02 + intensity * 0.08;

        ctx!.beginPath();
        ctx!.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(255, 200, 150, ${Math.min(ringAlpha, 0.3)})`;
        ctx!.lineWidth = 1 + intensity * 3;
        ctx!.stroke();
      }

      // ============================================
      // STARS WITH GRAVITATIONAL PULL
      // ============================================
      const rotationSpeed = 0.05 + intensity * 0.4;
      const pullStrength = 2.5 + intensity * 6;
      // Accelerate rotation during collapse
      const collapseRotationSpeed = collapseProgress * 3;

      stars.forEach((star) => {
        // Layer-based parallax
        const layerParallax = (star.layer + 1) * 0.3;

        // Distance from center
        const dx = star.x - mouse.x + 0.5;
        const dy = star.y - mouse.y + 0.5;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Gravitational pull - increases dramatically during collapse
        const collapsePullMultiplier = 1 + collapseProgress * 15;
        const pull = 1 / (1 + dist * pullStrength * collapsePullMultiplier);
        const pullOffsetX = -dx * pull * (0.1 + intensity * 0.25 + collapseProgress * 0.8);
        const pullOffsetY = -dy * pull * (0.1 + intensity * 0.25 + collapseProgress * 0.8);

        // Rotation - speeds up during collapse
        const angle = time * (rotationSpeed + collapseRotationSpeed) * (1 - pull * 0.3) * star.baseSpeed;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const rotX = star.x * cos - star.y * sin;
        const rotY = star.x * sin + star.y * cos;

        // Scale compression during collapse - stars get pulled toward center
        const collapseScale = 1 - collapseProgress * 0.7;

        // Gyroscope parallax for background stars
        const gyroOffsetX = gyro.x * 50 * layerParallax;
        const gyroOffsetY = gyro.y * 50 * layerParallax;

        // Screen position with jitter during instability
        const jitterAmount = intensity * 25;
        const jitterX = intensity > 0 ? (Math.random() - 0.5) * jitterAmount : 0;
        const jitterY = intensity > 0 ? (Math.random() - 0.5) * jitterAmount : 0;

        const screenX = centerX + (rotX * canvas!.width * (0.35 + star.layer * 0.1) +
                       pullOffsetX * 120) * collapseScale + gyroOffsetX + jitterX;
        const screenY = centerY + (rotY * canvas!.height * (0.35 + star.layer * 0.1) +
                       pullOffsetY * 120) * collapseScale + gyroOffsetY + jitterY;

        // Opacity based on distance, pull, and intensity - fade near end of collapse
        const fadeAtEnd = collapseProgress > 0.8 ? (1 - collapseProgress) * 5 : 1;
        const alpha = (0.2 + pull * 0.5 + intensity * 0.4) * (0.5 + star.layer * 0.25) * fadeAtEnd;

        ctx!.beginPath();
        ctx!.arc(screenX, screenY, star.size * (1 + intensity * 0.6) * collapseScale, 0, Math.PI * 2);

        // Color shift during instability - more dramatic during collapse
        if (intensity > 0.3 || collapseProgress > 0) {
          const totalIntensity = Math.max(intensity, collapseProgress);
          const r = 168 + totalIntensity * 87;
          const g = 162 + totalIntensity * 58;
          const b = 156 + totalIntensity * 44;
          ctx!.fillStyle = `rgba(${r}, ${g}, ${b}, ${Math.min(alpha, 1)})`;
        } else {
          ctx!.fillStyle = `rgba(168, 162, 156, ${alpha})`;
        }
        ctx!.fill();
      });

      // ============================================
      // ENERGY SURGE PARTICLES
      // ============================================
      if (intensity > 0 || collapseProgress > 0) {
        const particleIntensity = Math.max(intensity, collapseProgress);
        const particleCount = Math.floor(particleIntensity * 40);
        for (let i = 0; i < particleCount; i++) {
          const angle = Math.random() * Math.PI * 2;
          const baseDistance = 50 + Math.random() * 300 * (1 - particleIntensity * 0.4);
          // Pull particles inward during collapse
          const collapsePull = collapseProgress * baseDistance * 0.8;
          const distance = baseDistance - collapsePull;
          const x = centerX + Math.cos(angle) * distance;
          const y = centerY + Math.sin(angle) * distance;
          const size = Math.random() * 3 + particleIntensity * 2;

          ctx!.beginPath();
          ctx!.arc(x, y, size, 0, Math.PI * 2);

          // Chromatic colors during collapse
          const hueShift = collapseProgress * 60;
          const r = 255 + Math.sin(time * 3 + i) * 30;
          const g = 200 + hueShift;
          const b = 180 + hueShift;
          const alpha = particleIntensity * 0.6 * (1 - collapseProgress * 0.7);

          ctx!.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx!.fill();
        }
      }

      // ============================================
      // BLACK HOLE CORE
      // ============================================
      const corePulse = 1 + Math.sin(time * 3) * 0.02 + intensity * 0.1;
      const coreGradient = ctx!.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, baseRadius * corePulse
      );
      coreGradient.addColorStop(0, `rgba(0, 0, 0, 1)`);
      coreGradient.addColorStop(0.7, `rgba(0, 0, 0, 1)`);
      coreGradient.addColorStop(0.85, `rgba(20, 10, 5, ${0.8 + intensity * 0.2})`);
      coreGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx!.beginPath();
      ctx!.arc(centerX, centerY, baseRadius * corePulse, 0, Math.PI * 2);
      ctx!.fillStyle = coreGradient;
      ctx!.fill();

      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('devicemotion', handleMotion);
      window.removeEventListener('deviceorientation', handleOrientation);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 -z-10 ${className}`}
        style={{ width: '100%', height: '100%' }}
      />
      {/* Mobile-only hint */}
      {showHint && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 text-stone-500 text-xs animate-pulse pointer-events-none md:hidden z-50">
          Tip: Shake to collapse spacetime
        </div>
      )}
    </>
  );
}
