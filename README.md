# 📄 memozi

메이플스토리 캐릭터 정보를 조회하고 메모와 함께 이미지를 저장할 수 있는 웹사이트
입니다.

## 사용 기술 스택

Frontend:

- create-react-app (5.0.1): 프로젝트 초기 설정
- React (18.3.1): 사용자 인터페이스 구축
- axios: API 요청 및 데이터 통신
- dom-to-image: DOM 요소를 이미지로 변환해 다운로드
- nes.css: UI 스타일링

API:

- Nexon Open API: 메이플스토리 캐릭터 정보 조회

## 프록시 서버

- [memozi_proxy_server](https://github.com/hhhyeon97/memozi_proxy_server): CORS
  문제 해결을 위한 프록시 서버 구현

## 구현 기능

- Nexon API를 이용한 메이플스토리 캐릭터 OCID 조회
- 캐릭터 기본 정보 조회 (레벨, 직업, 월드)
- 메모 작성 및 이미지 내 메모 저장
- 캐릭터와 메모를 포함한 이미지 파일 (PNG) 다운로드
