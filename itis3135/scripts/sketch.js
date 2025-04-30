let flowers = []; 

function createFlower() {
  let flower = {
    x: random(20,380),
    y: random(20,380),
    size: random(20, 75),
    lifespan: random(255,300),
    color: color(random(255), random(255), random(255))
  };
  
  return flower;
}

function drawFlower(flower) {
  noStroke();
  fill(flower.color);
  
  ellipse(flower.x, flower.y, flower.size / 2, flower.size);
  ellipse(flower.x, flower.y, flower.size, flower.size / 2);

  fill(255, 204, 0);
  circle(flower.x, flower.y, flower.size / 2);
  
}

  function mousePressed() {
    let flower = createFlower();
  
    flower.x = mouseX; 
    
    flower.y = mouseY;
  
    flowers.push(flower);
  }
  
  function updateAndDrawFlowers() {
    for (let flower of flowers) {
  
      drawFlower(flower);
  
      flower.size *= 0.99;
  
      flower.lifespan -= 1;
      
      if (flower.lifespan <= 0) {
        let i = flowers.indexOf(flower);
        
        flowers.splice(i, 1);
      }
    }
  }
  
  function flowerPower(){
    for (let i = 0; i < 20; i+=1){
      let flower1 = createFlower();
      
      flowers.push(flower1);
    }
  }

  function setup() {
    createCanvas(400, 400);
    
    flowerPower(); 
  }
  
  function draw() {
    background('lightblue');
    
    updateAndDrawFlowers();
  }
  