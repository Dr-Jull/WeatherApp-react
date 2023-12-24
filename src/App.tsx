import React, { useState } from "react";
import "./App.css";

import Search from "./components/Search";
import WeatherContainer from "./components/weather-components/WeatherContainer";
import WelcomePage from "./components/WelcomePage";

function App() {
  const [searchInput, setSearchInput] = useState("");

  const [response, setResponse] = useState({});

  const [enterPressed, setEnterPressed] = useState(false);

  const [bgSrc, setBgSrc] = useState("bgImage.jpg");

  const [showWelcome, setShowWelcome] = useState(true);

  const [apiKey, setApiKey] = useState("");

  function searchChangeHandler(event: any) {
    setSearchInput(event.target.value);
  }

  async function sendRequestToBackend() {
    // const apiKey = "d94bcd435b62a031771c35633f9f310a";
    // constructs a URL
    const requestURL = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${searchInput}&units=metric&cnt=7&appid=${apiKey}`;

    // fetch new data
    // fetch(requestURL)
    //   .then(function (response) {
    //     return response.json();
    //   })
    //   .then(function (response) {
    //     console.log(response.city?.["id"]);
    //     setResponse(response);
    //   });

    const response = await fetch(requestURL);
    const data = await response.json();
    const bg = data.list
      ? `${data.list[0].weather[0].icon}.jpg`
      : "bgImage.jpg";

    console.log(data.city?.id);
    setResponse(data);
    setEnterPressed(true);
    bg !== null && setBgSrc(bg);
  }

  const appStyles = {
    height: "100vh",
    border: "1px solid blue",
    display: "flex",
    flexDirection: "column" as "column",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundPosition: "bottom",
    backgroundImage: `url(${bgSrc})`,
    backgroundSize: "cover",
    padding: "0px 50px",
  };
  return (
    <div style={appStyles} className="App">
      {showWelcome && (
        <WelcomePage
          setApiKey={setApiKey}
          apiKey={apiKey}
          setShowWelcome={setShowWelcome}
        />
      )}
      <Search
        searchInput={searchInput}
        searchChangeHandler={searchChangeHandler}
        sendRequestToBackend={sendRequestToBackend}
      />
      {/*@ts-ignore */}
      {enterPressed && !response["city"] ? (
        <div>
          <h1
            style={{
              height: "300px",
              display: "flex",
              alignItems: "center",
              fontFamily: "serif",
              fontSize: "50px",
            }}
          >
            City not found
          </h1>
        </div>
      ) : (
        <WeatherContainer searchInput={searchInput} response={response} />
      )}
      <div></div>
    </div>
  );
}

export default App;
