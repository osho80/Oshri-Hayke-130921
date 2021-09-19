import React from "react";
import styled from "styled-components";
import UnitIcon from "./UnitIcon";

const Temperature = (props: { temp: number | null }) => {
  return (
    <TempContainer>
      {props.temp && (
        <>
          <Temp>{props.temp}</Temp>
          <UnitIcon />
        </>
      )}
    </TempContainer>
  );
};

const TempContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Temp = styled.p`
  font-weight: bold;
  font-size: 18px;
  color: white;
`;

export default Temperature;
