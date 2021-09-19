import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import moment from "moment";
import Temperature from "./Temperature";
import ConditionIcon from "./ConditionIcon";
import { getForecast, getFarenheitForecast } from "../services/weatherService";
import { DailyForecast } from "../types/types";

const Forecast = (props: any) => {
  const [forecast, setForecast] = useState<[] | DailyForecast[]>([]);

  useEffect(() => {
    if (props.city && props.city.id) {
      const getForecastData = async () => {
        const forecast =
          props.tempUnit === "c"
            ? await getForecast(props.city.id)
            : await getFarenheitForecast(props.city.id);
        setForecast(forecast.DailyForecasts);
      };
      getForecastData();
    }
  }, [props]);

  const renderForecast =
    forecast.length === 0 ? (
      <Loading>Loading Forecast for next 5 Days...</Loading>
    ) : (
      <ForecastContainer>
        {forecast.map((daily, idx) => {
          return (
            <DayForecast key={idx}>
              <Day>{moment(daily.Date).format("ddd")}</Day>
              <Conditions>
                <Min>
                  <Temperature
                    temp={Math.round(daily.Temperature.Minimum.Value)}
                  />
                  <ConditionIcon idx={daily.Night.Icon} />
                </Min>
                <Max>
                  <Temperature
                    temp={Math.round(daily.Temperature.Maximum.Value)}
                  />
                  <ConditionIcon idx={daily.Day.Icon} />
                </Max>
              </Conditions>
            </DayForecast>
          );
        })}
      </ForecastContainer>
    );
  return renderForecast;
};

const Loading = styled.h2`
  color: #ed8224;
`;
const ForecastContainer = styled.div`
  background-color: #61dafb;
  max-width: max-content;
  margin: 0 auto;
  padding: 0 20px;
  border-radius: 8px;
`;
const DayForecast = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0 0;
`;
const Day = styled.p`
  padding-right: 20px;
  color: white;
  @media (max-width: 400px) {
    margin-right: 20px;
  }
`;

const Conditions = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const Min = styled.div`
  display: flex;
`;
const Max = styled.div`
  display: flex;
`;

const mapStateToProps = (state: any) => {
  return {
    tempUnit: state.appStore.tempUnit,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Forecast);
