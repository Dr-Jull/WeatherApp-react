import { hover } from "@testing-library/user-event/dist/hover";
import { useState } from "react";

function WelcomePage({
  setApiKey,
  apiKey,
  setShowWelcome,
}: {
  setApiKey: Function;
  apiKey: string;
  setShowWelcome: Function;
}) {
  const localApiKey = "d94bcd435b62a031771c35633f9f310a";
  const [hasInput, setHasInput] = useState(false);
  const [userApiKey, setUserApiKey] = useState("");
  const [showError, setShowError] = useState(false);

  const pageStyles = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
      zIndex: 999,
      position: "absolute",
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    popupStyle = {
      display: "flex",
      width: "500px",
      height: "300px",
      flexDirection: "column" as "column",
      justifyContent: "space-around",
      alignItems: "center",
      backgroundColor: "rgba(255, 255, 255,0.5)",
      //   padding:"30px"
    },
    btnStyles = {
      marginBottom: "10px",
      marginTop: "0px",
      width: "200px",
      height: "40px",
      color: "purple",
      backgroundColor: "pink",
      cursor: "pointer",
      // fontFamily:"'Grand Hotel', cursive"
      fontFamily: "serif",
      fontSize: "17px",
    };

  async function checkApiKeyValidity() {
    let testApiKey = `https://api.openweathermap.org/data/2.5/forecast/daily?q=beirut&units=metric&cnt=7&appid=${userApiKey}`;

    try {
      const response = await fetch(testApiKey);
      if (response.ok) {
        console.log("API key is valid.");
        setApiKey(userApiKey);
        setShowWelcome(false);
      } else {
        console.log("Invalid API key.");
        setShowError(true);
        return false;
      }
    } catch (error) {
      console.log("Error checking API key validity:", error);
      return false;
    }
  }

  function localApiClicked() {
    setApiKey(localApiKey);
    console.log(apiKey);
    setShowWelcome(false);
  }

  function userApiClicked() {
    // Use the entered API key
    console.log("API Key submitted:", userApiKey);
    checkApiKeyValidity();
  }

  function handleInputChange(event: any) {
    const enteredValue = event.target.value;
    setHasInput(enteredValue !== "");
    setUserApiKey(enteredValue);
    setShowError(false);
  }

  function handleKeyDown(event: any) {
    if (event.keyCode === 13) {
      checkApiKeyValidity();
    }
  }

  return (
    /*@ts-ignore*/
    <div style={pageStyles}>
      <div style={popupStyle}>
        <h1
          style={{
            width: "250px",
            marginTop: "25px",
            color: "rgba(255, 192, 203,1)",
            fontWeight: "700",
            WebkitTextStroke: "0.5px purple",
            fontSize: "52px",
            // fontFamily: "'Great Vibes', cursive"
            // fontFamily: "'Lobster Two', sans-serif",
            // fontFamily:"'Rochester', cursive"
            // fontFamily:"'Kurale', serif"
            fontFamily: "'Grand Hotel', cursive",
          }}
        >
          Enter API key:
        </h1>
        <input
          type="text"
          style={{
            width: "250px",
            border: "2px solid rgba(255, 192, 203,1)",
            outline: "none",
            height: "30px",
            color: "purple",
            fontFamily: "-moz-initial",
            fontSize: "large",
            paddingLeft: "5px",
          }}
          id="apiKeyInput"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        {showError && (
          <p
            style={{
              color: "red",
              margin: "0px",
              fontSize: "15px",
              fontFamily: "-moz-initial",
            }}
          >
            Invalid API key.
          </p>
        )}

        <button
          className="btn1"
          onClick={userApiClicked}
          style={{
            ...btnStyles,
            backgroundColor: hasInput
              ? "rgba(255, 192, 203,1)"
              : "rgba(255, 192, 203,0.5)",
            color: hasInput ? "rgba(128,0,128,1)" : "rgba(128,0,128,0.5)",
          }}
          disabled={!hasInput}
        >
          Enter
        </button>

        {/* <h1  style={{color:"rgba(255, 192, 203,1)", fontWeight:"700", WebkitTextStroke:"1px purple", fontSize:"30px"}} > or</h1>  */}

        <button
          className="btn2"
          value={localApiKey}
          onClick={localApiClicked}
          style={btnStyles}
        >
          Use Local API
        </button>
      </div>
    </div>
  );
}
export default WelcomePage;
