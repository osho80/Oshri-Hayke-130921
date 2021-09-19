import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Temperature from "./Temperature";
import ConditionIcon from "./ConditionIcon";
import { getCurrentWeather } from "../services/weatherService";
import { removeCity, addCity, setUnit } from "../store/actions";
import { CityProps, CurrentConditions } from "../types/types";
import { setCookie, AddCityToCookie } from "../services/cookieService";

const Current = (props: any) => {
  const [currWeather, setCurrWeather] = useState<[] | CurrentConditions[]>([]);
  const [isFav, setFavourite] = useState(false);

  useEffect(() => {
    if (props.city && props.city.id) {
      const getCurrWeatherData = async () => {
        const currConditions = await getCurrentWeather(props.city.id);
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
  }, [props]);

  const cookieName = "favCities";

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

  return (
    <DailyContaier style={{ backgroundColor: containerBgc }}>
      {props.city && props.city.name && (
        <CardTitle>
          <LikeBtn
            src={heartIconSrc}
            title={heartTitle}
            alt=""
            onClick={async () => {
              console.log("add to favourites");
              if (isFav) {
                console.log("Removing city:", props.city);
                props.removeCity(props.city.id);
              } else {
                AddCityToCookie(cookieName, props.city);
                props.addCity(props.city);
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
    tempUnit: state.appStore.tempUnit,
    favCities: state.appStore.favCities,
  };
};

const mapDispatchToProps = {
  removeCity,
  addCity,
  setUnit,
};

export default connect(mapStateToProps, mapDispatchToProps)(Current);
