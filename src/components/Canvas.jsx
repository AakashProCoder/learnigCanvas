import { clear } from "@testing-library/user-event/dist/clear";
import React, { useEffect, useRef } from "react";

const WorldMap = () => {
  const canvasRef = useRef(null);
  let c;

  useEffect(() => {
    const canvas = canvasRef.current;
    c = canvas.getContext("2d");
    let animationId;
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
      console.log(animationId);
      window.cancelAnimationFrame(animationId);
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
      animate();
    };

    //utility function
    function getDistance(x1, y1, x2, y2) {
      let xDistance = x1 - x2;
      let yDestance = y1 - y2;
      return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDestance, 2));
    }
    function rotate(velocity, angle) {
      // console.log("velocity=>>>", velocity,"angle=>>" ,angle);
      const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle),
      };
      return rotatedVelocities;
    }
    function resolveCollision(particle, otherparticle) {
      console.log("particale===>", particle, "otherparticle==>", otherparticle);
      const xVelcityDiff = particle.velocity.x - otherparticle.velocity.x;
      const yVelocityDiff = particle.velocity.y - otherparticle.velocity.y;
      const xDist = otherparticle.x - particle.x;
      const yDist = otherparticle.y - particle.y;
      //prevent accedental overlap of particles
      if (xVelcityDiff * xDist + yVelocityDiff * yDist >=0) {
        // Grap angle between the two colliding particles
        const angle = -Math.atan2(
          otherparticle.y - particle.y,
          otherparticle.x - particle.x
        );
        // store mass in var for better readablity in collison equation
        const m1 = particle.mass;
        const m2 = otherparticle.mass;
        //velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherparticle.velocity, angle);
        // velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };
        //final velocity after rotating axis back to the origin location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);
        //swap particlee velocities for realistic bounce
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherparticle.velocity.x = vFinal2.x;
        otherparticle.velocity.y = vFinal2.y;
      }
    }
    // Objects
    class Object {
      constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.distance = undefined;
        this.mass = 1;
        this.velocity = {
          x: Math.random() - 0.5 + 1,
          y: Math.random() - 0.5 + 1,
        };
      }

      draw() {
        if (this.distance - 130 <= 0) {
          console.log("touch");
        }

        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = "blue";
        c.stroke();
        c.closePath();
      }

      update(objects) {
        this.draw();
        for (let i = 0; i < objects.length; i++) {
          if (this === objects[i]) {
            continue;
          }
          if (
            getDistance(this.x, this.y, objects[i].x, objects[i].y) -
              this.radius * 2 <
            0
          ) {
            console.log("collison detected");
            resolveCollision(this, objects[i]);
          }
        }
        // for boundries bounce back
        if (
          this.x + this.radius > window.innerWidth ||
          this.x - this.radius <= 0
        ) {
          this.velocity.x = -this.velocity.x;
        }
        if (
          this.y + this.radius > window.innerHeight ||
          this.y - this.radius < 0
        ) {
          this.velocity.y = -this.velocity.y;
        }
        this.x += this.velocity.x;
        this.y += this.velocity.y;
      }
    }

    // Implementation
    let object = [];
    let circle;
    let circle2;
    const init = () => {
      object = [];
      for (let i = 0; i < 100; i++) {
        let radius = 10;
        let x = Math.random() * (window.innerWidth - radius * 2) + radius;
        let y = Math.random() * (window.innerHeight - radius * 2) + radius;

        if (i !== 0) {
          for (let j = 0; j < object.length; j++) {
            // console.log(
            //   getDistance(x, y, object[j].x, object[j].y) - radius * 2 < 0
            // );

            if (getDistance(x, y, object[j].x, object[j].y) - radius * 2 < 0) {
              x = Math.random() * (window.innerWidth - radius * 2) + radius;
              y = Math.random() * (window.innerHeight - radius * 2) + radius;
              j = -1;
            }
          }
        }
        object.push(new Object(x, y, radius, "blue"));
      }
      console.log(object);
    };

    // Animation Loop

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      c.clearRect(0, 0, canvas.width, canvas.height);
      object.forEach((particle) => particle.update(object));
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
      window.cancelAnimationFrame(animationId);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default WorldMap;
