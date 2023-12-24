import { relative } from "path";

function Search({
  searchInput,
  searchChangeHandler,
  sendRequestToBackend,
}: {
  searchInput: string;
  searchChangeHandler: Function;
  sendRequestToBackend: Function;
}) {
  const searchInputStyle = {
    // display: "flex",
    flexDirection: "column" as "column",
    // margin: "auto",
    border: "1px white solid",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0)",
    borderRadius: "60px",
    position: "relative",
    fontSize: "20px",
    padding: "0px 40px",
    outline: "none",
  };

  function handleKeyDown(event: any) {
    if (event.keyCode === 13) {
      sendRequestToBackend();
    }
  }

  function handleSearchIconClick() {
    sendRequestToBackend();
  }

  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        height: "60px",
        width: "40%",
        top: 0,
      }}
    >
      <input
      /* @ts-ignore */
        style={searchInputStyle}
        type="text"
        id="search"
        value={searchInput}
        /* @ts-ignore */
        onChange={searchChangeHandler}
        onKeyDown={handleKeyDown}
      />
      <img
        onClick={handleSearchIconClick}
        style={{
          position: "absolute",
          right: 0,
          margin: "15px",
          cursor: "pointer",
          zIndex: 1,
        }}
        src="search.png"
        alt=""
      />
    </div>
  );
}

export default Search;
