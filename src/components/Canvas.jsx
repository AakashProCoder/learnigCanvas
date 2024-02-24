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
  const drawRect = (ctx, count) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.filStyle = "green";
    const delta = count % 800;
    ctx.fillRect(10 + delta, 10, 100, 100);
  };
  const drawLine = (ctx, count) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const delta = count % 800;
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    console.log("drow hua");
    ctx.beginPath();
    ctx.moveTo(10 + delta, 50);
    ctx.lineTo(20 + delta, 50);
    ctx.stroke();
  };
  function Circle(x, y, ctx, dx, dy, raduis) {
    // console.log(x);

    this.y = y;
    this.x = x;
    this.dx = dx;
    this.dy = dy;
    this.ctx = ctx;
    this.raduis = raduis;
    this.minRaduis = raduis;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    // console.log("x=>", this.x, "y=>", this.y);
    this.draw = function () {
      // console.log(x, y);
      this.ctx.fillStyle = this.color;
      this.ctx.beginPath();
      this.ctx.lineWidth = 5;
      this.ctx.arc(this.x, this.y, this.raduis, 0, Math.PI * 2, false);

      ctx.fill();
    };
    this.update = function () {
      if (
        this.x + this.raduis >= this.ctx.canvas.width ||
        this.x - this.raduis < 0
      ) {
        this.dx = -this.dx;
      }
      if (
        this.y + this.raduis >= this.ctx.canvas.height ||
        this.y - this.raduis < 0
      ) {
        this.dy = -this.dy;
      }
      this.x += this.dx;
      this.y += this.dy;
      //intrectivity
      if (
        mouse.x - this.x < 100 &&
        mouse.x - this.x > -100 &&
        mouse.y - this.y < 100 &&
        mouse.y - this.y > -100
      ) {
        if (this.raduis < 100) this.raduis += 1;
      } else if (this.raduis > this.minRaduis) {
        this.raduis = this.raduis - 1;
      }
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

    let circles = [];
    for (let i = 0; i < 800; i++) {
      let redius = Math.random() * 3 + 5;
      let x = Math.random() * (ctx.canvas.width - redius * 2) + redius;
      let y = Math.random() * (ctx.canvas.height - redius * 2) + redius;
      // console.log(x, y);
      let dx = (Math.random() - 0.5) * 8;
      let dy = (Math.random() - 0.5) * 8;
      circles.push(new Circle(x, y, ctx, dx, dy, redius));
    }
    // console.log(circles);
    // let x = Math.random() * ctx.canvas.width;
    // let y = Math.random() * ctx.canvas.height;
    //  console.log(x, y);
    // let dx = (Math.random() - 0.5) * 8;
    // let dy = (Math.random() - 0.5) * 8;
    //  var circle = new Circle(x, y, ctx, dy, dx, redius);

    let animationId;

    const render = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      // Reverse direction when reaching canvas boundaries
      // circle.draw();
      // circle.update();
      animationId = requestAnimationFrame(render);
      for (let i = 0; i < circles.length; i++) {
        circles[i].draw();
        circles[i].update();
      }
    };
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
