import React, { useState, useEffect } from "react";

const Meme = () => {
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((memesData) => setAllMemes(memesData.data.memes));
  }, []);

  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  const [allMemes, setAllMemes] = useState([]);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => {
      return { ...prevMeme, randomImage: url };
    });
  }

  function handleChange(event) {
    setMeme((prevMeme) => {
      return { ...prevMeme, [event.target.name]: event.target.value };
    });
  }

  return (
    <main>
      <div className="form">
        <input
          type="text"
          placeholder="Top Text"
          className="form--input"
          name="topText"
          onChange={handleChange}
          value={meme.topText}
        />
        <input
          type="text"
          placeholder="Bottom Text"
          className="form--input"
          name="bottomText"
          onChange={handleChange}
          value={meme.bottomText}
        />
        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
      </div>
      <div className="meme">
        <img src={meme.randomImage} className="meme--image" alt="meme" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
};

export default Meme;
