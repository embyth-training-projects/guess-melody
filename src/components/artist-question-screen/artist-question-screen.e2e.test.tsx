import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

import ArtistQuestionScreen from "./artist-question-screen";
import {GameType, QuestionArtist} from "../../types";
import {noop} from "../../utils";

configure({adapter: new Adapter()});

const question: QuestionArtist = {
  type: GameType.ARTIST,
  song: {
    artist: ``,
    src: ``,
  },
  answers: [
    {
      picture: `pic-one`,
      artist: `one`,
    },
    {
      picture: `pic-two`,
      artist: `two`,
    },
    {
      picture: `pic-three`,
      artist: `three`,
    },
    {
      picture: `pic-four`,
      artist: `four`,
    },
  ]
};

const mockEvent = {
  preventDefault: noop,
};

it(`Click on user answer should pass to the callback data-object from which this answer was created`, () => {
  const onAnswerSubmit = jest.fn();
  const userAnswer = {
    artist: `one`,
    picture: `pic-one`,
  };

  const screen = shallow(<ArtistQuestionScreen
    onAnswerSubmit={onAnswerSubmit}
    question={question}
    renderPlayer={() => null}
  />);

  const answerInputOne = screen.find(`input`).at(0);

  answerInputOne.simulate(`change`, mockEvent);

  expect(onAnswerSubmit).toHaveBeenCalledTimes(1);

  expect(onAnswerSubmit.mock.calls[0][0]).toMatchObject(question);
  expect(onAnswerSubmit.mock.calls[0][1]).toMatchObject(userAnswer);
});
