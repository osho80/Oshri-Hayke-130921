import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { setUnit } from "../store/actions";
import { setCookie } from "../services/cookieService";

const UnitIcon = (props: any) => {
  const [currUnit, setCurrUnit] = useState<null | string>(null);
  const cookieName = "tempUnit";

  useEffect(() => {
    const storeUnit = props.tempUnit;
    setCurrUnit(storeUnit);
  }, [props, currUnit]);

  const isCels = currUnit === "c" ? true : false;
  const isWhite = !props.navbar || props.isDark ? "-white" : "";
  const unitIconSrc = isCels
    ? `../assets/images/celsius${isWhite}.png`
    : `../assets/images/fahrenheit${isWhite}.png`;
  const unitTitle = isCels ? "Change to Fahrenheit" : "Change to Celsius";

  return (
    <Unit
      src={unitIconSrc}
      title={unitTitle}
      alt="Toggle Celsius / Fahrenheit"
      onClick={() => {
        if (currUnit === "c") {
          setCookie(cookieName, "f", 60);
          props.setUnit("f");
        } else {
          setCookie(cookieName, "c", 60);
          props.setUnit("c");
        }
      }}
    />
  );
};

const Unit = styled.img`
  &:hover {
    cursor: pointer;
  }
  width: 20px;
  height: 20px;
  margin-left: 10px;
`;

const mapStateToProps = (state: any) => {
  return {
    tempUnit: state.appStore.tempUnit,
    isDark: state.appStore.isDark,
  };
};

const mapDispatchToProps = {
  setUnit,
};

export default connect(mapStateToProps, mapDispatchToProps)(UnitIcon);
