import React from "react";
import renderer from "react-test-renderer";

import AudioPlayer from "./audio-player";

const mock = {
  song: {
    src: `https://upload.wikimedia.org/wikipedia/ru/2/20/Highway_to_Hell-Part.ogg`,
  }
};

it(`AudioPlayer is rendered correctly`, () => {
  const {song} = mock;

  const tree = renderer
    .create(
        <AudioPlayer
          isPlaying={false}
          src={song.src}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
