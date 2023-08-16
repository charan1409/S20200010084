import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTIxOTk4MzAsImNvbXBhbnlOYW1lIjoiVHJhaW4gQ2VudHJhbCIsImNsaWVudElEIjoiMTljMTBlMmEtMjE4NS00NDUyLWI5OTQtY2E3NDA4YWVkNzRmIiwib3duZXJOYW1lIjoiIiwib3duZXJFbWFpbCI6IiIsInJvbGxObyI6IlMyMDIwMDAxMDA4NCJ9.HQrTF2PW1QfTLPSvVm9QaL-FhBIKocAA3t1HnSVS2w8");
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://20.244.56.144/train/trains", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if(data.length === 0){
       setToken("");
      }
      setData(data);
    };

    const fetchToken = async () => {
      const response = await fetch("http://20.244.56.144/train/auth", {
        method: "POST",
        body: JSON.stringify({
          companyName: "Train Central",
          clientID: "19c10e2a-2185-4452-b994-ca7408aed74f",
          clientSecret: "keexOIUGcMAAVpiU",
          ownerName: "owner",
          ownerEmail: "owner@gmail.com",
          rollNo: "S20200010084",
        }),
      });
      const data = await response.json();
      setToken(data.access_token);
    };
    if (token === "") {
      fetchToken();
    }
    fetchData();
  }, [token]);

  return (
    <div className="App">
      {data.length > 0 &&
        data.map((train) => (
          <div key={train.trainNumber}>
            <h1>{train.trainName}</h1>
            <p>{train.trainNumber}</p>
            <p>
              Departure Time:{" "}
              {`${train.departureTime.Hours} : ${train.departureTime.Minutes} : ${train.departureTime.Seconds}`}
            </p>
            <p>
              Available Seats: sleeper:{train.seatsAvailable.sleeper} AC:{" "}
              {train.seatsAvailable.AC}
            </p>
            <p>
              Price: sleeper:{train.price.sleeper} AC:{train.price.AC}
            </p>
            <p>Delayed By: {train.delayedBy}</p>
          </div>
        ))}
    </div>
  );
}

export default App;
