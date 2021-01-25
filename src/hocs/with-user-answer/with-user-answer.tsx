import * as React from "react";
import {Subtract} from "utility-types";
import {QuestionGenre} from "../../types";

type Answers = boolean[];

interface Props {
  question: QuestionGenre;
  onAnswerSubmit: (question: QuestionGenre, answers: Answers) => void;
}

interface State {
  answers: Answers;
}

interface InjectingProps {
  userAnswer: Answers;
  onAnswerChange: (answerIndex: number) => void;
  onAnswerSubmit: () => void;
}

const withUserAnswer = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Props & Subtract<P, InjectingProps>;

  class WithUserAnswer extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        answers: new Array(props.question.answers.length).fill(false),
      };

      this._handleAnswerSubmit = this._handleAnswerSubmit.bind(this);
      this._handleAnswerChange = this._handleAnswerChange.bind(this);
    }

    _handleAnswerSubmit() {
      const {onAnswerSubmit, question} = this.props;
      const {answers} = this.state;

      onAnswerSubmit(question, answers);
    }

    _handleAnswerChange(index, value) {
      const {answers} = this.state;

      const userAnswers = answers.slice(0);
      userAnswers[index] = value;

      this.setState({
        answers: userAnswers,
      });
    }

    render() {
      const {answers} = this.state;

      return (
        <Component
          {...this.props}
          userAnswers={answers}
          onAnswerSubmit={this._handleAnswerSubmit}
          onAnswerChange={this._handleAnswerChange}
        />
      );
    }
  }

  return WithUserAnswer;
};

export default withUserAnswer;
