import React from "react";

function GameOver(props) {
  return (
    <div
      id="GameBoard"
      style={{
        width: props.width,
        height: props.height,
        borderWidth: props.width / 50,
      }}
    >
      <div id="GameOver" style={{ fontSize: props.width / 15 }}>
        <div id="GameOverText">GAME OVER</div>
        <div
          style={{
            fontSize: props.width / 20,
          }}
        >
          Your score: {props.score}
        </div>
        <div
          style={{
            fontSize: props.width / 40,
          }}
        >
          Top 10 scores:
        </div>
        <div
          style={{
            fontSize: props.width / 50,
          }}
        >
          {/* {props.newHighScore ? "New local " : "Local "}high score:{" "}
          {props.highScore} */}
          {props?.highScores?.map((highScore, index) => {
            return (
              <div key={index}>
                {highScore.name} - {highScore.score}
              </div>
            );
          })}
        </div>
        <div id="PressSpaceText">Press Space to restart</div>
      </div>
    </div>
  );
}

export default GameOver;
