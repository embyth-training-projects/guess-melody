import React from "react";
import PropTypes from "prop-types";

const GenreQuestionScreen = (props) => {
  const {questions: {answers, genre}} = props;

  return (
    <section className="game game--genre">
      <header className="game__header">
        <a className="game__back" href="#">
          <span className="visually-hidden">Сыграть ещё раз</span>
          <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
        </a>

        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370"
            style="filter: url(#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"/>
        </svg>

        <div className="game__mistakes">
          <div className="wrong"></div>
          <div className="wrong"></div>
          <div className="wrong"></div>
        </div>
      </header>

      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form className="game__tracks">
          {
            answers.map((answer, index) => {
              const {genre: answerGenre} = answer;

              return (
                <div key={`${answerGenre}-${index}`} className="track">
                  <button className="track__button track__button--play" type="button"></button>
                  <div className="track__status">
                    <audio></audio>
                  </div>
                  <div className="game__answer">
                    <input className="game__input visually-hidden" type="checkbox" name="answer" value={`${answerGenre}`} id={`${answerGenre}-${index}`} />
                    <label className="game__check" htmlFor={`${answerGenre}-${index}`}>Отметить</label>
                  </div>
                </div>
              );
            })
          }


          <div className="track">
            <button className="track__button track__button--play" type="button"></button>
            <div className="track__status">
              <audio></audio>
            </div>
            <div className="game__answer">
              <input className="game__input visually-hidden" type="checkbox" name="answer" value="answer-1" id="answer-2" />
              <label className="game__check" htmlFor="answer-2">Отметить</label>
            </div>
          </div>

          <div className="track">
            <button className="track__button track__button--pause" type="button"></button>
            <div className="track__status">
              <audio></audio>
            </div>
            <div className="game__answer">
              <input className="game__input visually-hidden" type="checkbox" name="answer" value="answer-1" id="answer-3" />
              <label className="game__check" htmlFor="answer-3">Отметить</label>
            </div>
          </div>

          <div className="track">
            <button className="track__button track__button--play" type="button"></button>
            <div className="track__status">
              <audio></audio>
            </div>
            <div className="game__answer">
              <input className="game__input visually-hidden" type="checkbox" name="answer" value="answer-1" id="answer-4" />
              <label className="game__check" htmlFor="answer-4">Отметить</label>
            </div>
          </div>

          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    </section>
  );
};

GenreQuestionScreen.propTypes = {
  questions: PropTypes.shape({
    type: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(
        PropTypes.shape({
          src: PropTypes.string.isRequired,
          genre: PropTypes.string.isRequired,
        })
    ).isRequired,
  }).isRequired,
};

export default GenreQuestionScreen;
