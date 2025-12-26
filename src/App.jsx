import React, { useState, useCallback, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import InfiniteSpiral from './components/InfiniteSpiral';
import StarryBackground from './components/StarryBackground';
import FloatingBubble from './components/FloatingBubble';
import InteractiveTitle from './components/InteractiveTitle';

function Home() {
  const [bubblePositions, setBubblePositions] = useState({});
  const [bubbleSpeed, setBubbleSpeed] = useState(1);

  // Keyboard controls for bubble speed: 'm' = faster, 'n' = slower
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key.toLowerCase() === 'm') {
        setBubbleSpeed(prev => Math.min(prev + 0.5, 5)); // Max speed 5x
      }
      if (event.key.toLowerCase() === 'n') {
        setBubbleSpeed(prev => Math.max(prev - 0.5, 0.25)); // Min speed 0.25x
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleBubblePositionChange = useCallback((id, positionData) => {
    setBubblePositions(prev => ({
      ...prev,
      [id]: positionData
    }));
  }, []);

  const bubblePositionsArray = Object.values(bubblePositions);

  return (
    <div className="app-container" style={{
      minHeight: '100vh',
      width: '100vw',
      position: 'relative',
      overflow: 'hidden',
      color: 'white'
    }}>
      <InteractiveTitle text="Joe Johnson" bubblePositions={bubblePositionsArray} />
      
      <FloatingBubble
        id="coinshop"
        href="https://dollarsandcents.io"
        color="#ffd700"
        size={210}
        initialX={window.innerWidth * 0.25}
        initialY={window.innerHeight * 0.4}
        onPositionChange={handleBubblePositionChange}
        speedMultiplier={bubbleSpeed}
      >
        Coin Shop
      </FloatingBubble>
      
      <FloatingBubble
        id="spirals"
        to="/infinite-spiral"
        color="#ff6b9d"
        size={140}
        initialX={window.innerWidth * 0.6}
        initialY={window.innerHeight * 0.5}
        onPositionChange={handleBubblePositionChange}
        speedMultiplier={bubbleSpeed * 1.5}
      >
        Infinite Spirals
      </FloatingBubble>
      
      <FloatingBubble
        id="health-dashboard"
        href="https://joe-johnson-23.github.io/health-insurance-dashboard/"
        color="#00bcd4"
        size={140}
        initialX={window.innerWidth * 0.45}
        initialY={window.innerHeight * 0.65}
        onPositionChange={handleBubblePositionChange}
        speedMultiplier={bubbleSpeed * 1.5}
      >
        Health Dashboard
      </FloatingBubble>
      
      <FloatingBubble
        id="gradecoin"
        href="https://www.gradecoin.io"
        color="#22c55e"
        size={280}
        initialX={window.innerWidth * 0.5}
        initialY={window.innerHeight * 0.3}
        onPositionChange={handleBubblePositionChange}
        speedMultiplier={bubbleSpeed}
      >
        GradeCoin.io
      </FloatingBubble>
    </div>
  );
}

function App() {
  return (
    <>
      <StarryBackground />
      <Routes>
        <Route path="/" element={<Home />} />
      
        <Route path="/infinite-spiral" element={<InfiniteSpiral />} />
      </Routes>
    </>
  );
}

export default App;
