import { cardStyle } from "../../shared/constants";

function LocationInfo({
  searchInput,
  response,
}: {
  searchInput: string;
  response: any;
}) {
  const currentDate = new Date();

  const dayOfWeek = currentDate.toLocaleString("en-US", { weekday: "long" }); // Full day name
  const dayOfMonth = currentDate.getDate(); // Day of the month (1-31)
  const month = currentDate.toLocaleString("en-US", { month: "long" }); // Full month name

  return (
    <div style={cardStyle}>
      <h2>
        {response["city"]
          ? `${response["city"].name}, ${response["city"].country}`
          : "---"}
      </h2>
      <p>
        {dayOfWeek} {month} {dayOfMonth}
      </p>
      <p>
        Population:{" "}
        {response["city"] ? JSON.stringify(response["city"].population) : "---"}
      </p>
    </div>
  );
}

export default LocationInfo;
