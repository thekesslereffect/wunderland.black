import type p5Type from 'p5'


let letterGrid: string[][];
let keys = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ,./;'[]-=!@#$%^&*()_+~";
let keySize = keys.length;
let gridSizeMult = 80;
let gridSize = 0;
let mutation = 0.2;
let noiseScale = .1;
let noiseSpeed = 0.015;
let speed = 20;
let fontSize = 16;
let opacityScale = 50;
let opacityOffset = -0.6;
let bgColor = 0;
let fontColorR = 255;
let fontColorG = 255;
let fontColorB = 255;
let rabbit = "rabbitRABBIT";
let distortionStrength = 0; // adjust the amplitude of the distortion
let distortionScale = 0.5; // adjust the scale of the distortion
let distortionFalloff = 0.01; // adjust the falloff of the distortion away from the mouse
let radius = 200;

export const setup = (p5: p5Type, canvasParentRef: Element): void => {
  p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
  p5.background(bgColor);
  p5.loadFont('https://fonts.googleapis.com/css2?family=Overpass+Mono:wght@300;400;500;600;700&display=swap')
  p5.textFont("Overpass Mono");
  gridSize = p5.floor(p5.windowWidth/gridSizeMult);
  // fill the letterGrid array with keys
  letterGrid = new Array(gridSize).fill(null).map(() => new Array(gridSize).fill(''));
  for (let i = 0; i < gridSize; i++) {
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
      if (rabbit.includes(letterGrid[i][j])) {
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
    const mouseDist = p5.dist(p5.mouseX, p5.mouseY, i * p5.width / gridSize, j * p5.height / gridSize);
    if (mouseDist < radius) {
      const falloff = p5.map(mouseDist, 0, radius, 1, distortionFalloff);
      let distortionX = p5.map(seamlessNoise(p5, i * distortionScale, j * distortionScale + p5.frameCount * noiseSpeed, 1), 0, 1, -distortionStrength, distortionStrength) * falloff;
      let distortionY = p5.map(seamlessNoise(p5, i * distortionScale + p5.frameCount * noiseSpeed, j * distortionScale, 1), 0, 1, -distortionStrength, distortionStrength) * falloff;
      let x = i * p5.width / gridSize + p5.width / (2 * gridSize) + distortionX;
      let y = j * p5.height / gridSize + p5.height / (2 * gridSize) + distortionY;

      // draw the letter on the canvas
      p5.textSize(fontSize);
      p5.textAlign(p5.CENTER, p5.CENTER);
      p5.text(letterGrid[i][j], x, y);
    } else {
      let x = i * p5.width / gridSize + p5.width / (2 * gridSize);
      let y = j * p5.height / gridSize + p5.height / (2 * gridSize);

      // draw the letter on the canvas without distortion
      p5.textSize(fontSize);
      p5.textAlign(p5.CENTER, p5.CENTER);
      p5.text(letterGrid[i][j], x, y);
    }
  }
}
}

export const windowResized = (p5: p5Type) => {
p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
}

function seamlessNoise(p5: p5Type, x: number, y: number, z: number) {
let xWrapped = wrapAround(x, 0, p5.width);
let yWrapped = wrapAround(y, 0, p5.height);
return p5.noise(xWrapped, yWrapped, z);
}

function wrapAround(value: number, min: number, max: number) {
let range = max - min;
return ((value - min) % range + range) % range + min;
}