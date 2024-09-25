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
        .toPng(captureRef.current)
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
        `http://localhost:5000/api/character-image?url=${imageUrl}`,
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
    <div className="main_wrap nes-container with-title is-centered">
      <div className="header_wrap title">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 40 40"
          id="Content-Files-Folder-Open--Streamline-Pixel"
          height="40"
          width="40"
        >
          <desc>
            Content Files Folder Open Streamline Icon: https://streamlinehq.com
          </desc>
          <title>content-files-folder-open</title>
          <g>
            <path
              d="m38.09 3.80625 -1.9 0 0 -1.9 -1.9 0 0 -1.9125 -26.675 0 0 15.25 -5.7125 0 0 1.9 9.525 0 0 -1.9 -1.9 0 0 -13.3375 20.950000000000003 0 0 7.6125 7.6125 0 0 19.05 -1.9 0 0 3.8125 1.9 0 0 5.7125 1.9125 0 0 -32.375 -1.9125 0 0 -1.9125z"
              fill="#000000"
              strokeWidth="1"
            ></path>
            <path
              d="M9.5275 38.09375h28.5625v1.9H9.5275Z"
              fill="#000000"
              strokeWidth="1"
            ></path>
            <path
              d="M34.29 24.75625h1.9v3.8125h-1.9Z"
              fill="#000000"
              strokeWidth="1"
            ></path>
            <path
              d="M32.3775 20.95625h1.9125v3.8h-1.9125Z"
              fill="#000000"
              strokeWidth="1"
            ></path>
            <path
              d="M13.34 19.04375h19.0375v1.9125h-19.0375Z"
              fill="#000000"
              strokeWidth="1"
            ></path>
            <path
              d="M24.765 9.51875h1.9v1.9125h-1.9Z"
              fill="#000000"
              strokeWidth="1"
            ></path>
            <path
              d="M19.052500000000002 13.331249999999999h5.7125v1.9125h-5.7125Z"
              fill="#000000"
              strokeWidth="1"
            ></path>
            <path
              d="M17.14 9.51875h1.9125v1.9125h-1.9125Z"
              fill="#000000"
              strokeWidth="1"
            ></path>
            <path
              d="M11.427499999999998 17.14375h1.9125v1.9h-1.9125Z"
              fill="#000000"
              strokeWidth="1"
            ></path>
            <path
              d="M7.614999999999999 34.28125h1.9125v3.8125h-1.9125Z"
              fill="#000000"
              strokeWidth="1"
            ></path>
            <path
              d="M5.715 30.481250000000003h1.9v3.8h-1.9Z"
              fill="#000000"
              strokeWidth="1"
            ></path>
            <path
              d="M3.815 26.668750000000003h1.9v3.8125h-1.9Z"
              fill="#000000"
              strokeWidth="1"
            ></path>
            <path
              d="M1.9025 22.85625h1.9125v3.8125h-1.9125Z"
              fill="#000000"
              strokeWidth="1"
            ></path>
            <path
              d="M0.0025 17.14375h1.9v5.7125H0.0025Z"
              fill="#000000"
              strokeWidth="1"
            ></path>
          </g>
        </svg>
        <a href="http://localhost:3000" className="header_title">
          memozi
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
          검색
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
          <ul className="nes-list is-disc">
            <span className="result_title">result</span>
            <li>월드: {characterInfo.world_name}</li>
            <li>레벨: {characterInfo.character_level}</li>
            <li>직업: {characterInfo.character_class}</li>
          </ul>
          <div className="capture_area">
            <div class="nes-container with-title is-centered">
              <p class="title">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-0.5 -0.5 30 30"
                  id="Interface-Essential-Pin--Streamline-Pixel"
                  height="30"
                  width="30"
                >
                  <desc>
                    Interface Essential Pin Streamline Icon:
                    https://streamlinehq.com
                  </desc>
                  <title>interface-essential-pin</title>
                  <g>
                    <path
                      d="M26.92921875 7.594375h1.3775v2.7640624999999996h-1.3775Z"
                      fill="#000000"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M25.55171875 6.216875h1.3775v1.3775h-1.3775Z"
                      fill="#000000"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M24.16515625 10.358437499999999h2.7640624999999996v1.3775h-2.7640624999999996Z"
                      fill="#000000"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M24.16515625 4.8303125h1.3865625v1.3865625h-1.3865625Z"
                      fill="#000000"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M22.78765625 8.971875h1.3775v1.3865625h-1.3775Z"
                      fill="#000000"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M22.78765625 3.4528125h1.3775v1.3775h-1.3775Z"
                      fill="#000000"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M21.401093749999998 10.358437499999999h1.3865625v1.3775h-1.3865625Z"
                      fill="#000000"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M21.401093749999998 7.594375h1.3865625V8.971875h-1.3865625Z"
                      fill="#000000"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M21.401093749999998 2.0662499999999997h1.3865625v1.3865625h-1.3865625Z"
                      fill="#000000"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M20.02359375 15.8775h1.3775v4.1415625h-1.3775Z"
                      fill="#000000"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M20.02359375 11.735937499999999h1.3775v1.3775h-1.3775Z"
                      fill="#000000"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M20.02359375 6.216875h1.3775v1.3775h-1.3775Z"
                      fill="#000000"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M18.64609375 0.68875h2.755v1.3775h-2.755Z"
                      fill="#000000"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M18.64609375 20.0190625h1.3775v2.7640624999999996h-1.3775Z"
                      fill="#000000"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M18.64609375 13.1134375h1.3775v2.7640624999999996h-1.3775Z"
                      fill="#000000"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M18.64609375 4.8303125h1.3775v1.3865625h-1.3775Z"
                      fill="#000000"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M17.259531250000002 22.783125000000002h1.3865625v1.3775h-1.3865625Z"
                      fill="#000000"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M17.259531250000002 6.216875h1.3865625v1.3775h-1.3865625Z"
                      fill="#000000"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M17.259531250000002 2.0662499999999997h1.3865625v2.7640624999999996h-1.3865625Z"
                      fill="#000000"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M15.882031249999999 14.5h1.3775v1.3775h-1.3775Z"
                      fill="#000000"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M15.882031249999999 7.594375h1.3775V8.971875h-1.3775Z"
                      fill="#000000"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M14.50453125 24.160625h2.755v1.3865625h-2.755Z"
                      fill="#000000"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M14.50453125 13.1134375h1.3775V14.5h-1.3775Z"
                      fill="#000000"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M13.11796875 22.783125000000002h1.3865625v1.3775h-1.3865625Z"
                      fill="#000000"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M13.11796875 11.735937499999999h1.3865625v1.3775h-1.3865625Z"
                      fill="#000000"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M13.11796875 8.971875h2.7640624999999996v1.3865625h-2.7640624999999996Z"
                      fill="#000000"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M11.74046875 21.405625h1.3775v1.3775h-1.3775Z"
                      fill="#000000"
                      stroke-width="1"
                    ></path>
                    <path
                      d="m3.45734375 26.9246875 1.3775 0 0 -1.3775 1.3775 0 0 -1.3865625 1.3865625 0 0 -1.3775 1.3775 0 0 -1.3775 2.7640624999999996 0 0 -1.3865625 -1.3865625 0 0 -1.3775 -1.3775 0 0 -1.3775 -1.3775 0 0 2.755 -1.3865625 0 0 1.3865625 -1.3775 0 0 1.3775 -1.3775 0 0 1.3775 -1.3865625 0 0 1.3865625 -1.3775 0 0 2.7640624999999996 2.7640624999999996 0 0 -1.3865625z"
                      fill="#000000"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M8.97640625 7.594375h4.1415625V8.971875h-4.1415625Z"
                      fill="#000000"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M6.2123437500000005 8.971875h2.7640624999999996v1.3865625h-2.7640624999999996Z"
                      fill="#000000"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M6.2123437500000005 15.8775h1.3865625v1.3865625h-1.3865625Z"
                      fill="#000000"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M4.83484375 14.5h1.3775v1.3775h-1.3775Z"
                      fill="#000000"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M4.83484375 10.358437499999999h1.3775v1.3775h-1.3775Z"
                      fill="#000000"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M3.45734375 11.735937499999999h1.3775V14.5h-1.3775Z"
                      fill="#000000"
                      stroke-width="1"
                    ></path>
                  </g>
                </svg>
              </p>
              <div id="capture" ref={captureRef}>
                <div className="nes-balloon from-right memo_balloon">
                  <input
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
                <div className="nes-badge char_name">
                  <span className="is-dark">
                    {characterInfo.character_name}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="btn_area">
            <button className="save_btn nes-btn" onClick={handleSaveImage}>
              이미지 저장
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterSearch;
