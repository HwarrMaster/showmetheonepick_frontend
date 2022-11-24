import React, { useEffect, useState } from "react";

import ResultApi from "http/result";
import "../styles/result.scss";

const ResultPage = () => {
  const [ list, setList ] = useState([]);
  const [ topFiveList, setTopFiveList ] = useState({});

  const getResultList = async() => {
    const res = await ResultApi.getList();

    const allList = res.results.map(item => {
      return {
        id: item.properties.uuid.number,
        name: item.properties.winner.title[0].text.content,
        content: item.properties.input_text.rich_text[0].text.content
      }
    })
    const sortedList = findTopFivePlayer(allList);

    setTopFiveList(sortedList);
    setList(allList);
  }

  const findTopFivePlayer = (list) => {
    const playerObject = {};

    const len = list.length;

    for(let i = 0; i < len; i++) {
      if (!playerObject[list[i].name]) {
        playerObject[list[i].name] = 1
      } else {
        playerObject[list[i].name]++
      }
    }

    return Object.fromEntries(
      Object.entries(playerObject).sort(([,a],[,b]) => b - a)
    );
  }

  useEffect(() => {
    getResultList();
  }, [])

  return (
    <section className="container">
      <div className="ranking-box">
        <div className="box-header">
          <h2>랭킹 TOP 3</h2>
          {/* <span>우승 횟수 / 승률</span> */}
          <span>우승 횟수</span>
        </div>

        <ul className="ranking-list">
          {
            Object.entries(topFiveList).slice(0, 5).map((player, idx) => (
              <li className={`ranking-item ${ idx < 3 ? 'top3' : '' }`} key={idx}>
                <div className="item-left">
                  <span>{idx + 1}등</span>
                  <img src={require('../assets/images/' + player[0] + '.jpeg')} alt="thumb" />
                  <span>{ player[0] }</span>
                </div>
                <div className="item-right">
                  {/* <span>10회 / 96.8%</span> */}
                  <span>{player[1]}</span>
                </div>
              </li>
            ))
          }
        </ul>

        <div className="dim-box"></div>
      </div>

      <div className="tweet-box">
        <div className="box-header">
          <h2>실시간 반응</h2>
        </div>

        <ul className="tweet-list">
          {
            list?.map((tweet) => {
              return (
                <li className="tweet-item" key={tweet.id}>
                  <div className="item-content">
                    <div className="item-title">
                      <img src={require('../assets/images/' + tweet.name + '.jpeg')} alt="thumb" />
                      {/* <span>1등</span> */}
                      <span>{ tweet.name }</span>
                    </div>
                    <p>{ tweet.content }</p>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    </section>
  )
}

export default ResultPage;