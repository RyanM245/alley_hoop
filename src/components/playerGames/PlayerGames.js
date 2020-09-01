import React, { useState } from "react";
import axios from "axios";

const PlayerGames = (props) => {
  const [toggle, setToggle] = useState(false);
  const [address, setAddress] = useState(props.data.address);
  const [city, setCity] = useState(props.data.city);
  const [state, setState] = useState(props.data.state_abbrev);
  const [date, setDate] = useState(props.data.date);
  const [time, setTime] = useState(props.data.time);

  // console.log(props.data)

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

  const saveEdit = (id, address, city, state, date, time) => {
    // console.log(id);
    axios
      .put(`/games/player/${id}`, {
        address,
        city,
        state_abbrev: state,
        date,
        time,
      })
      .then((res) => {
        setAddress(res.data.address);
        setCity(res.data.city);
        setState(res.data.state_abbrev);
        setDate(res.data.date);
        setTime(res.data.time);
        setToggle(!toggle);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

// console.log(props.data.game_id)
  return (
    <div>
      {!toggle ? (
        <div>
          <div>
            <h1>Address: {address}</h1>
            <h1>City: {city}</h1>
            <h1>State: {state}</h1>
            <h1>Date: {date}</h1>
            <h1>Time: {time}</h1>
          </div>
          <div>
            <button onClick={() => setToggle(!toggle)}>Edit</button>
            <button onClick={()=> props.deleteGame(props.data.game_id)}>Delete</button>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <input
              name="address"
              value={address}
              onChange={handleAddressInput}
              placeholder="New Address..."
            />
            <input
              name="city"
              value={city}
              onChange={handleCityInput}
              placeholder="New City..."
            />
            <input
              name="state"
              value={state}
              onChange={handleStateInput}
              placeholder="New State..."
            />
            <input
              name="date"
              value={date}
              onChange={handleDateInput}
              placeholder="New Date..."
            />
            <input
              name="time"
              value={time}
              onChange={handleTimeInput}
              placeholder="New Time..."
            />
          </div>
          <div>
            <button onClick={() => setToggle(!toggle)}>Go Back</button>
            <button
              onClick={() =>
                saveEdit(props.data.game_id, address, city, state, date, time)
              }
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerGames;
