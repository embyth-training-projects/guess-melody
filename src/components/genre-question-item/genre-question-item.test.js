import React from "react";
import renderer from "react-test-renderer";

import GenreQuestionItem from "./genre-question-item";

const answer = {
  src: `path`,
  genre: `rock`,
};

it(`GenreQuestionItem is rendered correctly`, () => {
  const tree = renderer
    .create(<GenreQuestionItem
      answer={answer}
      id={0}
      onAnswerChange={() => {}}
      renderPlayer={() => {}}
      userAnswer={false}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
