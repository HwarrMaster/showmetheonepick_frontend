import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LandingTitle from 'assets/images/landing_title.png';

import 'styles/main.scss';

const MainPage = () => {
  const navigate = useNavigate();

  const startEvaluate = () => {
    navigate('/evaluate');
  }

  useEffect(() => {
    sessionStorage.removeItem('onePick');
  }, [])

  return (
    <div className="landing-wrap">
      <img src={LandingTitle} alt="landing" className="landing_title_img" />
      <p>개발자 연락처: hwarr.master@gamil.com</p>
      <button className="btn-start" onClick={startEvaluate}>시작하기</button>
      <h1 className="landing-title">내가 뽑는 쇼미 원탑</h1>

      <div className="overlay"></div>
    </div>
  )
}

export default MainPage;