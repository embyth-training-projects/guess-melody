import * as React from "react";
import {connect} from "react-redux";
import {Router, Route, Switch} from "react-router-dom";

import {ActionCreator} from "../../reducer/game/game";
import {AuthorizationStatus} from "../../reducer/user/user";
import {getStep, getMistakes, getMaxMistakes} from "../../reducer/game/selectors";
import {getQuestions} from "../../reducer/data/selectors";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import {Operation as UserOperation} from "../../reducer/user/user";

import AuthScreen from "../auth-screen/auth-screen";
import WelcomeScreen from "../welcome-screen/welcome-screen";
import GameScreen from "../game-screen/game-screen";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen";
import WinScreen from "../win-screen/win-screen";
import GameOverScreen from "../game-over-screen/game-over-screen";
import PrivateRoute from "../private-route/private-route";

import withActivePlayer from "../../hocs/with-active-player/with-active-player";
import withUserAnswer from "../../hocs/with-user-answer/with-user-answer";

import {GameType, AppRoute} from "../../const";
import history from "../../history";

const GenreQuestionScreenWrapped = withActivePlayer(withUserAnswer(GenreQuestionScreen));
const ArtistQuestionScreenWrapped = withActivePlayer(ArtistQuestionScreen);

class App extends React.PureComponent {
  _getScreen() {
    const {authorizationStatus, step, maxMistakes, mistakes, questions, onUserAnswer, onPlayButtonClick} = this.props;
    const currentQuestion = questions[step];

    if (step === -1) {
      return <WelcomeScreen
        errorsCount={maxMistakes}
        onPlayButtonClick={onPlayButtonClick}
      />;
    }

    if (mistakes >= maxMistakes) {
      return history.push(AppRoute.LOSE);
    }

    if (step >= questions.length) {
      if (authorizationStatus === AuthorizationStatus.AUTH) {
        return history.push(AppRoute.RESULT);
      } else if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
        return history.push(AppRoute.LOGIN);
      }

      return null;
    }

    switch (currentQuestion.type) {
      case GameType.GENRE:
        return (
          <GameScreen type={currentQuestion.type}>
            <GenreQuestionScreenWrapped
              key={step}
              question={currentQuestion}
              onAnswerSubmit={onUserAnswer}
            />
          </GameScreen>
        );
      case GameType.ARTIST:
        return (
          <GameScreen type={currentQuestion.type}>
            <ArtistQuestionScreenWrapped
              key={step}
              question={currentQuestion}
              onAnswerSubmit={onUserAnswer}
            />
          </GameScreen>
        );
    }

    return null;
  }

  render() {
    const {questions, mistakes, resetGame, login} = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route path={AppRoute.ROOT} exact>
            {this._getScreen()}
          </Route>

          <Route path={AppRoute.LOGIN} exact>
            <AuthScreen
              onReplayButtonClick={resetGame}
              onSubmit={login}
            />
          </Route>

          <Route path={AppRoute.LOSE} exact>
            <GameOverScreen
              onReplayButtonClick={resetGame}
            />
          </Route>

          <PrivateRoute path={AppRoute.RESULT} exact
            render={() => (
              <WinScreen
                questionsCount={questions.length}
                mistakesCount={mistakes}
                onReplayButtonClick={resetGame}
              />
            )}
          />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  step: getStep(state),
  maxMistakes: getMaxMistakes(state),
  mistakes: getMistakes(state),
  questions: getQuestions(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  },

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
