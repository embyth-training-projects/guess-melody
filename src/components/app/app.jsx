import React from "react";
import PropTypes from "prop-types";

import WelcomeScreen from "../welcome-screen/welcome-screen";

const App = (props) => {
  const {errorsCount, onPlayButtonClick} = props;

  return (
    <WelcomeScreen errorsCount={errorsCount} onPlayButtonClick={onPlayButtonClick} />
  );
};

App.propTypes = {
  errorsCount: PropTypes.number.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
};

export default App;
