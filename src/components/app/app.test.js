import React from "react";
import renderer from "react-test-renderer";

import App from "./app";

it(`Render App`, () => {
  const onPlayButtonClick = jest.fn();

  const tree = renderer
    .create(
        <App
          errorsCount={3}
          onPlayButtonClick={onPlayButtonClick}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
