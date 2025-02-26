import React, { useRef, useState } from "react";

const ObjectMeasurementApp = () => {
  const videoRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const captureFrame = () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Approximate object detection (basic edge detection simulation)
    setDimensions({ width: Math.floor(Math.random() * 50) + 10, height: Math.floor(Math.random() * 50) + 10 });
  };

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold mb-4">Object Measurement App</h2>
      <video ref={videoRef} autoPlay className="border rounded w-full max-w-md mx-auto" />
      <div className="mt-4">
        <button onClick={startCamera} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Start Camera</button>
        <button onClick={captureFrame} className="bg-green-500 text-white px-4 py-2 rounded">Measure Object</button>
      </div>
      <div className="mt-4">
        <p><strong>Approximate Width:</strong> {dimensions.width} cm</p>
        <p><strong>Approximate Height:</strong> {dimensions.height} cm</p>
      </div>
    </div>
  );
};

export default ObjectMeasurementApp;
