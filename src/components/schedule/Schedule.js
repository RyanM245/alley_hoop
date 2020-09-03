import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Schedule.css";

const Schedule = (props) => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleAddressInput = (e) => {
    setAddress(e.target.value);
  };
  const handleCityInput = (e) => {
    setCity(e.target.value);
  };
  const handleStateInput = (e) => {
    setState(e.target.value);
  };
  const handleDateInput = (e) => {
    setDate(e.target.value);
  };
  const handleTimeInput = (e) => {
    setTime(e.target.value);
  };

  const createGame = () => {
    axios
      .post("/games/create", {
        address: address,
        city: city,
        state_abbrev: state,
        date: date,
        time: time,
      })
      .then((res) => {
        props.history.push("/games");
      })
      .catch((err) => {
        alert("Try again");
      });
  };

  return (
    <div>
      <h1 className="sch-greeting">Let's Ball!</h1>
      <div className="sch">
        <div className="sch-in">
          <input
            name="address"
            value={address}
            onChange={handleAddressInput}
            placeholder="Address..."
          />
          <input
            name="city"
            value={city}
            onChange={handleCityInput}
            placeholder="City..."
          />
          <input
            name="state"
            value={state}
            onChange={handleStateInput}
            placeholder="State..."
          />
          <input
            name="date"
            value={date}
            onChange={handleDateInput}
            placeholder="Date..."
          />
          <input
            name="time"
            value={time}
            onChange={handleTimeInput}
            placeholder="Time..."
          />

          <div className='sch-btn'>
            <button
              onClick={() => {
                createGame();
              }}
            >
              Schedule Game
            </button>
            <button>
              <Link to="/games" className='sch-back'>Go Back</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
