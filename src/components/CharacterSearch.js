import React, { useState } from 'react';
import { getCharacterId, getCharacterBasicInfo } from '../api/nexonApi';

const CharacterSearch = () => {
  const [characterName, setCharacterName] = useState('');
  const [characterInfo, setCharacterInfo] = useState(null);
  const [error, setError] = useState('');
  const [memo, setMemo] = useState(''); // 메모 상태 추가

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

  return (
    <div>
      <h1>메이플 캐릭터 조회</h1>
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
          <h2>{characterInfo.character_name}</h2>
          <p>레벨: {characterInfo.character_level}</p>
          <p>직업: {characterInfo.character_class}</p>
          <img src={characterInfo.character_image} alt="캐릭터" />

          {/* 메모 입력란 */}
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="메모를 작성하세요"
          />
        </div>
      )}
    </div>
  );
};

export default CharacterSearch;
