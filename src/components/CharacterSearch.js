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
    <div className="main_wrap">
      <div className="header_wrap">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 36 36"
          id="Content-Files-Folder-Open--Streamline-Pixel"
          height="36"
          width="36"
        >
          <desc>
            Content Files Folder Open Streamline Icon: https://streamlinehq.com
          </desc>
          <title>content-files-folder-open</title>
          <g>
            <path
              d="m34.281 3.425625 -1.71 0 0 -1.71 -1.71 0 0 -1.72125 -24.0075 0 0 13.725 -5.14125 0 0 1.71 8.5725 0 0 -1.71 -1.71 0 0 -12.00375 18.855 0 0 6.85125 6.85125 0 0 17.145 -1.71 0 0 3.43125 1.71 0 0 5.14125 1.72125 0 0 -29.1375 -1.72125 0 0 -1.72125z"
              fill="#d3682a"
              stroke-width="2"
            ></path>
            <path
              d="M8.57475 34.284375000000004h25.70625v1.71H8.57475Z"
              fill="#d3682a"
              stroke-width="2"
            ></path>
            <path
              d="M30.860999999999997 22.280625h1.71v3.43125h-1.71Z"
              fill="#d3682a"
              stroke-width="2"
            ></path>
            <path
              d="M29.13975 18.860625h1.72125v3.42h-1.72125Z"
              fill="#d3682a"
              stroke-width="2"
            ></path>
            <path
              d="M12.006 17.139375h17.13375v1.72125h-17.13375Z"
              fill="#d3682a"
              stroke-width="2"
            ></path>
            <path
              d="M22.288500000000003 8.566875h1.71v1.72125h-1.71Z"
              fill="#d3682a"
              stroke-width="2"
            ></path>
            <path
              d="M17.14725 11.998124999999998h5.14125v1.72125h-5.14125Z"
              fill="#d3682a"
              stroke-width="2"
            ></path>
            <path
              d="M15.426 8.566875h1.72125v1.72125h-1.72125Z"
              fill="#d3682a"
              stroke-width="2"
            ></path>
            <path
              d="M10.284749999999999 15.429375h1.72125v1.71h-1.72125Z"
              fill="#d3682a"
              stroke-width="2"
            ></path>
            <path
              d="M6.8534999999999995 30.853125000000002h1.72125v3.43125h-1.72125Z"
              fill="#d3682a"
              stroke-width="2"
            ></path>
            <path
              d="M5.1435 27.433125h1.71v3.42h-1.71Z"
              fill="#d3682a"
              stroke-width="2"
            ></path>
            <path
              d="M3.4335 24.001875000000002h1.71v3.43125h-1.71Z"
              fill="#d3682a"
              stroke-width="2"
            ></path>
            <path
              d="M1.71225 20.570625h1.72125v3.43125h-1.72125Z"
              fill="#d3682a"
              stroke-width="2"
            ></path>
            <path
              d="M0.0022500000000000003 15.429375h1.71v5.14125H0.0022500000000000003Z"
              fill="#d3682a"
              stroke-width="2"
            ></path>
          </g>
        </svg>
        <h1 class="title">memozi</h1>
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
          {error}
        </p>
      )}
      {characterInfo && (
        <div className="result_area lists">
          <ul class="nes-list is-disc">
            <li>월드: {characterInfo.world_name}</li>
            <li>레벨: {characterInfo.character_level}</li>
            <li>직업: {characterInfo.character_class}</li>
          </ul>
          <div className="capture_area">
            <div id="capture" ref={captureRef}>
              {/* <div id="capture"> */}
              <input
                className="memo_input"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="메모를 작성하세요 !"
              />
              <img src={characterInfo.character_image} alt="캐릭터" />
              <span id="char_name">{characterInfo.character_name}</span>
            </div>
          </div>
          <div className="btn_area">
            <button className="save_btn" onClick={handleSaveImage}>
              이미지 저장
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterSearch;
