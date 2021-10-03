import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import UnitIcon from "./UnitIcon";
import { appOrange } from "../theme";
import { setCookie } from "../services/cookieService";
import { setMode } from "../store/actions";

const Header = (props: any) => {
  const cookieName = "isDark";
  const isDark = props.isDark;
  const modeIconSrc = isDark
    ? "../assets/images/darkMode2.png"
    : "../assets/images/lightMode.png";
  const modeTitle = isDark ? "Change to Bright Mode" : "Change to Dark Mode";

  return (
    <AppHeader>
      <Logo>SunCloud</Logo>
      <Links>
        <MenuItem>
          <Link to="/">HOME</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/favourites">MY CITIES</Link>
        </MenuItem>
        <MenuItem>
          <UnitIcon navbar />
        </MenuItem>
        <SetMode
          src={modeIconSrc}
          title={modeTitle}
          alt="Toggle Bright / Dark"
          onClick={() => {
            if (isDark) {
              setCookie(cookieName, false, 60);
              props.setMode(false);
            } else {
              setCookie(cookieName, true, 60);
              props.setMode(true);
            }
          }}
        />
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
  margin: auto;
`;

const Logo = styled.h1`
  color: ${appOrange};
`;
const MenuItem = styled.div`
  margin: 0 20px;
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-arround;
`;

const SetMode = styled.img`
  &:hover {
    cursor: pointer;
  }
  width: 30px;
  height: 30px;
  margin-left: 10px;
`;

const mapStateToProps = (state: any) => {
  return {
    tempUnit: state.appStore.tempUnit,
    isDark: state.appStore.isDark,
  };
};

const mapDispatchToProps = {
  setMode,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
