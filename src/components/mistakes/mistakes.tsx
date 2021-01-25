import * as React from "react";

const Mistakes = (props) => {
  const {count} = props;

  const mistakes = new Array(count).fill(``);

  return (
    <div className="game__mistakes">
      {mistakes.map((item, index) => <div key={`mistake-${index}`} className="wrong" />)}
    </div>
  );
};

export default Mistakes;
