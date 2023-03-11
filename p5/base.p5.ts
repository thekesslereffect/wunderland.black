import type p5Type from 'p5'

let letterGrid = [];
let keys = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
let keySize = keys.length;
let gridSize = 40;
let mutation = 0.5;
let noiseScale = 0.5;
let noiseSpeed = 0.02;
let speed = 10;
let fontSize = 16;
let opacityScale = 50;
let opacityOffset = -0.7;
let bgColor = 0;
let fontColorR = 255;
let fontColorG = 255;
let fontColorB = 255;
let rabbit = "rabbitRABBIT";
let distortionStrength = 20; // adjust the amplitude of the distortion
let distortionScale = 0.05; // adjust the scale of the distortion

export const setup = (p5: p5Type, canvasParentRef: Element): void => {
  p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
  p5.background(bgColor);
  p5.loadFont('https://fonts.googleapis.com/css2?family=Overpass+Mono:wght@300;400;500;600;700&display=swap')
  p5.textFont("Overpass Mono");

  // fill the letterGrid array with keys
  for (let i = 0; i < gridSize; i++) {
    letterGrid[i] = [];
    for (let j = 0; j < gridSize; j++) {
      letterGrid[i][j] = keys.charAt(p5.floor(p5.random(keySize)));
    }
  }

  // set the frame rate based on the speed variable
  p5.frameRate(speed);
}

export const draw = (p5: p5Type): void => {
  // clear the canvas
  p5.background(bgColor);

  // update the keys in the grid based on the mutation variable
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (p5.random() < mutation) {
        letterGrid[i][j] = keys.charAt(p5.floor(p5.random(keySize)));
      }
    }
  }

  // update the keys in the grid based on Perlin noise and distortion
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let noiseValue = seamlessNoise(p5, i * noiseScale, j * noiseScale, p5.frameCount * noiseSpeed);
      let opacityValue = 1 / (1 + p5.exp(-opacityScale * (noiseValue + opacityOffset)));
      if (opacityValue > 0.1) {
        if (letterGrid[i][j] == "") {
          letterGrid[i][j] = keys.charAt(p5.floor(p5.random(keySize)));
        }
        if (rabbit.includes(letterGrid[i][j])){
            p5.fill(255, 0, 130, opacityValue * 255);
        } else {
            p5.fill(fontColorR, fontColorG, fontColorB, opacityValue * 255);
        }
        
      } else {
        if (letterGrid[i][j] != "") {
          letterGrid[i][j] = "";
        }
      }
      
            // calculate the distortion using seamless Perlin noise
            let distortionX = p5.map(seamlessNoise(p5, i * distortionScale, j * distortionScale + p5.frameCount * noiseSpeed, 1), 0, 1, -distortionStrength, distortionStrength);
            let distortionY = p5.map(seamlessNoise(p5, i * distortionScale + p5.frameCount * noiseSpeed, j * distortionScale, 1), 0, 1, -distortionStrength, distortionStrength);
            let x = i * p5.width / gridSize + p5.width / (2 * gridSize) + distortionX;
            let y = j * p5.height / gridSize + p5.height / (2 * gridSize) + distortionY;
      
            // draw the letter on the canvas
            p5.textSize(fontSize);
            p5.textAlign(p5.CENTER, p5.CENTER);
            p5.text(letterGrid[i][j], x, y);
          }
        }
      }
      
      export const windowResized = (p5: p5Type) => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
      }
      
      function seamlessNoise(p5, x, y, z) {
        let xWrapped = wrapAround(x, 0, p5.width);
        let yWrapped = wrapAround(y, 0, p5.height);
        return p5.noise(xWrapped, yWrapped, z);
      }
      
      function wrapAround(value, min, max) {
        let range = max - min;
        return ((value - min) % range + range) % range + min;
      }
      
