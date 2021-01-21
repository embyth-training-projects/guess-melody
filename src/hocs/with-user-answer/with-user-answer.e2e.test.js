import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});

import withUserAnswer from "./with-user-answer";

const MockComponent = () => <div />;
const MockComponentWrapped = withUserAnswer(MockComponent);

const mock = {
  question: {
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        src: `path`,
        genre: `rock`,
      },
      {
        src: `path`,
        genre: `pop`,
      },
      {
        src: `path`,
        genre: `jazz`,
      },
      {
        src: `path`,
        genre: `blues`,
      },
    ],
  },
};

it(`Should change answers`, () => {
  const wrapper = shallow(
      <MockComponentWrapped
        question={mock.question}
        onAnswerSubmit={() => {}}
      />
  );

  expect(wrapper.props().userAnswers).toEqual([false, false, false, false]);

  wrapper.props().onAnswerChange(0, true);
  expect(wrapper.props().userAnswers).toEqual([true, false, false, false]);

  wrapper.props().onAnswerChange(0, false);
  expect(wrapper.props().userAnswers).toEqual([false, false, false, false]);

  wrapper.props().onAnswerChange(1, true);
  expect(wrapper.props().userAnswers).toEqual([false, true, false, false]);
});
