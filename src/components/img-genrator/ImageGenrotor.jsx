import React, { useRef, useState } from "react";
import "./ImgCSS.css";
import imageFile from "../assets/imf.avif"; // Replace with your image file

const ImageGenrotor = () => {
  const [image_url, setImage_url] = useState(""); // Default to an empty string
  const inputRef = useRef(null);

  const imageGenerator = async () => {
    const apiKey = "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"; // Your API key

    if (!inputRef.current.value.trim()) {
      alert("Please enter a description.");
      return;
    }

    try {
      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`, // Use your API key here
          },
          body: JSON.stringify({
            prompt: inputRef.current.value, // The user's input prompt
            n: 1,
            size: "512x512", 
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      if (data && data.data && data.data.length > 0) {
        setImage_url(data.data[0].url); // Set the generated image URL
      } else {
        alert("No image generated. Please try again.");
      }
    } catch (error) {
      console.error("Error generating image:", error);
      alert("An error occurred while generating the image. Please try again.");
    }
  };

  return (
    <div className="ai-image-generator">
      <div className="header">
        AI Image <span>Generator</span>
      </div>
      <div className="img-loading">
        <div className="image">
          <img
            src={image_url || imageFile} // Fallback to default image if no generated image
            alt="Generated AI"
            height="300px"
            width="300px"
          />
        </div>
      </div>

      <div className="search-box">
        <input
          type="text"
          ref={inputRef}
          className="search-input"
          placeholder="Describe what you want to see..."
        />
        <div className="generate-btn" onClick={imageGenerator}>
          Generate
        </div>
      </div>
    </div>
  );
};

export default ImageGenrotor;
