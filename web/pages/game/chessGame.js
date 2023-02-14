import MainLayout from "~/components/layouts/MainLayout";
import { parserUserCookies } from "~/ultis/parser";
import {Chess} from 'chess.js';
import {useState,useEffect} from "react";
import { Chessboard } from "react-chessboard";
import { message } from "antd";
export async function getServerSideProps(context) {
  const userCookie = context.req.cookies.user;

  if (!userCookie) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  //const id = JSON.parse(userCookie).id;
  const userData = parserUserCookies(context.req.cookies);

  return {
    props: {
      userData: userData,
    },
  };
}

export default function ChessGame({ userData }) {
  const [game, setGame] = useState(new Chess());
  const [change, setChange] = useState(0);
  console.log(game);
  const makeMove = (move) => {
    const gameCopy = new Chess();
    gameCopy.loadPgn(game.pgn());
    let result = gameCopy.move(move);
    setGame(gameCopy);
    return result;
}
//random move
const randomMove = () => {
    const possibleMoves = game.moves();
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    makeMove(possibleMoves[randomIndex]);
}
useEffect(() => {
    if(change>0&&game.turn()=='b'&&!game.isCheckmate()) setTimeout(randomMove, 250);
    if(game.isCheckmate()) message.success('You win');
}, [change]);
const onDrop = (startSquare, endSquare) => {
    
   let test = makeMove({
        from: startSquare,
        to: endSquare,
        promotion: 'q'
    });
    console.log(game.moves(),'+',game.turn());
    if(test === null) return false;
    //setTimeout(randomMove, 250);
    if(game.isCheckmate()) message.success('You win');
    else setChange(change+1);
}
  return (
    <MainLayout userData={userData}>
      <div>Chess Game</div>
      <Chessboard id="BasicBoard" 
      position={game.fen()}
      onPieceDrop={onDrop}
      />
    </MainLayout>
  );
}
