import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";

import App from "./components/app/app";

import reducer from "./reducer/reducer";
import {Operation as DataOperation} from "./reducer/data/data";
import {Operation as UserOperation, ActionCreator, AuthorizationStatus} from "./reducer/user/user";
import {createAPI} from "./api";

const onUnauthrized = () => {
  store.dispatch(ActionCreator.requiredAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthrized);

const store = createStore(
    reducer,
    applyMiddleware(thunk.withExtraArgument(api))
);

store.dispatch(DataOperation.loadQuestions());
store.dispatch(UserOperation.checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);
