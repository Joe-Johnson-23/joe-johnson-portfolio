import React, { useState, useEffect, useRef } from 'react';

function InteractiveTitle({ text, bubblePositions = [] }) {
  const [letterColors, setLetterColors] = useState({});
  const letterRefs = useRef([]);

  // Convert hex to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 255, g: 255, b: 255 };
  };

  // Blend multiple colors
  const blendColors = (colors) => {
    if (colors.length === 0) return 'white';
    if (colors.length === 1) return colors[0];
    
    const rgbColors = colors.map(hexToRgb);
    const blended = rgbColors.reduce((acc, color) => ({
      r: acc.r + color.r,
      g: acc.g + color.g,
      b: acc.b + color.b
    }), { r: 0, g: 0, b: 0 });
    
    return `rgb(${Math.round(blended.r / colors.length)}, ${Math.round(blended.g / colors.length)}, ${Math.round(blended.b / colors.length)})`;
  };

  useEffect(() => {
    const checkCollisions = () => {
      const newColors = {};
      
      letterRefs.current.forEach((letterEl, index) => {
        if (!letterEl) return;
        
        const rect = letterEl.getBoundingClientRect();
        const letterCenterX = rect.left + rect.width / 2;
        const letterCenterY = rect.top + rect.height / 2;
        
        const touchingColors = [];
        
        bubblePositions.forEach(bubble => {
          const bubbleCenterX = bubble.x + bubble.size / 2;
          const bubbleCenterY = bubble.y + bubble.size / 2;
          const bubbleRadius = bubble.size / 2;
          
          // Distance from letter center to bubble center
          const dx = letterCenterX - bubbleCenterX;
          const dy = letterCenterY - bubbleCenterY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Check if letter is within bubble radius (with some padding for the letter size)
          const letterRadius = Math.max(rect.width, rect.height) / 2;
          if (distance < bubbleRadius + letterRadius) {
            touchingColors.push(bubble.color);
          }
        });
        
        if (touchingColors.length > 0) {
          newColors[index] = blendColors(touchingColors);
        }
      });
      
      setLetterColors(newColors);
    };

    const animationId = requestAnimationFrame(function animate() {
      checkCollisions();
      requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(animationId);
  }, [bubblePositions]);

  const letters = text.split('');

  return (
    <h1 style={{
      position: 'absolute',
      top: '40px',
      left: '50%',
      transform: 'translateX(-50%)',
      fontSize: '6rem',
      fontFamily: '"Cormorant Garamond", Georgia, serif',
      fontWeight: 600,
      letterSpacing: '0.05em',
      zIndex: 50,
      whiteSpace: 'nowrap',
    }}>
      {letters.map((letter, index) => (
        <span
          key={index}
          ref={el => letterRefs.current[index] = el}
          style={{
            color: letterColors[index] || 'white',
            textShadow: letterColors[index] 
              ? `0 0 30px ${letterColors[index]}, 0 0 60px ${letterColors[index]}` 
              : '0 0 30px rgba(255,255,255,0.4)',
            transition: 'color 0.15s ease, text-shadow 0.15s ease',
            display: 'inline-block',
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </h1>
  );
}

export default InteractiveTitle;

