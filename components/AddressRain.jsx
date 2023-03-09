import React from 'react';
import { useState, useEffect, useRef } from 'react';

const CanvasAnimation = () => {
  const canvasRef = useRef(null);
  const [drops, setDrops] = useState([]);

  useEffect(() => {
  // Initialising the canvas
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  // Setting the width and height of the canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Setting up the letters
  let letters = '0x047';
  letters = letters.split('');

  // Setting up the columns
  const fontSize = 50;
  const columns = canvas.width / fontSize;

  // Setting up the drops
  const dropsArray = [];
  for (let i = 0; i < columns; i++) {
    dropsArray[i] = 1;
  }
  setDrops(dropsArray);

  // Setting up the draw function
  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, .3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < drops.length; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)];
      // ctx.fillStyle = 'rgba(255, 30, 130, 1)';
      ctx.fillStyle = 'rgba(130, 71, 229, .3)'; 
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      drops[i]++;
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
        drops[i] = 0;
      }
    }
  }

  // Loop the animation
  const interval = setInterval(draw, 200);
  return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef} />;
}
const AddressRain = () => {
  return(
    <div className='bg-black min-w-screen min-h-screen '>
      <CanvasAnimation/>
    </div>
      
    
  );
}
  
  

export default AddressRain;