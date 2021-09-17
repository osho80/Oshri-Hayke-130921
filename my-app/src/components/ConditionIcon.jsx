import React from "react";
import styled from "styled-components";

const ConditionIcon = ({ idx }) => {
  const index = idx < 10 ? "0" + idx : idx;
  console.log("My condition index:", index);

  return <ConditionImage src={`../assets/images/${index}-s.png`} />;
};

const ConditionImage = styled.img``;

export default ConditionIcon;
