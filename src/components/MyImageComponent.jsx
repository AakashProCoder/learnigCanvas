import React, { useRef } from 'react';
import icone from  "./Icon1.png"


const MyImageComponent = () => {
  const canvasRef = useRef(null);

  const handleClick = (event) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    const imageData = ctx.getImageData(offsetX, offsetY, 1, 1);
    const alpha = imageData.data[3];

    if (alpha !== 0) {
      alert('Clicked within the bounds of the image');
    }
  };

  return (
    <div
      className="image-container"
      style={{
        position: 'relative',
        width: '200px', // Adjust width to match image dimensions
        height: '200px', // Adjust height to match image dimensions
      }}
      onClick={handleClick}
    >
      <img
        src={icone }
        alt="Image"
        onLoad={() => {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          const img = document.querySelector('.image-container img');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
        }}
        style={{
          display: 'none',
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};

export default MyImageComponent;

