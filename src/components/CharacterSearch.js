import React, { useState } from 'react';
import { getCharacterId, getCharacterBasicInfo } from '../api/nexonApi';
import html2canvas from 'html2canvas';
import axios from 'axios';
import '../App.css';

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

  //   const handleSaveImage = () => {
  //     const captureElement = document.getElementById('capture');
  //     html2canvas(captureElement).then((canvas) => {
  //       const link = document.createElement('a');
  //       link.href = canvas.toDataURL('image/png');
  //       link.download = `${characterName}_memo.png`;
  //       link.click();
  //     });
  //   };
  // 프록시 서버를 통해 캐릭터 이미지 불러오기
  const getImageFromProxy = async (imageUrl) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/character-image?url=${imageUrl}`,
        {
          responseType: 'blob',
        },
      );
      return URL.createObjectURL(response.data);
    } catch (error) {
      console.error('이미지 불러오기 오류:', error);
      return imageUrl; // 기본 이미지를 반환할 수 있음
    }
  };

  const handleSaveImage = async () => {
    const captureElement = document.getElementById('capture');

    // 캐릭터 이미지를 프록시 서버를 통해 불러오기
    if (characterInfo) {
      const characterImageUrl = await getImageFromProxy(
        characterInfo.character_image,
      );
      const imgElement = new Image();
      imgElement.src = characterImageUrl;

      imgElement.onload = async () => {
        captureElement.appendChild(imgElement);
        html2canvas(captureElement).then((canvas) => {
          const link = document.createElement('a');
          link.href = canvas.toDataURL('image/png');
          link.download = `${characterName}_memo.png`;
          link.click();
          // 이미지 요소 제거
          captureElement.removeChild(imgElement);
        });
      };
    }
  };

  return (
    <div className="main_wrap">
      <h1>memozi</h1>
      <input
        type="text"
        placeholder="캐릭터 이름을 입력하세요"
        value={characterName}
        onChange={(e) => setCharacterName(e.target.value)}
      />
      <button onClick={handleSearch}>검색</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {characterInfo && (
        <div>
          <div id="capture">
            <p>월드: {characterInfo.world_name}</p>
            <p>레벨: {characterInfo.character_level}</p>
            <p>직업: {characterInfo.character_class}</p>
            <img src={characterInfo.character_image} alt="캐릭터" />
            <span id="char_name">{characterInfo.character_name}</span>
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="메모를 작성하세요"
            />
          </div>
          <button onClick={handleSaveImage}>이미지 저장</button>
        </div>
      )}
    </div>
  );
};

export default CharacterSearch;
