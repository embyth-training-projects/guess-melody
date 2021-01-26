import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import {App} from "./app";

import NameSpace from "../../reducer/name-space";
import {AuthorizationStatus} from "../../reducer/user/user";
import {GameType, QuestionArtist, QuestionGenre} from "../../types";
import {noop} from "../../utils";

const mockStore = configureStore([]);

const questions: (QuestionArtist | QuestionGenre)[] = [
  {
    type: GameType.GENRE,
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
    type: GameType.ARTIST,
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
      [NameSpace.GAME]: {
        mistakes: 0,
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      },
    });

    const tree = renderer
    .create(
        <Provider store={store}>
          <App
            authorizationStatus={AuthorizationStatus.NO_AUTH}
            login={noop}
            maxMistakes={3}
            mistakes={0}
            questions={questions}
            onUserAnswer={noop}
            onPlayButtonClick={noop}
            resetGame={noop}
            step={-1}
          />
        </Provider>
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render GenreQuestionScreen`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 3,
      }
    });

    const tree = renderer
    .create(
        <Provider store={store}>
          <App
            authorizationStatus={AuthorizationStatus.NO_AUTH}
            login={noop}
            maxMistakes={3}
            mistakes={0}
            questions={questions}
            onUserAnswer={noop}
            onPlayButtonClick={noop}
            resetGame={noop}
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
      [NameSpace.GAME]: {
        mistakes: 3,
      }
    });

    const tree = renderer
    .create(
        <Provider store={store}>
          <App
            authorizationStatus={AuthorizationStatus.NO_AUTH}
            login={noop}
            maxMistakes={3}
            mistakes={0}
            questions={questions}
            onUserAnswer={noop}
            onPlayButtonClick={noop}
            resetGame={noop}
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

  it(`Render GameOverScreen`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 0,
      }
    });

    const tree = renderer
    .create(
        <Provider store={store}>
          <App
            authorizationStatus={AuthorizationStatus.NO_AUTH}
            login={noop}
            maxMistakes={3}
            mistakes={3}
            questions={questions}
            onUserAnswer={noop}
            onPlayButtonClick={noop}
            resetGame={noop}
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

  it(`Render WinScreen`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 5,
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
    });

    const tree = renderer
    .create(
        <Provider store={store}>
          <App
            authorizationStatus={AuthorizationStatus.AUTH}
            login={noop}
            maxMistakes={3}
            mistakes={0}
            questions={questions}
            onUserAnswer={noop}
            onPlayButtonClick={noop}
            resetGame={noop}
            step={3}
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

  it(`Render AuthScreen`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 3,
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      },
    });

    const tree = renderer
    .create(
        <Provider store={store}>
          <App
            authorizationStatus={AuthorizationStatus.NO_AUTH}
            login={noop}
            maxMistakes={3}
            mistakes={0}
            questions={questions}
            onUserAnswer={noop}
            onPlayButtonClick={noop}
            resetGame={noop}
            step={3}
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

