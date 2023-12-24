import React from "react";
import LocationInfo from "./LocationInfo";
import WeatherInfo from "./WeatherInfo";

function WeatherContainer({
  searchInput,
  response,
}: {
  searchInput: string;
  response: any;
}) {
  const weatherContainerStyles = {
    // border: "1px black solid",
    height: "50%",
    display: "flex",
    gap: "50px",
    width: "100%",
    justifyContent: "center",
  };
  return (
    <div style={weatherContainerStyles}>
      <LocationInfo searchInput={searchInput} response={response} />
      <WeatherInfo response={response} />
    </div>
  );
}

export default WeatherContainer;
