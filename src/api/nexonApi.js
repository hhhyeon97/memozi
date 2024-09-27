import axios from 'axios';

const DEPLOY_PROXY_URL = process.env.REACT_APP_PROXY_URL;

// 캐릭터 식별자 조회 함수
export const getCharacterId = async (characterName) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/character/id/${characterName}`,
      // `${DEPLOY_PROXY_URL}/api/character/id/${characterName}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching character ID:', error);
    return null;
  }
};

// 캐릭터 기본 정보 조회 함수
export const getCharacterBasicInfo = async (ocid) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/character/basic/${ocid}`,
      // `${DEPLOY_PROXY_URL}/api/character/basic/${ocid}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching character basic info:', error);
    return null;
  }
};
