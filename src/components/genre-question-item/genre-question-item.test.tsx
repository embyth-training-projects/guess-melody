import * as React from "react";
import * as renderer from "react-test-renderer";

import GenreQuestionItem from "./genre-question-item";
import {noop} from "../../utils";

const answer = {
  src: `path`,
  genre: `rock`,
};

it(`GenreQuestionItem is rendered correctly`, () => {
  const tree = renderer
    .create(<GenreQuestionItem
      answer={answer}
      id={0}
      onAnswerChange={noop}
      renderPlayer={() => null}
      userAnswer={false}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
