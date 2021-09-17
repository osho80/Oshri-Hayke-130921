import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { setUnit } from "../store/actions";
import { setCookie, getCookie } from "../services/cookieService";

const UnitIcon = (props: any) => {
  const [currUnit, setCurrUnit] = useState<null | string>(null);
  const [localUnit, setLocalUnit] = useState("");
  const cookieName = "unit";
  useEffect(() => {
    const getLocal = getCookie(cookieName);
    if (getLocal) {
      setLocalUnit(getLocal);
      props.setUnit(getLocal);
    }
  }, []);

  useEffect(() => {
    const storeUnit = props.tempUnit;
    setCurrUnit(storeUnit);
  }, [props, currUnit]);

  const isCels = currUnit === "c" ? true : false;
  const unitIconSrc = isCels
    ? "../assets/images/celsius.png"
    : "../assets/images/celsius-white.png";
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
  };
};

const mapDispatchToProps = {
  setUnit,
};

export default connect(mapStateToProps, mapDispatchToProps)(UnitIcon);
