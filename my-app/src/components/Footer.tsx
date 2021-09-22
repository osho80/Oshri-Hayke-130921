import React from "react";
import styled from "styled-components";
import { appOrange } from "../theme";

const Footer = () => {
  return <Note>Created by Oshri Hayke for Herolo</Note>;
};

const Note = styled.h3`
  color: ${appOrange};
  padding: 20px;
  margin: 0;
`;

export default Footer;
