import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import moment from "moment";
import Temperature from "./Temperature";
import ConditionIcon from "./ConditionIcon";
import { getForecast } from "../services/weatherService";
import { DailyForecast } from "../types/types";

const Forecast = (props: any) => {
  const [forecast, setForecast] = useState<[] | DailyForecast[]>([]);

  useEffect(() => {
    if (props.city && props.city.id) {
      const getForecastData = async () => {
        // if (props.tempUnit)
        const forecast = await getForecast(props.city.id);
        console.log("My forecast:", forecast);
        setForecast(forecast.DailyForecasts);
      };
      getForecastData();
    }
  }, [props]);

  return (
    forecast && (
      <ForecastContainer>
        {forecast.map((daily, idx) => {
          return (
            <DayForecast key={idx}>
              <Day>{moment(daily.Date).format("ddd")}</Day>
              <Temperature temp={Math.round(daily.Temperature.Minimum.Value)} />
              <ConditionIcon idx={daily.Night.Icon} />
              <ConditionText>{daily.Night.IconPhrase}</ConditionText>
              <TempSeperator> / </TempSeperator>
              <Temperature temp={Math.round(daily.Temperature.Maximum.Value)} />
              <ConditionIcon idx={daily.Day.Icon} />
              <ConditionText>{daily.Day.IconPhrase}</ConditionText>
            </DayForecast>
          );
        })}
      </ForecastContainer>
    )
  );
};

const ForecastContainer = styled.div`
  background-color: #61dafb;
  padding: 0 20px;
`;
const DayForecast = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const Day = styled.p`
  padding-right: 20px;
`;
const ConditionText = styled.p`
  //under 540 hide
`;
const TempSeperator = styled.p`
  padding: 0 20px;
`;

const mapStateToProps = (state: any) => {
  return {
    tempUnit: state.appStore.tempUnit,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Forecast);
