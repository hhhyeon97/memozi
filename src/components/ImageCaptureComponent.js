import React, { useRef } from 'react';
import domtoimage from 'dom-to-image';

const ImageCaptureComponent = () => {
  const captureRef = useRef();
  const downloadLinkRef = useRef();

  const handleCapture = () => {
    const node = captureRef.current;

    domtoimage
      .toPng(node)
      .then((dataUrl) => {
        // Base64로 변환된 이미지 URL을 받음
        console.log('Base64 image data: ', dataUrl);

        // 1. 프록시 서버로 Base64 이미지 데이터 전송
        fetch('http://localhost:5000/api/upload-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: dataUrl }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Image uploaded successfully: ', data);
          })
          .catch((error) => {
            console.error('Error uploading image: ', error);
          });

        // 2. 다운로드 링크를 갱신하고 클릭하여 이미지 다운로드 처리
        const downloadLink = downloadLinkRef.current;
        downloadLink.href = dataUrl;
        downloadLink.download = 'captured-image.png'; // 다운로드할 파일명 지정
        downloadLink.click(); // 클릭 이벤트로 다운로드 실행
      })
      .catch((error) => {
        console.error('Error converting to image: ', error);
      });
  };

  return (
    <div>
      <div
        ref={captureRef}
        style={{ width: 200, height: 200, backgroundColor: 'lightblue' }}
      >
        <h2>Hello World!</h2>
      </div>
      <button onClick={handleCapture}>Capture & Upload & Download</button>
      {/* 다운로드 링크 추가 */}
      <a ref={downloadLinkRef} style={{ display: 'none' }}>
        Download
      </a>
    </div>
  );
};

export default ImageCaptureComponent;
