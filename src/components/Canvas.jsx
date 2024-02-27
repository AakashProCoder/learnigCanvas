import React, { useEffect, useRef } from "react";

const WorldMap = () => {
  const canvasRef = useRef(null);
  let c;

  useEffect(() => {
    const canvas = canvasRef.current;
    c = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

    // Event Listeners
    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      init();
    };

    //utility function
    function getDistance(x1, y1, x2, y2) {
      let xDistance = x1 - x2;
      let yDestance = y1 - y2;
      return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDestance, 2));
    }
    // Objects
    class Object {
      constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.distance = undefined;
      }

      draw() {
        if (this.distance - 130 <= 0) {
          console.log("touch");
          
        }
        console.log(this.distance - 130);
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;

        c.fill();
        c.closePath();
      }

      update() {
        this.draw();
        this.distance = getDistance(circle.x, circle.y, circle2.x, circle2.y);
      }
    }

    // Implementation
    let objects;
    let circle;
    let circle2;
    const init = () => {
      circle = new Object(300, 300, 100, "black");
      circle2 = new Object(undefined, undefined, 30, "red");
      for (let i = 0; i < 400; i++) {
        // objects.push()
      }
    };

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      c.clearRect(0, 0, canvas.width, canvas.height);
      let distance=getDistance(circle.x,circle.y,circle2.x,circle2.y)
      if (distance < circle.radius+circle2.radius) {
        circle.color="green"
        
      }
      else{
        circle.color="black"
      }
      circle.update();
      circle2.x = mouse.x;
      circle2.y = mouse.y;
      circle2.update();
    };

    // Event listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Initializations
    init();
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default WorldMap;
