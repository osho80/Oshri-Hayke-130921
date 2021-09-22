import React from "react";
import styled from "styled-components";

type Idx = { idx: number };

const ConditionIcon = ({ idx }: Idx) => {
  const index = idx < 10 ? "0" + idx : idx;

  return <ConditionImage src={`../assets/images/${index}-s.png`} />;
};

const ConditionImage = styled.img`
  width: 100px;
`;

export default ConditionIcon;
