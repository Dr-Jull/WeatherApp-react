import { cardStyle } from "../../shared/constants";

function WeatherInfo({ response }: { response: any }) {
  let temperature = response["list"] ? response["list"][0].temp.day : "---";
  let mildIcon = (
    <img
      style={{ height: "45px", transform: "rotate(-45deg)" }}
      src="mild.png"
      alt=""
    />
  );
  let tempIcon = (
    <img
      style={{ height: "50px", width: "50px" }}
      src="thermometer.png"
      alt=""
    />
  );

  switch (true) {
    case temperature < 0:
      tempIcon = (
        <img style={{ height: "50px", width: "50px" }} src="cold.png" alt="" />
      );
      break;
    case temperature >= 0 && temperature < 10:
      tempIcon = (
        <img style={{ height: "50px", width: "50px" }} src="cool.png" alt="" />
      );
      break;
    case temperature >= 10 && temperature < 15:
      tempIcon = mildIcon;
      break;
    case temperature >= 15 && temperature < 25:
      tempIcon = (
        <img style={{ height: "50px", width: "50px" }} src="warm2.png" alt="" />
      );
      break;
    case temperature >= 25 && temperature < 35:
      tempIcon = (
        <img style={{ height: "50px", width: "50px" }} src="hot.png" alt="" />
      );
      break;
    case temperature >= 35:
      tempIcon = (
        <img
          style={{ height: "50px", width: "50px" }}
          src="veryhot2.png"
          alt=""
        />
      );
      break;
    default:
      tempIcon = (
        <img
          style={{ height: "50px", width: "50px" }}
          src="thermometer.png"
          alt=""
        />
      );
  }

  const formatTime = (unixTime: number) =>
    new Date(unixTime * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  let iconSrc = response["list"]
    ? response["list"][0].weather[0].icon
    : "weather";
  let weatherIcon = (
    <img
      style={{ width: "60px", height: "60px" }}
      src={`${iconSrc}.png`}
      alt=""
    />
  );

  let sunriseTime = response["list"]
      ? formatTime(response["list"][0].sunrise)
      : "---",
    sunriseIcon = response["list"] ? (
      <img style={{ height: "40px" }} src="sunrise.png" alt="" />
    ) : (
      <img style={{ height: "50px" }} src="sunrise2.png" alt="" />
    );
  let sunsetTime = response["list"]
      ? formatTime(response["list"][0].sunset)
      : "---",
    sunsetIcon = response["list"] ? (
      <img style={{ height: "40px" }} src="sunset.png" alt="" />
    ) : (
      <img style={{ height: "40px" }} src="sunset2.png" alt="" />
    );

  let windSpeed = response["list"] ? `${response.list[0].speed}` : "---",
    windSpeedIcon = response["list"] ? (
      <img style={{ height: "45px" }} src="anemometer3.png" alt="" />
    ) : (
      <img style={{ height: "45px" }} src="anemometer.png" alt="speed" />
    );
  let humidity = response["list"] ? `${response.list[0].humidity}` : "--",
    humidityIcon = response["list"] ? (
      <img style={{ height: "40px" }} src="humidity2.png" alt="" />
    ) : (
      <img style={{ height: "40px" }} src="humidity.png" alt="" />
    );
  let pressure = response["list"] ? `${response.list[0].pressure}` : "--",
    pressureIcon = response["list"] ? (
      <img style={{ height: "40px" }} src="pressure3.png" alt="" />
    ) : (
      <img style={{ height: "40px" }} src="pressure.png" alt="" />
    );

  return (
    <div style={{ ...cardStyle, alignItems: "start", fontSize: "30px" }}>
      <p
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "30px" }}>
          {tempIcon} {temperature} °C
        </span>{" "}
        <span style={{ display: "flex", alignItems: "center" }}>
          {weatherIcon}{" "}
          {response["list"]
            ? `${response.list[0].weather[0].main}, ${response.list[0].weather[0].description}`
            : "---  ---"}{" "}
        </span>
      </p>
      <p
        style={{
          // border: "1px black solid",
          display: "flex",
          width: "100%",
          flexDirection: "row" as "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ display: "flex", gap: "40px" }}>
          {sunriseIcon} {sunriseTime}
        </span>
        <span style={{ display: "flex", gap: "40px" }}>
          {sunsetIcon} {sunsetTime}
        </span>
      </p>
      <p
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        {windSpeedIcon} {windSpeed} m/s N{humidityIcon} {humidity} %
        {pressureIcon} {pressure} hPa
      </p>
    </div>
  );
}

export default WeatherInfo;
