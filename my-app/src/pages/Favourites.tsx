import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Container, Grid } from "@material-ui/core";
import { CityProps } from "../types/types";
import { darkTheme, lightTheme } from "../theme";
// import { setCookie } from "../services/cookieService";
import { removeCity } from "../store/actions";
import Current from "../components/Current";
const Favourites = (props: any) => {
  const [favCities, setFavCities] = useState<[] | CityProps[]>([]);

  useEffect(() => {
    const storeCities = props.favCities;
    setFavCities(storeCities);
  }, [props, favCities]);

  if (favCities.length <= 0) {
    return (
      <FavouritesContainer>
        <h2>Your List is Empty</h2>
        <p>
          Go back to <Link to="/">home page</Link> and add cities to your
          favourites
        </p>
      </FavouritesContainer>
    );
  } else {
    return (
      <FavouritesContainer>
        <Container className="main-contaier">
          {/* <Grid container spacing={4} alignItems="center"> */}
          <Grid item xs={12} sm={12} md={6}>
            {favCities.map((city) => {
              return <Current city={city} />;
            })}
          </Grid>
          {/* </Grid> */}
        </Container>
      </FavouritesContainer>
    );
  }
};

const FavouritesContainer = styled.div`
  min-height: 80vh;
`;

const mapStateToProps = (state: any) => {
  return {
    tempUnit: state.appStore.tempUnit,
    isDark: state.appStore.isDark,
    favCities: state.appStore.favCities,
  };
};

const mapDispatchToProps = {
  removeCity,
};

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
