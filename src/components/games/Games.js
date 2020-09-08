import React, { useEffect } from "react";
import Game from "../game/Game";
import { Link } from "react-router-dom";
import './Games.css'
import { getGame } from "../../ducks/gameReducer";
import { connect } from "react-redux";


const Games = (props) => {
  useEffect(() => {
   props.getGame()
  }, []);

  const mappedGames = props.gameReducer.game.map((el, i) => {
    return <Game data={el} key={i} />;
  });
console.log(props)
  return (
    <div>
      <div className='game-maker'>
        <button><Link className='new-game' to= "/schedule">Schedule Game</Link></button>
      </div>
      <div>
       <h1 className="main-heading games">Games!</h1>
      </div>
      <div className='mapped-game-holder'>{mappedGames}</div>
    </div>
  );
};

const mapStateToProps = (state) => state;
// const mapStateToProps = (state) => ({player: state.reducer.player});

export default connect(mapStateToProps, { getGame })(Games);
