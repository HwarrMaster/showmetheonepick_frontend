import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import 'styles/evaluate.scss';

import { singerList } from "assets/mockdata/list";

const EvaluatePage = () => {
  const totalList = singerList;
  const navigate = useNavigate();

  const roundChoiceDim = useRef(null);

  const [ gameList, setGameList ] = useState([]);
  const currentRound = useRef(1);
  const currentStage = useRef(1);

  const [ gameRoundTwoList, setGameRoundTwoList ] = useState([]);       // 8강
  const [ gameRoundThreeList, setGameRoundThreeList ] = useState([]);   // 4강
  const [ gameFinalRoundList, setFinalRoundList ] = useState([]);       // 결승

  const [boxState, setBoxState] = useState(false);
  const currentSigner = useRef(null);

  const startFadeEffect = (signer) => {
    currentSigner.current = signer.name
    setBoxState(true);

    setTimeout(() => {
     setBoxState(false);
     currentSigner.current = null;
    }, 1000);
  };

  const makeGameList = (list, len) => {
    const copiedList = JSON.parse(JSON.stringify(list));
    shuffle(copiedList);
    
    const newGameList = [];

    for (let i = 0; i < len; i++) {
      newGameList[i] = [];
      newGameList[i].push(copiedList.splice(0, 2));
    }

    setGameList(newGameList);
  }

  const shuffle = (array) => {
    for (let index = array.length - 1; index > 0; index--) {
      const randomPosition = Math.floor(Math.random() * (index + 1));
  
      const temporary = array[index];
      array[index] = array[randomPosition];
      array[randomPosition] = temporary;
    }
  }

  const selectSinger = (singer) => {
    startFadeEffect(singer);

    setTimeout(() => {
      if (currentRound.current <= 3) {
        // 16강일 때
        if (currentRound.current === 1) {
          setGameRoundTwoList(currentList => [...currentList, singer]);
        }
        // 8강일 때
        else if (currentRound.current === 2) {
          setGameRoundThreeList(currentList => [...currentList, singer]);
        }
        // 4강일 때
        else if (currentRound.current === 3) {
          setFinalRoundList(currentList => [...currentList, singer]);
        }

        setGameList(prevList => prevList.filter((_, index) => 0 !== index))
      }
      
      // 결승일 때
      else if (currentRound.current === 4) {
        handleOnepick(singer);
      }
  
      if (gameList.length <= 1) {
        currentRound.current = currentRound.current + 1
      }
  
      currentStage.current += 1;
    }, 200)
  }

  const handleOnepick = (pick) => {
    sessionStorage.setItem('onePick', JSON.stringify(pick));
    navigate('/onepick');
  }

  const getCurrentGame = () => {
    let currentGameState = '';

    switch (currentRound.current) {
      case 1:
        currentGameState = '16강'
        break;
      case 2:
        currentGameState = '8강'
        break;
      case 3:
        currentGameState = '4강'
        break;
      case 4:
        currentGameState = '결승'
        break;
      default:
        currentGameState = '16강'
        break;
    }

    return currentGameState;
  }

  const DisplayChoiceDim = () => {
    roundChoiceDim.current.style.display = 'flex';

    setTimeout(() => {
      roundChoiceDim.current.style.display = 'none';
    }, 700);
  }

  useEffect(() => {
    sessionStorage.removeItem('onePick');
  }, [])

  useEffect(() => {
    makeGameList(totalList, 8)
  }, [totalList])

  useEffect(() => {
    DisplayChoiceDim();

    if (currentRound.current === 2) {
      makeGameList(gameRoundTwoList, 4)
      currentStage.current = 1;
    }
    if (currentRound.current === 3) {
      makeGameList(gameRoundThreeList, 2)
      currentStage.current = 1;
    }
    if (currentRound.current === 4) {
      makeGameList(gameFinalRoundList, 1)
      currentStage.current = 1;
    }
  }, [currentRound.current])

  return (
    <div className="no-padding-container">
      <div id="round-notice" ref={roundChoiceDim}>
        { getCurrentGame() } 시작
      </div>
      
      <div className="wrapper">
        {
          gameList.length ?
            <>
              <div className={`video-box ${boxState ? 'animate' : ''}`}>
                <iframe
                  key={`iframe-${gameList[0][0][0].youtube_id}`}
                  className="video"
                  src={"https://www.youtube.com/embed/" + gameList[0][0][0].youtube_id}
                  title={"video_" + gameList[0][0][0].name}
                  ></iframe>
              </div>

              <div className={`content-box`}>
                <h2>
                { getCurrentGame() } {currentRound.current < 4 ? currentStage.current + '경기' : null }
                </h2>

                <div className="btn-wrap">
                  {
                    boxState ? (
                      <button className="btn-selected">
                        <span className="btn-name">
                          { currentSigner.current }
                        </span>
                      </button>
                    ) : (
                    <div className="btn-outter">
                      <button className="btn-choice" onClick={() => selectSinger(gameList[0][0][0])}>
                        <span className="btn-name">
                          {gameList[0][0][0].name}
                        </span>
                      </button>
                      <button className="btn-choice" onClick={() => selectSinger(gameList[0][0][1])}>
                        <span className="btn-name">
                          {gameList[0][0][1].name}
                        </span>
                      </button>
                    </div>
                    )
                  }
                </div>
              </div>

              <div className={`video-box ${boxState ? 'animate' : ''}`}>
                <iframe
                  key={`iframe-${gameList[0][0][1].youtube_id}`}
                  className="video"
                  src={"https://www.youtube.com/embed/" + gameList[0][0][1].youtube_id}
                  title={"video_" + gameList[0][0][1].name}
                  ></iframe>
              </div>
            </>
          : null
        }
      </div>
    </div>
  )
}

export default EvaluatePage;