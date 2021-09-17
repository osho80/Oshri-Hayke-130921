import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Container, Grid } from "@material-ui/core";
import styled from "styled-components";

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

import {
  City,
  DailyForecast,
  CityProps,
  CurrentConditions,
} from "../types/types";

const Current = (props: any) => {
  const [city, setCity] = useState<null | string>(null);
  const [cityCode, setCityCode] = useState<null | string>(null);
  const [forecast, setForecast] = useState<[] | DailyForecast[]>([]);
  const [currWeather, setCurrWeather] = useState(null);

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

  const isFav = false;
  const isCels = true;
  const isDay = true;
  const heartIconSrc = isFav
    ? "../assets/images/red-heart.png"
    : "../assets/images/outlined-heart.png";
  const heartTitle = isFav ? "Remove from favourites" : "Add to favourites";
  const unitIconSrc = isCels
    ? "../assets/images/celsius.png"
    : "../assets/images/celsius.png";
  const unitTitle = isCels ? "Change to Fahrenheit" : "Change to Celsius";
  const containerBgc = isDay ? "#174385" : "#344463";

  console.log("My city:", city);
  console.log("My code:", cityCode);

  return (
    // <Container className="main-contaier">
    //   <Grid container spacing={4} alignItems="center">
    //     <Grid item xs={12} sm={12} md={6}>
    <DailyContaier style={{ backgroundColor: containerBgc }}>
      {city && (
        <CardTitle>
          <LikeBtn
            src={heartIconSrc}
            title={heartTitle}
            alt=""
            onClick={() => console.log("add to favourites")}
          />
          <h2>{city}</h2>
        </CardTitle>
      )}
      <TempAndCondition>
        <Temp>
          <h3>27</h3>
          <UnitIcon
            src={unitIconSrc}
            title={unitTitle}
            alt="Toggle Celsius / Fahrenheit"
            onClick={() => console.log("Toggle Celsius / Fahrenheit")}
          />
        </Temp>
        <ConditionIcon src={"../assets/images/01-s.png"} />
      </TempAndCondition>
      <ConditionText>Clear</ConditionText>
    </DailyContaier>
    //     {/* </Grid>
    //     <Grid item xs={12} sm={12} md={6}>
    //       <div className="forecast-contaier"></div>
    //     </Grid>
    //   </Grid>
    // </Container> */}
  );
};

const cursorPointer = `&:hover {
  cursor: pointer;
}`;

const flexAlignCenter = `
  display: flex;
  align-items: center;
`;

const DailyContaier = styled.div`
  color: white;
`;

const CardTitle = styled.div`
  ${flexAlignCenter}
  justify-content: space-around;
`;

const LikeBtn = styled.img`
  width: 30px;
  height: 30px;
  ${cursorPointer};
`;

const TempAndCondition = styled.div`
  ${flexAlignCenter}
  justify-content: space-around;
`;

const Temp = styled.div`
  ${flexAlignCenter}
`;

const UnitIcon = styled.img`
  width: 20px;
  height: 20px;
  ${cursorPointer};
  margin-left: 10px;
`;

const ConditionIcon = styled.img`
  ${cursorPointer};
`;

const ConditionText = styled.div`
  padding-bottom: 20px;
`;

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

export default connect(mapStateToProps, mapDispatchToProps)(Current);

// "../../../public/assets/images/outlined-heart.png"
