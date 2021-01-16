import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import WelcomeScreen from "../welcome-screen/welcome-screen";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen";

import {GameType} from "../../const";

class App extends PureComponent {
  static getScreen(question, props, onUserAnswer) {
    if (question === -1) {
      const {errorsCount} = props;

      return <WelcomeScreen
        errorsCount={errorsCount}
        onPlayButtonClick={onUserAnswer}
      />;
    }

    const {questions} = props;
    const currentQuestion = questions[question];

    switch (currentQuestion.type) {
      case GameType.GENRE:
        return <GenreQuestionScreen
          question={currentQuestion}
          onAnswerSubmit={onUserAnswer}
        />;
      case GameType.ARTIST:
        return <ArtistQuestionScreen
          question={currentQuestion}
          onAnswerSubmit={onUserAnswer}
        />;
    }

    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      gameQuestionIndex: -1,
    };

    this._userAnswerHandler = this._userAnswerHandler.bind(this);
  }

  render() {
    const {gameQuestionIndex} = this.state;

    return App.getScreen(gameQuestionIndex, this.props, this._userAnswerHandler);
  }

  _userAnswerHandler() {
    const {questions} = this.props;

    this.setState((prevState) => {
      const nextIndex = prevState.gameQuestionIndex + 1;
      const isEnd = nextIndex >= questions.length;

      return {
        gameQuestionIndex: isEnd ? -1 : nextIndex
      };
    });
  }
}

App.propTypes = {
  errorsCount: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
};

export default App;
