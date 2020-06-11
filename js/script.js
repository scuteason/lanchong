/* 
 * CANDYLAND COLLISION
 * When a candy ball collides with another one, they change size.
 *
 * Code remix from Mozillas's tutorial on object building practice with canvas:
 * https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_building_practice
 *
 * #codevember 21 - FAST
 * #027 - #100DaysOfCode
 * By ilithya | 2019
 */

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const colorBg = '#957dad'; // purple
const colorsArr = [
'#99e5c3', // green
'#fec8d8', // pink 
'#99e1e5', // blue
'#f6f6c6',
'#ff7575' // yellow 

];
const candyArr = [];

const paintCanvasBg = () => {
  ctx.fillStyle = colorBg;
  ctx.fillRect(0, 0, width, height);
};
const paintText = () => {

};


const randomNrInc = (minNum, maxNum) => {
  const min = Math.ceil(minNum);
  const max = Math.floor(maxNum);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const Ball = {
  // Based on Mozillas's object building practice code
  init(x, y, vel, color, size) {
    this.x = x;
    this.y = y;
    this.velX = randomNrInc(vel * -1, vel);
    this.velY = randomNrInc(vel * -1, vel);
    this.color = color;
    this.size = size;

    return this;
  },
  draw() {
    const TAU = 2 * Math.PI;

    ctx.beginPath();
    ctx.fillStyle = this.color; // Ball Color
    ctx.arc(this.x, this.y, this.size, 0, TAU); // To draw circle
    ctx.fill();
  },
  update() {
    if (this.x + this.size >= width) {
      this.velX = -this.velX;
    }

    if (this.x - this.size <= 0) {
      this.velX = -this.velX;
    }

    if (this.y + this.size >= height) {
      this.velY = -this.velY;
    }

    if (this.y - this.size <= 0) {
      this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
  },
  collisionDetect(max, min) {
    for (let i = 0; i < candyArr.length; i++) {
      if (!(this === candyArr[i])) {
        const dx = this.x - candyArr[i].x;
        const dy = this.y - candyArr[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.size + candyArr[i].size) {
          candyArr[i].size = candyArr[i].size >= max ? min : this.size++;
        }
      }
    }
  } };


const sa = width * height;
const candy = {
  totalBalls: Math.ceil(Math.sqrt(sa / 400)),
  ballVelocity: Math.floor(Math.sqrt(sa / 20000)),
  maxBallSize: 18,
  minBallSize: 8,
  ballSize() {
    return randomNrInc(this.minBallSize, this.maxBallSize);
  },
  ballX() {
    return randomNrInc(this.ballSize(), width - this.ballSize());
  },
  ballY() {
    return randomNrInc(this.ballSize(), height - this.ballSize());
  },
  ballColor() {
    const randomColor = Math.floor(Math.random() * colorsArr.length);
    return colorsArr[randomColor];
  },
  generate() {
    for (let i = 0; i < this.totalBalls; i++) {
      const newBall = Object.create(Ball).init(
      this.ballX(),
      this.ballY(),
      this.ballVelocity,
      this.ballColor(),
      this.ballSize());

      candyArr.push(newBall);
    }
  } };

candy.generate();

function loop() {
  paintCanvasBg();

  // Based on Mozillas's object building practice code
  for (let i = 0; i < candyArr.length; i++) {
    candyArr[i].draw();
    candyArr[i].update();
    candyArr[i].collisionDetect(candy.maxBallSize, candy.minBallSize);
  }

  requestAnimationFrame(loop);
}
loop();