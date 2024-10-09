# 🧍‍♂️ memozi

메이플스토리 캐릭터 정보를 조회하고 메모와 함께 이미지를 저장할 수 있는 짤 저장 웹사이트입니다.

## 사용 기술 스택

<b>Frontend:</b>

- create-react-app (5.0.1): 프로젝트 초기 설정
- React (18.3.1): 사용자 인터페이스 구축
- axios: API 요청 및 데이터 통신
- dom-to-image: DOM 요소를 이미지로 변환해 다운로드
- nes.css: UI 스타일링

<b>API:</b>

- Nexon Open API: 메이플스토리 캐릭터 정보 조회

## 프록시 서버

- [memozi_proxy_server](https://github.com/hhhyeon97/memozi_proxy_server): CORS
  문제 해결을 위한 프록시 서버 구현

## 구현 기능

- Nexon API를 이용한 메이플스토리 캐릭터 OCID 조회
- 캐릭터 기본 정보 조회 (레벨, 직업, 월드, 캐릭터명, 이미지 등)
- 메모 작성 및 이미지 파일 (PNG) 다운로드

## 업데이트

- `24.09.26` 배포 완료
- `24.10.10` 검색창 보완
  - 공백 유효성 추가, 엔터키 검색 가능, 검색 후 인풋박스 초기화
