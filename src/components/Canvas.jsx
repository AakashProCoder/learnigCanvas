import React, { useEffect, useRef } from "react";
const WorldMap = () => {
  const canvasRef = useRef(null);
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
    this.draw = function () {
      // console.log(x, y);
     
      ctx.beginPath();
      ctx.lineWidth = 5;
      ctx.arc(this.x, this.y, this.raduis, 0, Math.PI * 2, false);
      ctx.strokeStyle = "red";
      ctx.stroke();
    };
    this.update = function () {
      if (this.x + this.raduis >= this.ctx.canvas.width || this.x - 100 < 0) {
        this.dx = -this.dx;
      }
      if (this.y + this.raduis >= this.ctx.canvas.height || this.y - 100 < 0) {
        this.dy = -this.dy;
      }
      this.x += this.dx;
      this.y += this.dy;
    };
  }
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let redius = 100;
    let circles = [];
    for (let i = 0; i < 50; i++) {
      let x = Math.random() * ctx.canvas.width;
      let y = Math.random() * ctx.canvas.height;
      // console.log(x, y);
      let dx = (Math.random() - 0.5) * 8;
      let dy = (Math.random() - 0.5) * 8;
      circles.push(new Circle(x, y, ctx, dx, dy, redius));
    }
    console.log(circles);
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
        console.log(i);
        circles[i].draw();
        circles[i].update();
      }
    };
    render();
    return () => window.cancelAnimationFrame(animationId);
  }, []);
  return (
    <canvas
      ref={canvasRef}
      width={2000}
      height={1500}
      style={{ border: "1px solid black" }}
    />
  );
};

export default WorldMap;
