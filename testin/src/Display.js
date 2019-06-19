import React from 'react';

function Display(props) {
  return (
    <div className="Display">
      <p>BALLS: {props.balls}</p>
      <p>STRIKES: {props.strikes}</p>
    </div>
  );
}

export default Display;
