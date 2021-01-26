import * as React from "react";
import * as renderer from "react-test-renderer";

import GenreQuestionScreen from "./genre-question-screen";
import {GameType, QuestionGenre} from "../../types";
import {noop} from "../../utils";

const question: QuestionGenre = {
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
};

it(`GenreQuestionScreen is rendered correctly`, () => {
  const tree = renderer
    .create((
      <GenreQuestionScreen
        question={question}
        onAnswerSubmit={noop}
        onAnswerChange={noop}
        renderPlayer={() => null}
        userAnswers={[false, false, false, false]}
      />
    ), {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
