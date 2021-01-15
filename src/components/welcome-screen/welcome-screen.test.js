import React from "react";
import renderer from "react-test-renderer";

import WelcomeScreen from "./welcome-screen";

it(`Should WelcomeScreen render correctly`, () => {
  const onPlayButtonClick = jest.fn();

  const tree = renderer
    .create(<WelcomeScreen
      errorsCount={3}
      onPlayButtonClick={onPlayButtonClick}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
