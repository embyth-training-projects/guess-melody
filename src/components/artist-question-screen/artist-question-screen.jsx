import React from "react";
import PropTypes from "prop-types";
import {GameType} from "../../const";

const ArtistQuestionScreen = (props) => {
  const {question, onAnswerSubmit} = props;
  const {answers, song} = question;

  return (
    <section className="game__screen">
      <h2 className="game__title">Кто исполняет эту песню?</h2>
      <div className="game__track">
        <div className="track">
          <button className="track__button track__button--play" type="button"></button>
          <div className="track__status">
            <audio src={song.src} />
          </div>
        </div>
      </div>

      <form className="game__artist">
        {answers.map((answer, index) => (
          <div key={`${answer.artist}-${index}`} className="artist">
            <input className="artist__input visually-hidden" type="radio" name="answer" value={`answer-${index}`} id={`answer-${index}`}
              onChange={(evt) => {
                evt.preventDefault();
                onAnswerSubmit(question, answer);
              }}
            />
            <label className="artist__name" htmlFor={`answer-${index}`}>
              <img className="artist__picture" src={answer.picture} alt={answer.artist} />
              {answer.artist}
            </label>
          </div>
        ))}
      </form>
    </section>
  );
};

ArtistQuestionScreen.propTypes = {
  question: PropTypes.shape({
    type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
    song: PropTypes.shape({
      artist: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
    }).isRequired,
    answers: PropTypes.arrayOf(
        PropTypes.shape({
          picture: PropTypes.string.isRequired,
          artist: PropTypes.string.isRequired,
        })
    ).isRequired,
  }).isRequired,
  onAnswerSubmit: PropTypes.func.isRequired,
};

export default ArtistQuestionScreen;
