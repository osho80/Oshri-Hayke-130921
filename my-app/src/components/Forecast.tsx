import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Temperature from "./Temperature";
import ConditionIcon from "./ConditionIcon";

import { getForecast } from "../services/weatherService";
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

const Forecast = (props: any) => {
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

  return (
    <ForecastContainer>
      {/* cities.map */}
      <DayForecast>
        <Day>Wed</Day>
        <Temperature temp={19} />
        <ConditionIcon idx={1} />
        <ConditionText>Sunny</ConditionText>
        <TempSeperator> / </TempSeperator>
        <Temperature temp={30} />
        <ConditionIcon idx={41} />
        <ConditionText>Clear</ConditionText>
      </DayForecast>
    </ForecastContainer>
  );
};

const cursorPointer = `&:hover {
    cursor: pointer;
  }`;

const ForecastContainer = styled.div`
  background-color: #61dafb;
  padding: 0 20px;
`;
const DayForecast = styled.div`
  display: flex;
  align-items: center;
`;
const Day = styled.p`
  padding-right: 20px;
`;
const ConditionText = styled.p``;
const TempSeperator = styled.p`
  padding: 0 20px;
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

export default connect(mapStateToProps, mapDispatchToProps)(Forecast);
