let p1, p2, p3;
let colors = [255,255,255]
let angle = 0;
let bigAngle = 0;
let r = 15;
let loopers = [];
let inc = 50;

let cols = 20, rows = 20;

function mapAngleToColor(angle){
    return map(Math.abs(angle), 0.0, 1.0, 0, 255)
}


function setup()  {
  createCanvas(1000,800);
  // Make a new Pendulum with an origin position and armlength
    p1 = new Pendulum(createVector(800,0),175)
    p2 = new Pendulum(createVector(800,200), 125)
    p3 = new Pendulum(createVector(800,400), 100)
    pendulums = [p1,p2,p3]
    loopers = make2darray(cols, rows);
  
    for(let i = 0; i < cols; i++){
      for(let j = 0; j < rows; j++){
        
        
        //let angle = i/width + j/height;
        //let angle = i+j*width;
        
        const xangle = map(mouseX, 0, width, -TWO_PI, TWO_PI);
        const yangle = map(mouseY, 0, height, -TWO_PI, TWO_PI);
        
        angle = (xangle * (i / width)*4) + (yangle * (j / height)*8);
        
        //console.log(angle);
        c = map(angle, -2, 2, 0, 50); 
        
    
        loopers[i][j] = new Looper(i* (width/cols), 100, angle, c);
        loopers[i][j] = new Looper(i* (width/cols), j * (height/rows), angle, c);
    
      }
    }
}

function draw() {
  
  background(colors);
  pendulums.forEach((pendulum, i) => {
    colors[i] = mapAngleToColor(pendulum.angle)  
    pendulum.go()
  })
  for(let i =0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      loopers[i][j].display();

    }
  }
}

function Looper(bigX, bigY, angle, h){
  this.bigX = bigX
  this.bigY = bigY;
  this.angle = angle;
  this.waveAngle = this.angle;
  this.h = h;
  this.r = 0.5 - cos(this.h*17.0) * 255;
  this.g = 0.5- cos(this.h*13.0) * 255;
  this.b = 0.5-cos(this.h*23.0) * 255;
  
    
  
  this.display = function(){
      this.r = 0.5 - cos(this.h*17.0) * 255;
  this.g = 0.5- cos(this.h*13.0) * 255;
  this.b = 0.5-cos(this.h*23.0) * 255;
    
    
      let x = cos(this.angle * TWO_PI) * r;
      let y = sin(this.angle * TWO_PI) * r;
      
    
          noFill();
      //noStroke()
    stroke(250, 50);
      ellipse(this.bigX, this.bigY, r * 2);
    
      noStroke();
     // fill(this.hue, 220,190,50);
      fill(this.r, this.g, this.b);
      ellipse(this.bigX+x, this.bigY+ y, r/2);



     this.angle+=0.01;
      this.h+=0.005;
    this.waveAngle+=0.01;
      
    
  } 
}


function make2darray(cols, rows){

  let array = new Array(cols);
  
  for(let i=0; i < array.length; i++){
  
    array[i] = new Array(rows);
  
  }
  return array
}

