import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { setUnit } from "../store/actions";

const UnitIcon = (props: any) => {
  const [currUnit, setCurrUnit] = useState<null | string>(null);
  useEffect(() => {
    const currUnit = props.tempUnit;
    setCurrUnit(currUnit);
  }, [props]);

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
        if (currUnit === "c") props.setUnit("f");
        else props.setUnit("c");
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
