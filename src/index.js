import React from "react";
import ReactDOM from "react-dom";

import App from "./components/app/app";

import questions from "./mock/questions";

const Settings = {
  ERROR_COUNT: 3,
};

ReactDOM.render(
    <App
      errorsCount={Settings.ERROR_COUNT}
      onPlayButtonClick={() => {}}
      questions={questions}
    />,
    document.querySelector(`#root`)
);
