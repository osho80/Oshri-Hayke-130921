import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { connect } from "react-redux";
import { GlobalStyles } from "./globalStyles";
import { darkTheme, lightTheme } from "./theme";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import Footer from "./components/Footer";
import "./App.css";

interface Props {
  isDark: boolean;
}

function App(props: Props) {
  const { isDark } = props;

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyles />
      <div className="App">
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/favourites">
              <Favourites />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </div>
    </ThemeProvider>
  );
}

const mapStateToProps = (state: any) => {
  return {
    isDark: state.appStore.isDark,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
