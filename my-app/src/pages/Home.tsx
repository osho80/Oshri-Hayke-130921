import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Container, Grid } from "@material-ui/core";

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
import Current from "../components/Current";

import { City, DailyForecast, CityProps } from "../types/types";

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
    setCityCode(cityCode); // perhaps unnecessary
    setCity(cityName); // perhaps unnecessary
    props.setLocation({ id: cityCode, name: cityName });
  };

  console.log("My cities:", cities);
  console.log("My city:", city);
  console.log("My code:", cityCode);
  console.log("My forecast:", forecast);
  console.log("My props:", props);

  return (
    <div>
      <h1>Keeping you always above the weather</h1>
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
      <Container className="main-contaier">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} sm={12} md={6}>
            <Current />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <div className="forecast-contaier"></div>
          </Grid>
        </Grid>
      </Container>
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
