import React, { useState } from "react";
import { queryCity } from "../services/weatherService";

interface City {
  AdministrativeArea: any;
  Country: { ID: string; LocalizedName: string };
  Key: string;
  LocalizedName: string;
  Rank: number;
  Type: string;
}

const Home = () => {
  const [cities, setCities] = useState<[] | City[]>([]);
  const [cityCode, setCityCode] = useState("");

  const handleChange = async (e: any) => {
    console.log(e.target.value);
    const q = e.target.value;
    if (q) {
      const data = await queryCity(q);
      setCities(data);
    }
  };

  const selectCity = (cityCode: string) => {
    setCityCode(cityCode);
  };

  console.log("My cities:", cities);

  return (
    <div>
      <h1>Tel-Aviv</h1>
      <input
        type="text"
        placeholder="search a city"
        onChange={(e) => handleChange(e)}
      />
      {cities.length > 0 && (
        <div className="cities">
          {cities.map((city, idx) => {
            return (
              <div
                key={idx}
                className="city-item"
                onClick={() => selectCity(city.Key)}
              >
                <p>{city.LocalizedName}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
