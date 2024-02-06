import React from "react";

function Dateformat(props) {
  const timestamp = props.timestamp;
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();


  const formattedDate = `  ${day < 10 ? "0" + day : day} ${month} ${year}`;

  return <span>{formattedDate}</span>;
}

export default Dateformat;
