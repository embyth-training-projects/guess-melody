import * as React from "react";
import {shallow, configure} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

import WelcomeScreen from "./welcome-screen";

configure({adapter: new Adapter()});

it(`Should welcome button be pressed`, () => {
  const handlePlatButtonClick = jest.fn();

  const welcomeScreen = shallow(
      <WelcomeScreen
        errorsCount={3}
        onPlayButtonClick={handlePlatButtonClick}
      />
  );

  const welcomeButton = welcomeScreen.find(`button.welcome__button`);
  welcomeButton.simulate(`click`);
  expect(handlePlatButtonClick).toHaveBeenCalledTimes(1);
});
