import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";

import App from "./components/app/app";

import questions from "./mock/questions";
import {reducer} from "./reducer";

const Settings = {
  ERROR_COUNT: 3,
};

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);

ReactDOM.render(
    <Provider store={store}>
      <App
        errorsCount={Settings.ERROR_COUNT}
        questions={questions}
      />
    </Provider>,
    document.querySelector(`#root`)
);
