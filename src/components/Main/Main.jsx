import React, { useContext, useState } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {

  
  /* Uploading Image
  const [img, setImage] = useState();

  const handleImage = (e) => {
    const imgUrl = URL.createObjectURL(e.target.files[0]);
    let myImg = document.getElementById("image");
    myImg.innerHTML = `<img id="rawImage" src="${imgUrl}" />`;

    const imageUrl = ()=>{
      const img = document.getElementById("rawImage");
       console.log("image url is "+img.src);
       setInput(img.src);
     }
    imageUrl();
   };*/

  const speechHandler = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Sorry, your browser doesn't support speech recognition.");
    } else {
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = false; // Recognize only one sentence
      recognition.interimResults = true; // No partial results
      recognition.lang = "en-US"; // Set the language

      recognition.onstart = () => {
        console.log("Listening...");
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };

      recognition.onerror = (event) => {
        console.log("Error occurred: " + event.error);
      };

      recognition.onend = () => {
        console.log("Recognition ended.");
      };

      recognition.start();
    }
  };

  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  return (
    <div className="main">
      {/* Navbar */}
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="user" />
      </div>

      {/* Main Container */}

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev.</span>
              </p>
              <p>How can I help you today?</p>
            </div>

            <div className="cards">
              <div className="card">
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                <img src={assets.compass_icon} alt="compass" />
              </div>

              <div className="card">
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                <img src={assets.bulb_icon} alt="compass" />
              </div>

              <div className="card">
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                <img src={assets.message_icon} alt="compass" />
              </div>

              <div className="card">
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                <img src={assets.code_icon} alt="compass" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="user" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="icon" />

              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                // <p>{resultData}</p>
              )}
            </div>
          </div>
        )}

        {/* */}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              {/* <img src={assets.gallery_icon} alt="" /> */}
              <img
                onClick={() => speechHandler()}
                src={assets.mic_icon}
                alt=""
              />

              {/* Uploading Image */}

              {/* <input
                onChange={(e) => handleImage(e)}
                type="file"
                accept="image/gif, image/jpeg, image/png"
                name="image"
                id="inputImage"
              ></input>
              <div>
                <label htmlFor="inputImage"><img id="linkImg" src={assets.link_icon} alt="link" /></label>
              </div>
              <div id="image">{img}</div> */}

              {/* Uploading Image Ends */}

              {input ? (
                <img onClick={() => onSent()} src={assets.send_icon} alt="" />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae,
            numquam. Lorem ipsum dolor sit amet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
