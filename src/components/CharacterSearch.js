import React, { useState, useRef } from 'react';
import { getCharacterId, getCharacterBasicInfo } from '../api/nexonApi';
import axios from 'axios';
import domtoimage from 'dom-to-image';

const CharacterSearch = () => {
  const [characterName, setCharacterName] = useState('');
  const [characterInfo, setCharacterInfo] = useState(null);
  const [error, setError] = useState('');
  const [memo, setMemo] = useState('');
  const captureRef = useRef(null); // 캡처 영역에 대한 ref
  const DEPLOY_PROXY_URL = process.env.REACT_APP_PROXY_URL;

  const handleSearch = async () => {
    try {
      const characterData = await getCharacterId(characterName);
      if (characterData && characterData.ocid) {
        const basicInfo = await getCharacterBasicInfo(characterData.ocid);
        setCharacterInfo(basicInfo);
        setError('');
      } else {
        setError('캐릭터를 찾을 수 없습니다.');
      }
    } catch (e) {
      setError('API 요청 중 오류가 발생했습니다.');
    }
  };

  const handleSaveImage = async () => {
    if (!characterInfo) return;

    try {
      // 1. 프록시 서버를 통해 캐릭터 이미지 URL 가져오기
      const characterImageUrl = await getImageFromProxy(
        characterInfo.character_image,
      );

      // 2. 이미지 교체
      const imgElement = captureRef.current.querySelector('img');
      if (imgElement) {
        imgElement.src = characterImageUrl; // 이미지 교체
      }

      // 3. dom-to-image로 캡처 후 다운로드
      domtoimage
        .toPng(captureRef.current, { useCORS: true }) // useCORS 설정을 true로 설정
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = `${characterInfo.character_name}_memo.png`;
          link.click();
        })
        .catch((error) => {
          console.error('이미지 저장 중 오류:', error);
        });
    } catch (error) {
      console.error('이미지 가져오기 중 오류:', error);
    }
  };

  // 프록시 서버를 통해 이미지 가져오는 함수
  const getImageFromProxy = async (imageUrl) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/character-image?url=${imageUrl}`, // 로컬 프록시 서버
        // `${DEPLOY_PROXY_URL}/api/character-image?url=${imageUrl}`, // 배포 프록시 서버
        {
          responseType: 'blob',
        },
      );
      return URL.createObjectURL(response.data); // Blob을 URL로 변환
    } catch (error) {
      console.error('이미지 불러오기 오류:', error);
      return imageUrl; // 기본 이미지를 반환할 수 있음
    }
  };

  return (
    <div className="main_wrap">
      <div className="header_wrap title">
        {/* <a href="https://test-memozi.netlify.app" className="header_title">
          memozi
        </a> */}
        {/*prettier-ignore*/}
        <a href="http://localhost:3000" className="header_title">
        memozi<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" id="Interface-Essential-Message--Streamline-Pixel" height="45" width="45"><desc>Interface Essential Message Streamline Icon: https://streamlinehq.com</desc><title>interface-essential-message</title><g><path d="M41.78671875 11.784375h2.1375v17.1421875h-2.1375Z" fill="#ffffff" stroke-width="1"></path><path d="M39.64921875 28.9265625h2.1375v2.1375h-2.1375Z" fill="#ffffff" stroke-width="1"></path><path d="M39.64921875 9.646875h2.1375v2.1375h-2.1375Z" fill="#ffffff" stroke-width="1"></path><path d="M37.49765625 31.0640625h2.1515625v2.1515625h-2.1515625Z" fill="#ffffff" stroke-width="1"></path><path d="M37.49765625 7.4953125h2.1515625v2.1515625h-2.1515625Z" fill="#ffffff" stroke-width="1"></path><path d="M35.36015625 33.215625h2.1375v2.1375h-2.1375Z" fill="#ffffff" stroke-width="1"></path><path d="M35.36015625 5.3578125h2.1375v2.1375h-2.1375Z" fill="#ffffff" stroke-width="1"></path><path d="M33.20859375 35.353125h2.1515625v2.1375h-2.1515625Z" fill="#ffffff" stroke-width="1"></path><path d="M31.07109375 18.2109375h4.2890625V22.5h-4.2890625Z" fill="#ffffff" stroke-width="1"></path><path d="M31.07109375 3.20625h4.2890625v2.1515625h-4.2890625Z" fill="#ffffff" stroke-width="1"></path><path d="M28.93359375 37.490625h4.275v2.1515625h-4.275Z" fill="#ffffff" stroke-width="1"></path><path d="M24.644531249999996 39.6421875h4.2890625v2.1375h-4.2890625Z" fill="#ffffff" stroke-width="1"></path><path d="m9.63984375 41.7796875 0 -2.1375 -2.1375 0 0 2.1375 -2.1375 0 0 2.1515625 19.2796875 0 0 -2.1515625 -15.0046875 0z" fill="#ffffff" stroke-width="1"></path><path d="M20.35546875 18.2109375h4.2890625V22.5h-4.2890625Z" fill="#ffffff" stroke-width="1"></path><path d="M16.06640625 1.06875h15.0046875v2.1375h-15.0046875Z" fill="#ffffff" stroke-width="1"></path><path d="M11.79140625 3.20625h4.275v2.1515625h-4.275Z" fill="#ffffff" stroke-width="1"></path><path d="m11.79140625 37.490625 2.1375 0 0 -2.1375 -4.2890625 0 0 4.2890625 2.1515625 0 0 -2.1515625z" fill="#ffffff" stroke-width="1"></path><path d="M9.63984375 18.2109375h4.2890625V22.5h-4.2890625Z" fill="#ffffff" stroke-width="1"></path><path d="M7.50234375 5.3578125h4.2890625v2.1375h-4.2890625Z" fill="#ffffff" stroke-width="1"></path><path d="M7.50234375 33.215625h2.1375v2.1375h-2.1375Z" fill="#ffffff" stroke-width="1"></path><path d="M5.36484375 31.0640625h2.1375v2.1515625h-2.1375Z" fill="#ffffff" stroke-width="1"></path><path d="M5.36484375 7.4953125h2.1375v2.1515625h-2.1375Z" fill="#ffffff" stroke-width="1"></path><path d="M3.21328125 28.9265625h2.1515625v2.1375h-2.1515625Z" fill="#ffffff" stroke-width="1"></path><path d="M3.21328125 9.646875h2.1515625v2.1375h-2.1515625Z" fill="#ffffff" stroke-width="1"></path><path d="M1.07578125 11.784375h2.1375v17.1421875H1.07578125Z" fill="#ffffff" stroke-width="1"></path></g></svg>
        </a>
      </div>
      <div className="nes-field search_area ">
        <input
          className="nes-input search_input "
          type="text"
          placeholder="캐릭터 이름으로 검색하세요 : )"
          value={characterName}
          onChange={(e) => setCharacterName(e.target.value)}
        />
        <button className="nes-btn search_btn" onClick={handleSearch}>
          search
        </button>
      </div>
      {error && (
        <p className="nes-text is-error error_msg" style={{ color: '#db5656' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-0.5 -0.5 30 30"
            id="Interface-Essential-Alert-Circle-2--Streamline-Pixel"
            height="30"
            width="30"
          >
            <desc>
              Interface Essential Alert Circle 2 Streamline Icon:
              https://streamlinehq.com
            </desc>
            <title>interface-essential-alert-circle-2</title>
            <g>
              <path
                d="M27.6225 11.0471875H29v6.905625h-1.3775Z"
                fill="#db5656"
                stroke-width="1"
              ></path>
              <path
                d="M26.2359375 17.9528125h1.3865625v2.7640624999999996h-1.3865625Z"
                fill="#db5656"
                stroke-width="1"
              ></path>
              <path
                d="M26.2359375 8.283125h1.3865625v2.7640624999999996h-1.3865625Z"
                fill="#db5656"
                stroke-width="1"
              ></path>
              <path
                d="M24.8584375 20.716874999999998h1.3775v2.755h-1.3775Z"
                fill="#db5656"
                stroke-width="1"
              ></path>
              <path
                d="M24.8584375 5.5190624999999995h1.3775v2.7640624999999996h-1.3775Z"
                fill="#db5656"
                stroke-width="1"
              ></path>
              <path
                d="M23.471874999999997 23.471874999999997h1.3865625v1.3865625H23.471874999999997Z"
                fill="#db5656"
                stroke-width="1"
              ></path>
              <path
                d="M23.471874999999997 4.1415625h1.3865625v1.3775H23.471874999999997Z"
                fill="#db5656"
                stroke-width="1"
              ></path>
              <path
                d="M20.716874999999998 24.8584375h2.755v1.3775h-2.755Z"
                fill="#db5656"
                stroke-width="1"
              ></path>
              <path
                d="M20.716874999999998 2.7640624999999996h2.755v1.3775h-2.755Z"
                fill="#db5656"
                stroke-width="1"
              ></path>
              <path
                d="M17.9528125 26.2359375h2.7640624999999996v1.3865625h-2.7640624999999996Z"
                fill="#db5656"
                stroke-width="1"
              ></path>
              <path
                d="M17.9528125 1.3775h2.7640624999999996v1.3865625h-2.7640624999999996Z"
                fill="#db5656"
                stroke-width="1"
              ></path>
              <path
                d="M11.0471875 27.6225h6.905625V29h-6.905625Z"
                fill="#db5656"
                stroke-width="1"
              ></path>
              <path
                d="m16.5753125 17.9528125 -4.150625 0 0 1.3775 -1.3775 0 0 4.1415625 1.3775 0 0 1.3865625 4.150625 0 0 -1.3865625 1.3775 0 0 -4.1415625 -1.3775 0 0 -1.3775z"
                fill="#db5656"
                stroke-width="1"
              ></path>
              <path
                d="m16.5753125 4.1415625 -4.150625 0 0 1.3775 -1.3775 0 0 8.2921875 1.3775 0 0 2.7640624999999996 4.150625 0 0 -2.7640624999999996 1.3775 0 0 -8.2921875 -1.3775 0 0 -1.3775z"
                fill="#db5656"
                stroke-width="1"
              ></path>
              <path
                d="M11.0471875 0h6.905625v1.3775h-6.905625Z"
                fill="#db5656"
                stroke-width="1"
              ></path>
              <path
                d="M8.283125 26.2359375h2.7640624999999996v1.3865625H8.283125Z"
                fill="#db5656"
                stroke-width="1"
              ></path>
              <path
                d="M8.283125 1.3775h2.7640624999999996v1.3865625H8.283125Z"
                fill="#db5656"
                stroke-width="1"
              ></path>
              <path
                d="M5.5190624999999995 24.8584375h2.7640624999999996v1.3775H5.5190624999999995Z"
                fill="#db5656"
                stroke-width="1"
              ></path>
              <path
                d="M5.5190624999999995 2.7640624999999996h2.7640624999999996v1.3775H5.5190624999999995Z"
                fill="#db5656"
                stroke-width="1"
              ></path>
              <path
                d="M4.1415625 23.471874999999997h1.3775v1.3865625H4.1415625Z"
                fill="#db5656"
                stroke-width="1"
              ></path>
              <path
                d="M4.1415625 4.1415625h1.3775v1.3775H4.1415625Z"
                fill="#db5656"
                stroke-width="1"
              ></path>
              <path
                d="M2.7640624999999996 20.716874999999998h1.3775v2.755H2.7640624999999996Z"
                fill="#db5656"
                stroke-width="1"
              ></path>
              <path
                d="M2.7640624999999996 5.5190624999999995h1.3775v2.7640624999999996H2.7640624999999996Z"
                fill="#db5656"
                stroke-width="1"
              ></path>
              <path
                d="M1.3775 17.9528125h1.3865625v2.7640624999999996H1.3775Z"
                fill="#db5656"
                stroke-width="1"
              ></path>
              <path
                d="M1.3775 8.283125h1.3865625v2.7640624999999996H1.3775Z"
                fill="#db5656"
                stroke-width="1"
              ></path>
              <path
                d="M0 11.0471875h1.3775v6.905625H0Z"
                fill="#db5656"
                stroke-width="1"
              ></path>
            </g>
          </svg>
          {error}
        </p>
      )}
      {characterInfo && (
        <div className="result_area lists">
          <div className="list_wrap">
            <ul className="nes-list is-circle text_list">
              <span className="result_title">result</span>
              <li>월드: {characterInfo.world_name}</li>
              <li>레벨: {characterInfo.character_level}</li>
              <li>직업: {characterInfo.character_class}</li>
            </ul>
          </div>
          <div className="capture_area">
            <div className="capture_wrap">
              <div id="capture" ref={captureRef}>
                <div className="memo_balloon">
                  <textarea
                    className="memo_input"
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    placeholder="메모를 작성하세요 !"
                  />
                </div>
                <img
                  src={characterInfo.character_image}
                  alt="캐릭터"
                  className="char_img"
                />
                <span className="char_name">
                  {characterInfo.character_name}
                </span>
              </div>
            </div>
          </div>
          <div className="btn_area">
            <button className="save_btn btn" onClick={handleSaveImage}>
              save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterSearch;
