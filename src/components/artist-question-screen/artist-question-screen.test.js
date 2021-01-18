import React from "react";
import renderer from "react-test-renderer";

import ArtistQuestionScreen from "./artist-question-screen";

const question = {
  type: `artist`,
  song: {
    artist: `Linkin Park`,
    src: `https://upload.wikimedia.org/wikipedia/en/4/47/Crawling_%28Linkin_Park_song_-_sample%29.ogg`,
  },
  answers: [
    {
      picture: `http://placehold.it/134x134`,
      artist: `Asking Alexandria`,
    },
    {
      picture: `http://placehold.it/134x134`,
      artist: `Linkin Park`,
    },
    {
      picture: `http://placehold.it/134x134`,
      artist: `Bad Omens`,
    },
    {
      picture: `http://placehold.it/134x134`,
      artist: `Architects`,
    },
  ]
};

it(`ArtistQuestionScreen is rendered correctly`, () => {
  const tree = renderer
    .create(
        <ArtistQuestionScreen
          question={question}
          onAnswerSubmit={() => {}}
        />, {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
