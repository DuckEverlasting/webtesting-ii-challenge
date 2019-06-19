import React from 'react';

function Dashboard(props) {
  return (
    <div className="Dashboard">
      <button onClick={props.strike}>STRIKE!</button>
      <button onClick={props.ball}>BALL!</button>
      <button onClick={props.foul}>FOUL!</button>
      <button onClick={props.hit}>HIT!</button>
    </div>
  );
}

export default Dashboard;
