import React from "react";
import ReactDOM from "react-dom";

import App from "./components/app/app";

const Settings = {
  ERROR_COUNT: 3,
};

ReactDOM.render(
    <App
      errorsCount={Settings.ERROR_COUNT}
      onPlayButtonClick={() => {}}
    />,
    document.querySelector(`#root`)
);
