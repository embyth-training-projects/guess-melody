import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import ArtistQuestionScreen from "./artist-question-screen";

configure({adapter: new Adapter()});

const mock = {
  question: {
    type: `artist`,
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
  }
};

it(`Click on user answer should pass to the callback data-object from which this answer was created`, () => {
  const {question} = mock;
  const onAnswerSubmit = jest.fn();
  const userAnswer = {
    artist: `one`,
    picture: `pic-one`,
  };

  const screen = shallow(<ArtistQuestionScreen
    onAnswerSubmit={onAnswerSubmit}
    question={question}
    renderPlayer={() => {}}
  />);

  const answerInputOne = screen.find(`input`).at(0);

  answerInputOne.simulate(`change`, {preventDefault() {}});

  expect(onAnswerSubmit).toHaveBeenCalledTimes(1);

  expect(onAnswerSubmit.mock.calls[0][0]).toMatchObject(question);
  expect(onAnswerSubmit.mock.calls[0][1]).toMatchObject(userAnswer);
});
