class Ball {
  constructor(radius) {
    this.radius = radius;
    this.x = Math.random() * (document.querySelector('canvas').width - this.radius);
    this.x = (this.x < this.radius) ? this.x + this.radius : this.x;
    this.y = Math.random() * (document.querySelector('canvas').height - this.radius);
    this.y = (this.y < this.radius) ? this.y + this.radius : this.y;
    this.dx = (Math.random() < 0.5 ? Math.random() * -1 : Math.random() * 1);
    this.dy = (Math.random() < 0.5 ? Math.random() * -1 : Math.random() * 1);
    this.color = Ball.genColor();
  }

  update() {
    if (this.x > document.querySelector('canvas').width - this.radius || this.x < 0 + this.radius) this.dx = -this.dx;
    if (this.y > document.querySelector('canvas').height - this.radius || this.y < 0 + this.radius) this.dy = -this.dy;
    this.x += this.dx;
    this.y += this.dy;
  }

  static get Radius() {
    return Math.random() * 20;
  }

  static genColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
}

(function ($, canvas){
  'use strict';
  var ballsArray = [];
  canvas.style.backgroundColor = Ball.genColor();
  start();

  function start() {
    setupCanvas();
    initBalls();
    requestAnimationFrame(drawBalls);
  }

  function setupCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    $.lineWidth = 6;
    $.lineCap = 'butt';

    canvas.style.border = '2px solid red';
  }

  function initBalls() {
    for (let i = 0; i < 700; i++){
      ballsArray[i] = new Ball(Ball.Radius);
    }
  }

  function drawBalls() {
    $.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(drawBalls);
    for (let i = 0; i < ballsArray.length; i++){
      $.beginPath();
      $.fillStyle = ballsArray[i].color;
      $.arc(ballsArray[i].x, ballsArray[i].y, ballsArray[i].radius, 0, 2 * Math.PI, false);
      ballsArray[i].update();
      $.fill();
    }
  }

})(document.querySelector('canvas').getContext('2d'), document.querySelector('canvas'));
