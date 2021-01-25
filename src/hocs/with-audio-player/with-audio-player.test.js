import React from "react";
import renderer from "react-test-renderer";

import withAudioPlayer from "./with-audio-player";

const MockComponent = (props) => {
  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};

const MockComponentWrapped = withAudioPlayer(MockComponent);

it(`withAudioPlayer is rendered correctly`, () => {
  const tree = renderer
    .create(<MockComponentWrapped
      isPlaying={false}
      onPlayButtonClick={() => {}}
      src={``}
    />, {
      createNodeMock() {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
