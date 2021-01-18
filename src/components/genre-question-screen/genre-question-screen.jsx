import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import AudioPlayer from "../audio-player/audio-player";
import {GameType} from "../../const";

class GenreQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      answers: [false, false, false, false],
    };
  }

  render() {
    const {question, onAnswerSubmit} = this.props;
    const {answers: userAnswers} = this.state;
    const {answers, genre} = question;

    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form className="game__tracks"
          onSubmit={(evt) => {
            evt.preventDefault();
            onAnswerSubmit(question, this.state.answers);
          }}
        >

          {answers.map((answer, index) => (
            <div key={`${index}-${answer.src}`} className="track">
              <AudioPlayer
                isPlaying={index === 0}
                src={answer.src}
              />
              <div className="game__answer">
                <input className="game__input visually-hidden" type="checkbox" name="answer"
                  value={`answer-${index}`}
                  id={`answer-${index}`}
                  checked={userAnswers[index]}
                  onChange={(evt) => {
                    const value = evt.target.checked;

                    this.setState({
                      answers: [...userAnswers.slice(0, index), value, ...userAnswers.slice(index + 1)],
                    });
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
};

export default GenreQuestionScreen;
