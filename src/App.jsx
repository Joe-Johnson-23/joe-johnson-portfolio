import React, { useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import InfiniteSpiral from './components/InfiniteSpiral';
import StarryBackground from './components/StarryBackground';
import FloatingBubble from './components/FloatingBubble';
import InteractiveTitle from './components/InteractiveTitle';

function Home() {
  const [bubblePositions, setBubblePositions] = useState({});

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
        size={140}
        initialX={window.innerWidth * 0.25}
        initialY={window.innerHeight * 0.4}
        onPositionChange={handleBubblePositionChange}
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
      >
        Health Dashboard
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
