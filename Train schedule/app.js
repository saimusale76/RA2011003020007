import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { TailwindProvider } from "tailwindcss-react-ui";
const App = () => {
  const [trains, setTrains] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState(null);
  useEffect(() => {
    axios
      .get("https://api.johndoe.com/trains")
      .then((response) => {
        setTrains(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleTrainClick = (train) => {
    setSelectedTrain(train);
  };
  return (
    <TailwindProvider>
      <div className="App">
        <h1 className="text-3xl font-bold">All Trains</h1>
        <ul>
          {trains.map((train) => (
            <li
              key={train.id}
              onClick={() => handleTrainClick(train)}
              className="cursor-pointer hover:bg-gray-200"
            >
              {train.name}
            </li>
          ))}
        </ul>
        {selectedTrain && (
          <div>
            <h2 className="text-2xl font-bold">{selectedTrain.name}</h2>
            <p className="text-sm">
              <b>Departure Time:</b> {selectedTrain.departure_time}
            </p>
            <p className="text-sm">
              <b>Arrival Time:</b> {selectedTrain.arrival_time}
            </p>
            <p className="text-sm">
              <b>Price:</b> {selectedTrain.price}
            </p>
            <p className="text-sm">
              <b>Seat Availability:</b> {selectedTrain.seat_availability}
            </p>
          </div>
        )}
      </div>
    </TailwindProvider>
  );
};
export default App;