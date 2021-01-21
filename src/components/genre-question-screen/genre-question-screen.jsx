import React, {PureComponent} from "react";
import PropTypes from "prop-types";

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
            <div key={`${index}-${answer.src}`} className="track">
              {renderPlayer(answer.src, index)}
              <div className="game__answer">
                <input className="game__input visually-hidden" type="checkbox" name="answer"
                  value={`answer-${index}`}
                  id={`answer-${index}`}
                  checked={userAnswers[index]}
                  onChange={(evt) => {
                    const value = evt.target.checked;

                    onAnswerChange(index, value);
                  }}
                />
                <label className="game__check" htmlFor={`answer-${index}`}>Отметить</label>
              </div>
            </div>
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
