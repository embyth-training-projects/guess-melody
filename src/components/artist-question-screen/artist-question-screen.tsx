import * as React from "react";

const ArtistQuestionScreen = (props) => {
  const {question, onAnswerSubmit, renderPlayer} = props;
  const {answers, song} = question;

  return (
    <section className="game__screen">
      <h2 className="game__title">Кто исполняет эту песню?</h2>
      <div className="game__track">
        <div className="track">
          {renderPlayer(song.src, 0)}
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

export default ArtistQuestionScreen;
