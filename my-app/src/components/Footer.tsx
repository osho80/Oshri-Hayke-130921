import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { darkTheme, lightTheme } from "../theme";

const Footer = (props: any) => {
  const isDark = props.isDark;
  const divStyle = isDark ? darkTheme : lightTheme;

  return (
    <FooterWrapper style={divStyle}>
      <Note>Created by Oshri Hayke for Herolo</Note>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div``;
const Note = styled.h3`
  color: #ed8224;
  padding: 20px;
  margin: 0;
`;

const mapStateToProps = (state: any) => {
  return {
    isDark: state.appStore.isDark,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
