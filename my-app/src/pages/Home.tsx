import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Container, Grid, ClickAwayListener } from "@material-ui/core";
import styled from "styled-components";
import { darkTheme, lightTheme } from "../theme";

import { queryCity } from "../services/weatherService";
import Current from "../components/Current";
import Forecast from "../components/Forecast";

import { City, CityProps } from "../types/types";

const Home = (props: any) => {
  const [inputCities, setInputCities] = useState<[] | City[]>([]);
  const [isDark, setDarkMode] = useState<null | boolean>(null);
  const [isOpen, setOpen] = useState(false);
  const [currCity, setCurrCity] = useState<null | { id: string; name: string }>(
    null
  );

  useEffect(() => {
    if (props.favCities.length < 1) {
      setCurrCity({ id: "215854", name: "Tel Aviv" });
    } else {
      setCurrCity(props.favCities[0]);
    }
    setDarkMode(props.isDark);
  }, [props]);

  const handleChange = async (e: any) => {
    if (!isOpen) setOpen(true);
    const q = e.target.value;
    if (q) {
      const data = await queryCity(q);
      setInputCities(data);
    }
  };

  const selectCity = async ({ id, name }: CityProps) => {
    setCurrCity({ id, name });
    setOpen(false);
  };

  const handleClickAway = () => setOpen(false);

  const mockData = [
    { Key: "364548", LocalizedName: "hfyfyy" },
    { Key: "785785", LocalizedName: "hgjt" },
    { Key: "756554", LocalizedName: "gjhsgsg" },
    { Key: "kjshsk", LocalizedName: "kjshsk" },
    { Key: "674764674", LocalizedName: "7gsjkgkhk" },
    { Key: "785872", LocalizedName: "gksgdutdugg" },
  ];

  const divStyle = isDark ? darkTheme : lightTheme;
  const txtColor = isDark ? "white" : "";
  return (
    <HomePageWrapper style={divStyle}>
      <HomeContainer>
        <Title style={{ color: txtColor }}>
          Always Keeping you Above the Weather
        </Title>
        <CitySearch>
          <SearchInput
            type="text"
            placeholder="search a city"
            onChange={(e) => handleChange(e)}
          />
          {/* {inputCities.length > 0 && isOpen && ( */}
          {mockData.length > 0 && isOpen && (
            <ClickAwayListener onClickAway={handleClickAway}>
              <CitiesList>
                {/* {inputCities.map((city, idx) => { */}
                {mockData.map((city, idx) => {
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
                      <Option>{city.LocalizedName}</Option>
                    </div>
                  );
                })}
              </CitiesList>
            </ClickAwayListener>
          )}
        </CitySearch>
        <Container className="main-contaier">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} sm={12} md={12} xl={6}>
              <Current city={currCity} />
            </Grid>
            <Grid item xs={12} sm={12} md={12} xl={6}>
              <Forecast city={currCity} />
            </Grid>
          </Grid>
        </Container>
      </HomeContainer>
    </HomePageWrapper>
  );
};

const HomePageWrapper = styled.div``;

const HomeContainer = styled.div`
  max-width: 1440px;
  min-height: 85vh;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-family: ShadowsIntoLight;
  letter-spacing: 1.2px;
`;

const CitySearch = styled.div`
  width: 100%;
  position: relative;
`;

const SearchInput = styled.input`
  width: 60%;
  padding: 10px;
  margin-bottom: 30px;
`;

const CitiesList = styled.div`
  width: 60%;
  position: absolute;
  background-color: #1cb6e6;
  border-color: #183640;
  border-radius: 8px;
  left: 20%;
  top: 40px;
`;

const Option = styled.p`
  color: white;
  font-size: 18px;
  &:hover {
    cursor: pointer;
  }
`;

const mapStateToProps = (state: any) => {
  return {
    favCities: state.appStore.favCities,
    isDark: state.appStore.isDark,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
