import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Container, Grid } from "@material-ui/core";
import styled from "styled-components";
import { darkTheme, lightTheme } from "../theme";

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
  addCity,
} from "../store/actions";
import Current from "../components/Current";
import Forecast from "../components/Forecast";

import { City, DailyForecast, CityProps } from "../types/types";

const Home = (props: any) => {
  const [inputCities, setInputCities] = useState<[] | City[]>([]);

  const [city, setCity] = useState<null | string>(null);
  const [cityCode, setCityCode] = useState<null | string>(null);

  const [currCity, setCurrCity] = useState<null | { id: string; name: string }>(
    null
  );

  const [forecast, setForecast] = useState<[] | DailyForecast[]>([]);
  const [isDark, setDarkMode] = useState<null | boolean>(null);

  useEffect(() => {
    if (props.favCities.length <= 0) {
      props.getCurrentLocation();
      if (props.currLocation.id) {
        setCurrCity({
          id: props.currLocation.id,
          name: props.currLocation.name,
        });
        // setCityCode(props.currLocation.id);
        // setCity(props.currLocation.name);
      }
    }
    setDarkMode(props.isDark);
  }, [props]);

  // useEffect(() => {
  //   props.getCurrentLocation();
  //   if (props.currLocation.id) {
  //     setCityCode(props.currLocation.id);
  //     setCity(props.currLocation.name);
  //   }
  //   setDarkMode(props.isDark);
  // }, [props]);

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
    const q = e.target.value;
    if (q) {
      const data = await queryCity(q);
      setInputCities(data);
    }
  };

  const selectCity = ({ id, name }: CityProps) => {
    // setCityCode(cityCode); // perhaps unnecessary
    // setCity(cityName); // perhaps unnecessary
    // console.log("My selectCity params:", id, name);

    setCurrCity({ id, name });
    const location = { id, name };
    console.log("My selectCity location:", location);
    props.setLocation(location);
  };

  const divStyle = isDark ? darkTheme : lightTheme;
  const txtColor = isDark ? "white" : "";
  console.log("My cities:", inputCities);
  console.log("My city:", city);
  console.log("My code:", cityCode);
  console.log("My forecast:", forecast);
  console.log("My props:", props);

  return (
    <div style={divStyle}>
      <HomeContainer>
        <Title style={{ color: txtColor }}>
          Always Keeping you Above the Weather
        </Title>
        <CitySearch
          type="text"
          placeholder="search a city"
          onChange={(e) => handleChange(e)}
        />
        {inputCities.length > 0 && (
          <div className="cities">
            {inputCities.map((city, idx) => {
              return (
                <div
                  key={idx}
                  className="city-item"
                  onClick={() =>
                    selectCity({
                      id: city.Key,
                      name: city.LocalizedName,
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
              <Current city={currCity} />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <ForecastContainer>
                <Forecast />
                <Forecast />
                <Forecast />
                <Forecast />
                <Forecast />
              </ForecastContainer>
            </Grid>
          </Grid>
        </Container>
      </HomeContainer>
    </div>
  );
};

const HomeContainer = styled.div`
  max-width: 1440px;
  min-height: 80vh;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-familty: ShadowsIntoLight;
`;

const CitySearch = styled.input`
  width: 60%;
  padding: 10px;
  margin-bottom: 30px;
`;

const ForecastContainer = styled.div`
  // height: 70vh;
`;

const mapStateToProps = (state: any) => {
  return {
    currLocation: state.appStore.currLocation,
    favCities: state.appStore.favCities,
    tempUnit: state.appStore.tempUnit,
    isDark: state.appStore.isDark,
  };
};

const mapDispatchToProps = {
  getCurrentLocation,
  setLocation,
  addCity,
  removeCity,
  setUnit,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

// material ui icons: Favorite, FavoriteBorder
