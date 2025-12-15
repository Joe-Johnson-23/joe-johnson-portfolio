import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function FloatingBubble({ children, href, to, color = '#4dabf7', size = 120, initialX, initialY, onPositionChange, id }) {
  const [position, setPosition] = useState({ 
    x: initialX ?? Math.random() * (window.innerWidth - size), 
    y: initialY ?? Math.random() * (window.innerHeight - size) 
  });
  const [isHovered, setIsHovered] = useState(false);
  const velocityRef = useRef({
    x: (Math.random() - 0.5) * 2,
    y: (Math.random() - 0.5) * 2
  });
  const positionRef = useRef(position);

  useEffect(() => {
    positionRef.current = position;
    if (onPositionChange) {
      onPositionChange(id, { x: position.x, y: position.y, size, color });
    }
  }, [position, onPositionChange, id, size, color]);

  useEffect(() => {
    let animationId;
    
    const animate = () => {
      if (!isHovered) {
        const vel = velocityRef.current;
        let newX = positionRef.current.x + vel.x;
        let newY = positionRef.current.y + vel.y;

        // Bounce off walls
        if (newX <= 0 || newX >= window.innerWidth - size) {
          vel.x *= -1;
          newX = Math.max(0, Math.min(window.innerWidth - size, newX));
        }
        if (newY <= 0 || newY >= window.innerHeight - size) {
          vel.y *= -1;
          newY = Math.max(0, Math.min(window.innerHeight - size, newY));
        }

        // Add slight random drift
        vel.x += (Math.random() - 0.5) * 0.1;
        vel.y += (Math.random() - 0.5) * 0.1;

        // Clamp velocity
        const maxSpeed = 2;
        vel.x = Math.max(-maxSpeed, Math.min(maxSpeed, vel.x));
        vel.y = Math.max(-maxSpeed, Math.min(maxSpeed, vel.y));

        positionRef.current = { x: newX, y: newY };
        setPosition({ x: newX, y: newY });
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isHovered, size]);

  const bubbleStyle = {
    position: 'absolute',
    left: position.x,
    top: position.y,
    width: size,
    height: size,
    borderRadius: '50%',
    background: `radial-gradient(circle at 30% 30%, ${color}dd, ${color}88 40%, ${color}44 70%, transparent)`,
    boxShadow: `
      0 0 20px ${color}66,
      0 0 40px ${color}33,
      inset 0 0 20px ${color}44,
      inset -5px -5px 15px rgba(255,255,255,0.1)
    `,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    transform: isHovered ? 'scale(1.15)' : 'scale(1)',
    zIndex: isHovered ? 100 : 10,
    border: `2px solid ${color}88`,
    backdropFilter: 'blur(5px)',
  };

  const textStyle = {
    color: 'white',
    fontSize: size * 0.16,
    fontFamily: '"Bangers", cursive',
    fontWeight: 400,
    textAlign: 'center',
    textShadow: '2px 2px 0 rgba(0,0,0,0.3), 0 0 15px rgba(255,255,255,0.3)',
    padding: '10px',
    userSelect: 'none',
    letterSpacing: '0.08em',
  };

  const content = (
    <div
      style={bubbleStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span style={textStyle}>{children}</span>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
        {content}
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to} style={{ textDecoration: 'none' }}>
        {content}
      </Link>
    );
  }

  return content;
}

export default FloatingBubble;

