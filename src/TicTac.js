import React from "react";
import "./TicTac.css";

function calculateWin(square) {
  for (let i = 0; i < 9; ) {
    if (square[i] === square[i + 1] && square[i + 1] === square[i + 2])
      return square[i];

    i = i + 3;
  }

  for (let i = 0; i < 3; ) {
    if (square[i] === square[i + 3] && square[i + 3] === square[i + 6])
      return square[i];

    i = i + 1;
  }

  if (square[0] === square[4] && square[4] === square[8]) return square[0];
  if (square[2] === square[4] && square[4] === square[6]) return square[2];
}

export default function TicTac() {
  const [square, setSquare] = React.useState(Array(9).fill(null));
  const [curSymbol, setCurSymbol] = React.useState("0");
  const [historyList, setHistoryList] = React.useState([]);

  let win = calculateWin(square);

  const onChangeSquare = (event) => {
    setSquare((prev) => {
      let copySquare = [...prev];
      copySquare[event.target.id] = curSymbol;
      return copySquare;
    });

    setHistoryList((prev) => {
      let copyList = [...prev];
      copyList = [...copyList, square];
      return copyList;
    });

    setCurSymbol((prev) => {
      if (prev === "x") {
        return "0";
      } else {
        return "x";
      }
    });
  };

  const onGoToMove = (event) => {
    setSquare(historyList[event.target.id]);
    setHistoryList(historyList.slice(0, event.target.id));
  };

  return (
    <>
      {win != null && <p>{win} is winner</p>}
      <div className="square">
        {square.map((ele, index) => {
          return (
            <button
              key={index}
              disabled={square[index] != null || win != null}
              id={index}
              onClick={onChangeSquare}
            >
              {ele}
            </button>
          );
        })}
      </div>
      <button
        onClick={() => {
          setSquare(Array(9).fill(null));
          setCurSymbol("0");
          setHistoryList([]);
        }}
      >
        Restart
      </button>
      <div>
        {historyList.length > 0 &&
          historyList.map((ele, index) => {
            return (
              <button
                key={index}
                id={index}
                disabled={win != null}
                onClick={onGoToMove}
              >
                go to move {index + 1}
              </button>
            );
          })}
      </div>
    </>
  );
}
