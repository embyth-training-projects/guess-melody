import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import {App} from "./app";

const mockStore = configureStore([]);

const questions = [
  {
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        src: `https://upload.wikimedia.org/wikipedia/ru/2/20/Highway_to_Hell-Part.ogg`,
        genre: `rock`,
      },
      {
        src: `https://upload.wikimedia.org/wikipedia/en/4/4f/Dua_Lipa_Blow_Your_Mind_%28Mwah%29_sample.ogg`,
        genre: `pop`,
      },
      {
        src: `https://upload.wikimedia.org/wikipedia/commons/4/4f/Stlouisblues-9bars.ogg`,
        genre: `jazz`,
      },
      {
        src: `https://upload.wikimedia.org/wikipedia/en/1/14/The_Chain_by_Fleetwood_Mac.ogg`,
        genre: `rock`,
      },
    ]
  },
  {
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
  },
];

describe(`Render App`, () => {
  it(`Render WelcomeScreen`, () => {
    const store = mockStore({
      mistakes: 0,
    });

    const tree = renderer
    .create(
        <Provider store={store}>
          <App
            maxMistakes={3}
            questions={questions}
            onUserAnswer={() => {}}
            onPlayButtonClick={() => {}}
            step={-1}
          />
        </Provider>
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render GenreQuestionScreen`, () => {
    const store = mockStore({
      mistakes: 3,
    });

    const tree = renderer
    .create(
        <Provider store={store}>
          <App
            maxMistakes={3}
            questions={questions}
            onUserAnswer={() => {}}
            onPlayButtonClick={() => {}}
            step={0}
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render ArtistQuestionScreen`, () => {
    const store = mockStore({
      mistakes: 3,
    });

    const tree = renderer
    .create(
        <Provider store={store}>
          <App
            maxMistakes={3}
            questions={questions}
            onUserAnswer={() => {}}
            onPlayButtonClick={() => {}}
            step={1}
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

