import React, { useEffect, useRef } from "react";
const WorldMap = () => {
  let colorArray = [
    "green",
    "red",
    "yellow",
    "black",
    "blue",
    "orange",
    "skyblue",
    "lightblue",
  ];
  const canvasRef = useRef(null);
  const mouse = { x: undefined, y: undefined };
  // function randomColor(colors) {
  //   return colors[colorArray[Math.floor(Math.random() * colors.length)]];
  // }

  function Circle(x, y, ctx, color, raduis, dx, dy, gravity) {
    // console.log(x);
    this.y = y;
    this.x = x;
    this.dx = dx;
    this.dy = dy;
    this.ctx = ctx;
    this.raduis = raduis;
    this.color = color;
    this.draw = function () {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.raduis, 0, Math.PI * 2, false);
      this.ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    };
    this.update = function () {
      if (this.y + this.raduis > ctx.canvas.height) {
        this.dy = -this.dy * 0.9;
      } else {
        this.dy += gravity;
      }
      console.log(this.y);
      this.y += this.dy;
      this.draw();
    };
  }
  window.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
  });
  // for giving size to canvas dynamicaly
  window.addEventListener("resize", (event) => {
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;
  });
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let ball;
    let animationId;

    function init() {
      ball = new Circle(
        ctx.canvas.width / 2,
        ctx.canvas.height / 2,
        ctx,
        "red",
        50,
        1,
        1,
        1
      );
    }

    const render = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ball.update();
      animationId = requestAnimationFrame(render);
    };
    init();
    render();

    return () => window.cancelAnimationFrame(animationId);
  }, []);
  return (
    <>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </>
  );
};

export default WorldMap;
