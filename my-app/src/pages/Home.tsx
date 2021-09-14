import React, { useState, useEffect } from "react";
import {
  queryCity,
  getCurrentWeather,
  getForecast,
} from "../services/weatherService";

interface City {
  AdministrativeArea: any;
  Country: { ID: string; LocalizedName: string };
  Key: string;
  LocalizedName: string;
  Rank: number;
  Type: string;
}
interface DailyForecast {
  Date: string;
  Day: { Icon: number; IconPhrase: string; HasPrecipitation: boolean };
  EpochDate: number;
  Link: string;
  MobileLink: string;
  Night: { Icon: number; IconPhrase: string; HasPrecipitation: boolean };
  Sources: string[];
  Temperature: {
    Maximum: { Unit: string; UnitType: number; Value: number };
    Minimum: { Unit: string; UnitType: number; Value: number };
  };
}

interface CityProps {
  cityCode: string;
  cityName: string;
}

const Home = () => {
  const [cities, setCities] = useState<[] | City[]>([]);
  const [city, setCity] = useState("Tel Aviv");
  const [cityCode, setCityCode] = useState("215854");
  const [forecast, setForecast] = useState<[] | DailyForecast[]>([]);

  useEffect(() => {
    // getCurrentWeather(cityCode);
    const forecastData = async () => {
      const forecast = await getForecast(cityCode, false);
      // console.log("My forecast:", forecast);
      setForecast(forecast.DailyForecasts);
    };
    forecastData();
  }, [cityCode]);

  const handleChange = async (e: any) => {
    console.log(e.target.value);
    const q = e.target.value;
    if (q) {
      const data = await queryCity(q);
      setCities(data);
    }
  };

  const selectCity = ({ cityCode, cityName }: CityProps) => {
    setCityCode(cityCode);
    setCity(cityName);
  };

  console.log("My cities:", cities);
  console.log("My city:", city);
  console.log("My code:", cityCode);
  console.log("My forecast:", forecast);

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
                onClick={() =>
                  selectCity({
                    cityCode: city.Key,
                    cityName: city.LocalizedName,
                  })
                }
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

// material ui icons: Favorite, FavoriteBorder
