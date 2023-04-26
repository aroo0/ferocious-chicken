const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

// Define the region for ball movement
let regionWidth = canvas.width * 0.9;
let regionHeight = canvas.height;
let regionX = (canvas.width - regionWidth) / 2;
let regionY = (canvas.height - regionHeight) / 2;

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    regionWidth = canvas.width;
    regionHeight = canvas.height;
    regionX = (canvas.width - regionWidth) / 2;
    regionY = (canvas.height - regionHeight) / 2;
    balls = []
    generateBalls(regionX, regionY, regionWidth, regionHeight)

})

let balls = [];
const mouse = {
    x: null,
    y: null

}
canvas.addEventListener('mousemove', function(event) {
    mouse.x = event.x
    mouse.y = event.y

})


// Ball class
class Ball {
  constructor(x, y, dx, dy, radiusX, radiusY, rotation, endAngle,  color, strokeColor) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radiusX = radiusX;
    this.radiusY = radiusY
    this.rotation = rotation
    this.endAngle = endAngle
    this.color = color;
    this.strokeColor = strokeColor
    this.deceleration = 0.001; // Deceleration factor for slowing down over time
    this.minDistance = 300; // Minimum distance between ball and mouse cursor

  }

  // Update ball position
  update() {
    const dxMouse = mouse.x - this.x;
    const dyMouse = mouse.y - this.y;
    const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

    // Check for collision with mouse cursor
    if (distanceMouse < this.minDistance) {
        // Calculate new velocities to move ball away from mouse cursor
        const angle = Math.atan2(dyMouse, dxMouse);
        const targetX = this.x - Math.cos(angle) * this.minDistance;
        const targetY = this.y - Math.sin(angle) * this.minDistance;
        this.dx = (targetX - this.x) * 0.01; // Adjust velocity for smoother movement
        this.dy = (targetY - this.y) * 0.01; // Adjust velocity for smoother movement
    }

    this.x += this.dx;
    this.y += this.dy;

    // Apply deceleration to velocities
    this.dx *= (1 - this.deceleration);
    this.dy *= (1 - this.deceleration);

// Check for collision with canvas edges
if (this.x + this.radiusX > regionX + regionWidth) {
  this.x = regionX + regionWidth - this.radiusX; // Set ball just inside right edge
  this.dx = -Math.abs(this.dx); // Invert velocity to move away from right edge
} else if (this.x - this.radiusX < regionX) {
  this.x = regionX + this.radiusX; // Set ball just inside left edge
  this.dx = Math.abs(this.dx); // Invert velocity to move away from left edge
}

if (this.y + this.radiusY > regionY + regionHeight) {
  this.y = regionY + regionHeight - this.radiusY; // Set ball just inside bottom edge
  this.dy = -Math.abs(this.dy); // Invert velocity to move away from bottom edge
} else if (this.y - this.radiusY < regionY) {
  this.y = regionY + this.radiusY; // Set ball just inside top edge
  this.dy = Math.abs(this.dy); // Invert velocity to move away from top edge
}
    // Draw ball
    ctx.beginPath();
    ctx.ellipse(this.x, this.y , this.radiusX , this.radiusY, this.rotation, 0, this.endAngle);
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.strokeColor;
    ctx.lineWidth = 50;
    ctx.stroke()
    ctx.fill();
    ctx.closePath();

  }
}

function generateBalls(regionX, regionY, regionWidth, regionHeight) {
  const ballSets = [
    [
      { radiusX: 60, radiusY: 120, rotation: 15, color: 'rgba(175, 91, 91, 0.33)', strokeColor: 'rgba(175, 91, 91, 0.33)', count: 12, maxSpeed: 1 },
      { radiusX: 60, radiusY: 120, rotation: 20, color: 'rgba(16, 45, 49, 1)', strokeColor: 'rgba(14, 21, 22, 0.6)', count: 14, maxSpeed: 1 },
      { radiusX: 50, radiusY: 120, rotation: 30, color: 'rgba(48, 83, 136, 1)', strokeColor: 'rgba(48, 83, 136, 0.49)', count: 14, maxSpeed: 1 },
      { radiusX: 60, radiusY: 125, rotation: 10, color: 'rgba(111, 63, 112, 1)', strokeColor: 'rgba(111, 63, 112, 0.49)', count: 14, maxSpeed: 1 },
      { radiusX: 70, radiusY: 120, rotation: 40, color: 'rgba(12, 71, 71, .8)', strokeColor: 'rgba(12, 71, 71, 1)', count: 30, maxSpeed: 1 },
      { radiusX: 60, radiusY: 120, rotation: 30, color: 'rgba(220, 66, 121, .6)', strokeColor: 'rgba(80, 29, 52, .5)', count: 26, maxSpeed: 1 }
    ]
  ];

  ballSets.forEach((ballSet) => {
    ballSet.forEach((params) => {
      for (let i = 0; i < params.count; i++) {
        const x = regionX + Math.random() * regionWidth;
        const y = regionY + Math.random() * regionHeight;
        const dx = Math.random() * params.maxSpeed;
        const dy = Math.random() * params.maxSpeed;
        const endAngle = Math.PI * 2;
        balls.push(new Ball(x, y, dx, dy, params.radiusX, params.radiusY, params.rotation, endAngle, params.color, params.strokeColor));
      }
    });
  });
}


// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Update and draw balls
  balls.forEach(ball => {
    ball.update();
  });
  
  requestAnimationFrame(animate);
}

generateBalls(regionX, regionY, regionWidth, regionHeight)
animate();


