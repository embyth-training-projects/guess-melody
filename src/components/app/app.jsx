import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {ActionCreator} from "../../reducer";

import WelcomeScreen from "../welcome-screen/welcome-screen";
import GameScreen from "../game-screen/game-screen";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen";
import WinScreen from "../win-screen/win-screen";
import GameOverScreen from "../game-over-screen/game-over-screen";

import withActivePlayer from "../../hocs/with-active-player/with-active-player";
import withUserAnswer from "../../hocs/with-user-answer/with-user-answer";

import {GameType} from "../../const";

const GenreQuestionScreenWrapped = withActivePlayer(withUserAnswer(GenreQuestionScreen));
const ArtistQuestionScreenWrapped = withActivePlayer(ArtistQuestionScreen);

class App extends PureComponent {
  _getScreen() {
    const {step, maxMistakes, mistakes, questions, onUserAnswer, onPlayButtonClick, resetGame} = this.props;
    const currentQuestion = questions[step];

    if (step === -1) {
      return <WelcomeScreen
        errorsCount={maxMistakes}
        onPlayButtonClick={onPlayButtonClick}
      />;
    }

    if (mistakes >= maxMistakes) {
      return (
        <GameOverScreen
          onReplayButtonClick={resetGame}
        />
      );
    }

    if (step >= questions.length) {
      return (
        <WinScreen
          questionsCount={questions.length}
          mistakesCount={mistakes}
          onReplayButtonClick={resetGame}
        />
      );
    }

    switch (currentQuestion.type) {
      case GameType.GENRE:
        return (
          <GameScreen type={currentQuestion.type}>
            <GenreQuestionScreenWrapped
              question={currentQuestion}
              onAnswerSubmit={onUserAnswer}
            />
          </GameScreen>
        );
      case GameType.ARTIST:
        return (
          <GameScreen type={currentQuestion.type}>
            <ArtistQuestionScreenWrapped
              question={currentQuestion}
              onAnswerSubmit={onUserAnswer}
            />
          </GameScreen>
        );
    }

    return null;
  }

  render() {
    return this._getScreen();
  }
}

App.propTypes = {
  maxMistakes: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  step: state.step,
  maxMistakes: state.maxMistakes,
  mistakes: state.mistakes,
  questions: state.questions,
});

const mapDispatchToProps = (dispatch) => ({
  onPlayButtonClick() {
    dispatch(ActionCreator.incrementStep());
  },

  onUserAnswer(question, answer) {
    dispatch(ActionCreator.incrementMistake(question, answer));
    dispatch(ActionCreator.incrementStep());
  },

  resetGame() {
    dispatch(ActionCreator.resetGame());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
