import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import GenreQuestionItem from "../genre-question-item/genre-question-item";
import {GameType} from "../../const";

class GenreQuestionScreen extends PureComponent {
  render() {
    const {question, onAnswerSubmit, onAnswerChange, renderPlayer, userAnswers} = this.props;
    const {answers, genre} = question;

    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form className="game__tracks"
          onSubmit={(evt) => {
            evt.preventDefault();
            onAnswerSubmit();
          }}
        >

          {answers.map((answer, index) => (
            <GenreQuestionItem
              answer={answer}
              id={index}
              key={`${index}-${answer.src}`}
              onAnswerChange={onAnswerChange}
              renderPlayer={renderPlayer}
              userAnswer={userAnswers[index]}
            />
          ))}

          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    );
  }
}

GenreQuestionScreen.propTypes = {
  question: PropTypes.shape({
    type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
    genre: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(
        PropTypes.shape({
          src: PropTypes.string.isRequired,
          genre: PropTypes.string.isRequired,
        })
    ).isRequired,
  }).isRequired,
  onAnswerSubmit: PropTypes.func.isRequired,
  onAnswerChange: PropTypes.func.isRequired,
  renderPlayer: PropTypes.func.isRequired,
  userAnswers: PropTypes.arrayOf(PropTypes.bool).isRequired,
};

export default GenreQuestionScreen;
