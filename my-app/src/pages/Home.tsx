import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  queryCity,
  getCurrentWeather,
  getForecast,
} from "../services/weatherService";
import {
  getCurrentLocation,
  setLocation,
  removeCity,
  setUnit,
} from "../store/actions";

import { City, DailyForecast, CityProps } from "../types/types";

// interface City {
//   AdministrativeArea: any;
//   Country: { ID: string; LocalizedName: string };
//   Key: string;
//   LocalizedName: string;
//   Rank: number;
//   Type: string;
// }
// interface DailyForecast {
//   Date: string;
//   Day: { Icon: number; IconPhrase: string; HasPrecipitation: boolean };
//   EpochDate: number;
//   Link: string;
//   MobileLink: string;
//   Night: { Icon: number; IconPhrase: string; HasPrecipitation: boolean };
//   Sources: string[];
//   Temperature: {
//     Maximum: { Unit: string; UnitType: number; Value: number };
//     Minimum: { Unit: string; UnitType: number; Value: number };
//   };
// }

// interface CityProps {
//   cityCode: string;
//   cityName: string;
// }

const Home = (props: any) => {
  const [cities, setCities] = useState<[] | City[]>([]);
  const [city, setCity] = useState<null | string>(null);
  const [cityCode, setCityCode] = useState<null | string>(null);
  const [forecast, setForecast] = useState<[] | DailyForecast[]>([]);

  useEffect(() => {
    props.getCurrentLocation();
    if (props.currLocation.id) {
      setCityCode(props.currLocation.id);
      setCity(props.currLocation.name);
    }
  }, [props]);

  useEffect(() => {
    // getCurrentWeather(cityCode);
    // const forecastData = async () => {
    //   const forecast = await getForecast(cityCode, false);
    //   // console.log("My forecast:", forecast);
    //   setForecast(forecast.DailyForecasts);
    // };
    // forecastData();
    console.log("Bring function back");
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
    props.setLocation({ id: cityCode, name: cityName });
  };

  console.log("My cities:", cities);
  console.log("My city:", city);
  console.log("My code:", cityCode);
  console.log("My forecast:", forecast);
  console.log("My props:", props);

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

const mapStateToProps = (state: any) => {
  return {
    currLocation: state.appStore.currLocation,
    tempUnit: state.appStore.tempUnit,
  };
};

const mapDispatchToProps = {
  getCurrentLocation,
  setLocation,
  removeCity,
  setUnit,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

// material ui icons: Favorite, FavoriteBorder
