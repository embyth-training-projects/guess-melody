import React from "react";
import PropTypes from "prop-types";

const WinScreen = (props) => {
  const {questionsCount, mistakesCount, onReplayButtonClick} = props;
  const correctQuestionsCount = questionsCount - mistakesCount;

  return (
    <section className="result">
      <div className="result__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
      </div>
      <h2 className="result__title">Вы настоящий меломан!</h2>
      <p className="result__total">Вы ответили правильно на {correctQuestionsCount} вопросов и совершили {mistakesCount} ошибки</p>
      <button className="replay" type="button"
        onClick={onReplayButtonClick}
      >
        Сыграть ещё раз
      </button>
    </section>
  );
};

WinScreen.propTypes = {
  questionsCount: PropTypes.number.isRequired,
  mistakesCount: PropTypes.number.isRequired,
  onReplayButtonClick: PropTypes.func.isRequired,
};

export default WinScreen;
