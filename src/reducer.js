import {extend} from "./utils";

const initialState = {
  step: -1,
  mistakes: 0,
};

export const ActionType = {
  INCREMENT_STEP: `INCREMENT_STEP`,
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_STEP:
      return extend(state, {
        step: state.step + action.payload,
      });

    case ActionType.INCREMENT_MISTAKES:
      return extend(state, {
        mistakes: state.mistakes + action.payload,
      });
  }

  return state;
};
