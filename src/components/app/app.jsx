import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import WelcomeScreen from "../welcome-screen/welcome-screen";

class App extends PureComponent {
  render() {
    const {errorsCount} = this.props;

    return (
      <WelcomeScreen
        errorsCount={errorsCount}
        onPlayButtonClick={() => {}}
      />
    );
  }
}

App.propTypes = {
  errorsCount: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
};

export default App;
