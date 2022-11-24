import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import 'styles/onepick.scss';
import CrownIcon from 'assets/images/crown.png'

import EvaluateApi from "http/evaluate";

const OnePick = () => {
  const myOnePick = JSON.parse(sessionStorage.getItem('onePick') || "{}");
  const [ review, setReview ] = useState('');

  const navigate = useNavigate();

  const sendMyOnePick = async() => {
    const params = {
      winner: {
        title: [
          {
            text: {
              content: myOnePick.name
            }
          }
        ]
      },
      input_text: {
        rich_text: [
          {
            text: {
              content: review
            }
          }
        ]
      },
      win_count: {
        number: 1
      }
    }

    const res = await EvaluateApi.sendEvaluate(params);
    
    if (res.status === 200) {
      goToResultPage();
    }
  }

  const goToResultPage = () => {
    navigate('/result', { replace: true });
  }

  return (
    <div className="no-padding-container">
      <div className="wrapper">
      {
        myOnePick && (
          <>
            <div className="video-box">
              <img className="video" src={myOnePick?.thumbnail} alt="thumb" />
              <div className="video-gradient" />
            </div>

            <div className="content">
              <div className="picker-box">
                <h2>1PICK</h2>
                <div className="pick-photo-box">
                  <img src={CrownIcon} alt="crown" className="photo-crown" />
                  <div className="photo-face" style={{ backgroundImage: `url(${require('../assets/images/' + myOnePick.name + '.jpeg')})` }}></div>

                  <h2 style={{ fontSize: '32px' }}>{myOnePick?.name}</h2>
                </div>
              </div>

              <div className="review-box">
                <h3>방구석 프듀의 평가 한마디</h3>
                <textarea value={review} onChange={e => setReview(e.target.value)} className="review-text" placeholder="이영지의 23번째 비트 소환술"></textarea>
              </div>

              <div className="button-box">
                <button onClick={goToResultPage} className="skip">건너뛰기</button>
                <button onClick={sendMyOnePick}>다음</button>
              </div>
            </div>
          </>
        )
      }
      </div>
    </div>
  )
}

export default OnePick;