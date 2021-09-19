import React from "react";
import styled from "styled-components";
import UnitIcon from "./UnitIcon";

const Temperature = (props: { temp: number | null }) => {
  return (
    <Temp>
      {props.temp && (
        <>
          <h3>{props.temp}</h3>
          <UnitIcon />
        </>
      )}
    </Temp>
  );
};

const Temp = styled.div`
  display: flex;
  align-items: center;
`;

export default Temperature;
