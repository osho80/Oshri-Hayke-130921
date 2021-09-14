import React from "react";
import { queryCity } from "../services/weatherService";
// city?: string | null
const handleChange = (e: any) => {
  console.log(e.target.value);
  const q = e.target.value;
  if (q) queryCity(q);
};
const Home = () => {
  return (
    <div>
      <h1>Tel-Aviv</h1>
      <input
        type="text"
        placeholder="search a city"
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};

export default Home;
