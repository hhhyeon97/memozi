import axios from 'axios';

// // API 기본 설정
// const API_BASE_URL = 'https://open.api.nexon.com/maplestory/v1';
// const API_KEY = process.env.REACT_APP_NEXON_API_KEY;

// // 캐릭터 식별자 조회 함수
// export const getCharacterId = async (characterName) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/id`, {
//       params: { character_name: characterName },
//       headers: {
//         'x-nxopen-api-key': API_KEY,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching character ID:', error);
//     return null;
//   }
// };

// // 캐릭터 기본 정보 조회 함수
// export const getCharacterBasicInfo = async (ocid) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/character/basic`, {
//       params: { ocid },
//       headers: {
//         'x-nxopen-api-key': API_KEY,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching character basic info:', error);
//     return null;
//   }
// };

// 캐릭터 식별자 조회 함수
export const getCharacterId = async (characterName) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/character/id/${characterName}`,
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
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching character basic info:', error);
    return null;
  }
};
