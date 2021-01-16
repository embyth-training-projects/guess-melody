import React from "react";
import PropTypes from "prop-types";

import WelcomeScreen from "../welcome-screen/welcome-screen";

const playButtonClickHanler = () => {};

const App = (props) => {
  const {errorsCount} = props;

  return (
    <WelcomeScreen errorsCount={errorsCount} onPlayButtonClick={playButtonClickHanler} />
  );
};

App.propTypes = {
  errorsCount: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
};

export default App;
