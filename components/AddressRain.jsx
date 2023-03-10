import React, { useState, useEffect, useRef } from 'react';

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

    // Setting up the rabbit and the letters
    const rabbit = 'rabbit';
    const letters = ('0x047C297fb2fFB8e4e27d47b7dCc9cFC487437432' + rabbit).split('');
    const letterColor = 'rgba(130, 71, 229, 1)'; //'rgba(200, 0, 110, 1)' 'rgba(130, 71, 229, .5)'

    // Setting up the columns
    const fontSize = 50;
    const columns = canvas.width / fontSize;
 
    // Setting up the drops
    const dropsArray = Array.from({ length: columns }).fill(canvas.height);
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
        ctx.textAlign = "center";
        if(rabbit.includes(text)){
          ctx.fillStyle = letterColor; 
          ctx.fillRect((i * fontSize)-fontSize/2 +fontSize/4, (drops[i] * fontSize)-fontSize/2+fontSize/10, fontSize/2, fontSize/2);
          ctx.fillStyle = 'rgba(0, 0, 0, 1)'; 
          ctx.font = ''+fontSize/2+'px Overpass Mono';  
        }else{

          ctx.fillStyle = letterColor;
          ctx.font = ''+fontSize/2+'px Overpass Mono';
        }
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        drops[i]++;
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
          drops[i] = 0;
        }
      }
    }

    // Loop the animation
    const interval = setInterval(draw, 100);
    return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef} />;
};

const AddressRain = () => {
  return (
    <div className='absolute' >
      <CanvasAnimation />
    </div >
  );
};

export default AddressRain;
