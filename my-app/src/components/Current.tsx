import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Temperature from "./Temperature";
import ConditionIcon from "./ConditionIcon";
import { getCurrentWeather } from "../services/weatherService";
import {
  getCurrentLocation,
  setLocation,
  removeCity,
  addCity,
  setUnit,
} from "../store/actions";
import { CityProps, CurrentConditions } from "../types/types";
import { setCookie, getCookie } from "../services/cookieService";

const Current = (props: any) => {
  const [currWeather, setCurrWeather] = useState<[] | CurrentConditions[]>([]);
  const [isFav, setFavourite] = useState(false);

  useEffect(() => {
    if (props.city && props.city.id) {
      const getCurrWeatherData = async () => {
        // if (props.city && props.city.id) {
        const currConditions = await getCurrentWeather(props.city.id);
        console.log("My currConditions:", currConditions);
        setCurrWeather(currConditions);
      };
      // getCurrWeatherData();
      if (props.favCities.length > 0) {
        const isFav = props.favCities.find(
          (city: CityProps) => city.id === props.city.id
        );
        if (isFav) setFavourite(true);
      }
    }

    // const getForecastData = async () => {
    //   if (props.city && props.city.id) {
    //     const forecast = await getForecast(props.city.id);
    //     console.log("My forecast:", forecast);
    //     setForecast(forecast.DailyForecasts);
    //   }
    // };

    // getForecastData();
  }, [props]);

  const getDayTime = () => {
    if (!currWeather || !currWeather[0]) return null;
    else return currWeather[0].isDayTime;
  };
  const isDay = getDayTime();
  const heartIconSrc = isFav
    ? "../assets/images/red-heart.png"
    : "../assets/images/outlined-heart_white.png";
  const heartTitle = isFav ? "Remove from favourites" : "Add to favourites";
  const containerBgc = isDay ? "#174385" : "#344463";
  const temp = () => {
    if (!currWeather || !currWeather[0]) return null;
    else {
      const currTemp =
        props.tempUnit === "c"
          ? currWeather[0].Temperature.Metric.Value
          : currWeather[0].Temperature.Imperial.Value;
      return Math.round(currTemp);
    }
  };
  const cookieName = "favCities";

  console.log("@@@@@:", props.city);
  console.log("@@@@@favCities:", props.favCities);

  return (
    <DailyContaier style={{ backgroundColor: containerBgc }}>
      {props.city && props.city.name && (
        <CardTitle>
          <LikeBtn
            src={heartIconSrc}
            title={heartTitle}
            alt=""
            onClick={() => {
              console.log("add to favourites");
              if (isFav) {
                console.log("Removing city:", props.city);
                removeCity(props.city);
              } else {
                console.log("Adding city:", props.city);
                addCity(props.city);
              }
              setFavourite(!isFav);
            }}
          />
          <h2>{props.city.name}</h2>
        </CardTitle>
      )}
      {currWeather && (
        <>
          <TempAndCondition>
            <Temperature temp={temp()} />
            {currWeather[0] && currWeather[0].WeatherIcon && (
              <ConditionIcon idx={currWeather[0].WeatherIcon} />
            )}
          </TempAndCondition>
          {currWeather[0] && currWeather[0].WeatherText && (
            <ConditionText>{currWeather[0].WeatherText}</ConditionText>
          )}
        </>
      )}
    </DailyContaier>
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
  max-height: 50vh;
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

const ConditionText = styled.div`
  padding-bottom: 20px;
`;

const mapStateToProps = (state: any) => {
  return {
    currLocation: state.appStore.currLocation, // remove
    tempUnit: state.appStore.tempUnit,
    favCities: state.appStore.favCities, //remove
  };
};

const mapDispatchToProps = {
  getCurrentLocation,
  setLocation,
  removeCity,
  addCity,
  setUnit,
};

export default connect(mapStateToProps, mapDispatchToProps)(Current);
