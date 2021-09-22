import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CityProps } from "../types/types";
import Current from "../components/Current";
const Favourites = (props: any) => {
  const [favCities, setFavCities] = useState<[] | CityProps[]>([]);

  useEffect(() => {
    setFavCities(props.favCities);
  }, [props.favCities]);

  if (favCities.length < 1) {
    return (
      <FavouritesContainer>
        <Message>
          <h2>Your List is Empty</h2>
          <p>
            Go back to <Link to="/">home page</Link> and add cities to your
            favourites
          </p>
        </Message>
      </FavouritesContainer>
    );
  } else {
    return (
      <FavouritesContainer>
        {favCities.map((city) => {
          return (
            <CityCard>
              <Current city={city} />
            </CityCard>
          );
        })}
      </FavouritesContainer>
    );
  }
};

const FavouritesContainer = styled.div`
  min-height: 85vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Message = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  justify-content: center;
`;

const CityCard = styled.div`
  min-width: 30%;
  margin: 0 5%;
  @media (max-width: 1100px) {
    margin: 2% 5%;
  }
`;

const mapStateToProps = (state: any) => {
  return {
    favCities: state.appStore.favCities,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
