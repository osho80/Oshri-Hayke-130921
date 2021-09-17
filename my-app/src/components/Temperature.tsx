import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { setUnit } from "../store/actions";

const Temperature = (props: any) => {
  const [currUnit, setCurrUnit] = useState<null | string>(null);
  useEffect(() => {
    const currUnit = props.tempUnit;
    setCurrUnit(currUnit);
  }, [props]);

  const isCels = currUnit === "c" ? true : false;
  const unitIconSrc = isCels
    ? "../assets/images/celsius-white.png"
    : "../assets/images/celsius.png";
  const unitTitle = isCels ? "Change to Fahrenheit" : "Change to Celsius";
  console.log("My Temperature props:", props);

  return (
    props.temp && (
      <Temp>
        <h3>{props.temp}</h3>
        <UnitIcon
          src={unitIconSrc}
          title={unitTitle}
          alt="Toggle Celsius / Fahrenheit"
          onClick={() => console.log("Toggle Celsius / Fahrenheit")}
        />
      </Temp>
    )
  );
};

const cursorPointer = `&:hover {
    cursor: pointer;
  }`;

const Temp = styled.div`
  display: flex;
  align-items: center;
`;

const UnitIcon = styled.img`
  width: 20px;
  height: 20px;
  ${cursorPointer};
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

export default connect(mapStateToProps, mapDispatchToProps)(Temperature);
