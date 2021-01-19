import {reducer, ActionType, ActionCreator} from "./reducer";

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

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    step: -1,
    mistakes: 0,
    maxMistakes: 3,
    questions,
  });
});

it(`Reducer should increment current step by a given value`, () => {
  expect(reducer({
    step: -1,
    mistakes: 0,
    questions,
  }, {
    type: ActionType.INCREMENT_STEP,
    payload: 1,
  }
  )).toEqual({
    step: 0,
    mistakes: 0,
    questions,
  });

  expect(reducer({
    step: -1,
    mistakes: 0,
    questions,
  }, {
    type: ActionType.INCREMENT_STEP,
    payload: 0,
  }
  )).toEqual({
    step: -1,
    mistakes: 0,
    questions,
  });
});

it(`Reducer should increment number of mistakes by a given value`, () => {
  expect(reducer({
    step: -1,
    mistakes: 0,
  }, {
    type: ActionType.INCREMENT_MISTAKES,
    payload: 1,
  }
  )).toEqual({
    step: -1,
    mistakes: 1,
  });

  expect(reducer({
    step: -1,
    mistakes: 0,
  }, {
    type: ActionType.INCREMENT_MISTAKES,
    payload: 0,
  }
  )).toEqual({
    step: -1,
    mistakes: 0,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for incrementing step returns correct action`, () => {
    expect(ActionCreator.incrementStep()).toEqual({
      type: ActionType.INCREMENT_STEP,
      payload: 1,
    });
  });

  it(`Action creator for incrementing mistake returns action with 0 payload if answer for artist is correct`, () => {
    expect(ActionCreator.incrementMistake({
      type: `artist`,
      song: {
        artist: `correct`,
        src: ``,
      },
      answers: [
        {
          artist: `correct`,
          picture: ``,
        }, {
          artist: `incorrect`,
          picture: ``,
        }, {
          artist: `incorrect-2`,
          picture: ``,
        }, {
          artist: `incorrect-3`,
          picture: ``,
        },
      ]
    }, {
      artist: `correct`,
      picture: ``,
    })).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0,
    });
  });

  it(`Action creator for incrementing mistake returns action with 1 payload if answer for artist is incorrect`, () => {
    expect(ActionCreator.incrementMistake({
      type: `artist`,
      song: {
        artist: `correct`,
        src: ``,
      },
      answers: [
        {
          artist: `correct`,
          picture: ``,
        }, {
          artist: `incorrect`,
          picture: ``,
        }, {
          artist: `incorrect-2`,
          picture: ``,
        }, {
          artist: `incorrect-3`,
          picture: ``,
        },
      ]
    }, {
      artist: `incorrect`,
      picture: ``,
    })).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1,
    });
  });

  it(`Action creator for incrementing mistake returns action with 0 payload if answer for genre is correct`, () => {
    expect(ActionCreator.incrementMistake({
      type: `genre`,
      genre: `jazz`,
      answers: [
        {
          genre: `rock`,
          src: ``,
        }, {
          genre: `jazz`,
          src: ``,
        }, {
          genre: `blues`,
          src: ``,
        }, {
          genre: `blues`,
          src: ``,
        },
      ]
    }, [false, true, false, false])).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0,
    });
  });

  it(`Action creator for incrementing mistake returns action with 1 payload if answer for genre is incorrect`, () => {
    expect(ActionCreator.incrementMistake({
      type: `genre`,
      genre: `jazz`,
      answers: [
        {
          genre: `blues`,
          src: ``,
        }, {
          genre: `blues`,
          src: ``,
        }, {
          genre: `blues`,
          src: ``,
        }, {
          genre: `blues`,
          src: ``,
        },
      ]
    }, [true, true, true, true])).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1,
    });
  });
});
