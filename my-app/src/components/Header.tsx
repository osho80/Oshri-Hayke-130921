import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import UnitIcon from "./UnitIcon";

import { setUnit } from "../store/actions";

const Header = (props: any) => {
  return (
    <AppHeader>
      <Logo>My wethaer app</Logo>
      <Links>
        <MenuItem>
          <Link to="/">HOME</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/favourites">MY CITIES</Link>
        </MenuItem>
        <MenuItem>
          <UnitIcon />
        </MenuItem>

        {/* <SetBgcMode /> */}
      </Links>
    </AppHeader>
  );
};

const AppHeader = styled.div`
  max-width: 1440px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.h1``;
const MenuItem = styled.div`
  margin: 0 20px;
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-arround;
`;
const mapStateToProps = (state: any) => {
  return {
    tempUnit: state.appStore.tempUnit,
  };
};

const mapDispatchToProps = {
  setUnit,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
