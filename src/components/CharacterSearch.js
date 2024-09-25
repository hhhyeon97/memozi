import React, { useState } from 'react';
import { getCharacterId, getCharacterBasicInfo } from '../api/nexonApi';
import axios from 'axios';
import '../App.css';
import domtoimage from 'dom-to-image';

const CharacterSearch = () => {
  const [characterName, setCharacterName] = useState('');
  const [characterInfo, setCharacterInfo] = useState(null);
  const [error, setError] = useState('');
  const [memo, setMemo] = useState('');

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
    const captureElement = document.getElementById('capture');

    if (!characterInfo) return; // characterInfo가 없으면 종료

    try {
      // 1. 프록시 서버를 통해 캐릭터 이미지 URL 가져오기
      const characterImageUrl = await getImageFromProxy(
        characterInfo.character_image,
      );

      // 2. 이미지 교체
      const imgElement = document.querySelector('#capture img');
      if (imgElement) {
        imgElement.src = characterImageUrl; // 이미지 교체
      }

      // 3. dom-to-image로 캡처 후 다운로드
      domtoimage
        .toPng(captureElement)
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
      <h1>memozi</h1>
      <div className="search_area">
        <input
          className="search_input"
          type="text"
          placeholder="캐릭터 이름을 입력하세요."
          value={characterName}
          onChange={(e) => setCharacterName(e.target.value)}
        />
        <button onClick={handleSearch}>검색</button>
      </div>
      {error && <p style={{ color: '#db5656' }}>{error}</p>}
      {characterInfo && (
        <div className="result_area">
          <p>월드: {characterInfo.world_name}</p>
          <p>레벨: {characterInfo.character_level}</p>
          <p>직업: {characterInfo.character_class}</p>
          <div className="capture_area">
            <div id="capture">
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
