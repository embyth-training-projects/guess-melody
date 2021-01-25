import * as React from "react";

const withUserAnswer = (Component) => {
  class WithUserAnswer extends React.PureComponent {
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
