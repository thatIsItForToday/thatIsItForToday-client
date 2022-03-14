# 오늘은 여기까지 (That's it for today)

[https://that-is-it-for-today.com](https://that-is-it-for-today.com)

개발기간: 2022.2.27 ~ 2022.3.13

`Description`

'바쁘다 바빠 현대사회'에서 다시 오지 않을 매일의 모습을 영상에 담아 gif와 함께 기록하고 VOD 스트리밍 영상으로 확인할 수 있는 웹 서비스입니다.

<br>

![Gif 스크롤](https://that-is-it-for-today.s3.ap-northeast-2.amazonaws.com/GIF_SCROLL.png)

<details>
<summary>이미지 살펴보기</summary>

![메인화면](<https://that-is-it-for-today.s3.ap-northeast-2.amazonaws.com/MAIN+(2).png>)

![녹화](https://that-is-it-for-today.s3.ap-northeast-2.amazonaws.com/RECORDER.png)

![변환](https://that-is-it-for-today.s3.ap-northeast-2.amazonaws.com/GIF_CONVERT.png)

![Gif 스크롤](https://that-is-it-for-today.s3.ap-northeast-2.amazonaws.com/GIF_SCROLL.png)

![스트리밍](https://that-is-it-for-today.s3.ap-northeast-2.amazonaws.com/STREAMING.png)

</details>

<br>

`Motivation`

지나고 보면 시간이 정말 빠르다고 느끼는 때가 많습니다. 현재의 모습을 영상으로 기록하고 이후에 확인할 수 있다면 잊어버리기 쉬운 감정과 기억들을 더 잘 회상할 수 있을 것 같다는 생각으로 영상기록 서비스를 기획하였습니다.

매일 바뀌는 모습으로 살아가는 영화 “뷰티인사이드”의 주인공이 자신의 모습을 기억하기 위해 녹화 하는 모습이 인상 깊어 주인공의 대사를 프로젝트 이름으로 반영했습니다. 영화 "인터스텔라"의 주인공이 과거의 자신과 마주하는 다차원의 공간을 배경으로 표현하였습니다.

<br>

## Features

---

### **영상 녹화, video.mp4 -> image.gif 파일변환**

- 웹캠을 이용한 영상 녹화
- 웹 어셈블리(ffmpeg.wasm)를 통한 녹화 영상 Gif 파일 변환(video.mp4 -> image.gif)
- 녹화된 영상 파일, 변환된 Gif 파일 로컬 다운로드

### **AWS VOD 스트리밍**

- AWS S3, Lambda, Element Media Convert, CloudFront를 통한 VOD 스트리밍
- AWS S3(소스용 버킷) 파일 업로드 -> AWS Lambda, Element Media Convert을 통한 스트리밍용 파일로 변환 작업(.mp4 -> hls 파일) -> AWS S3(스트리밍용 버킷) -> AWS CloudFront 배포(cdn)
- 업로드 완료 이후 사용자는 VOD 스트리밍로 본인의 영상 시청

### **Gif 스크롤 애니메이션 캐러셀**

- 움직이는 3D 씬을 배경으로 Gif 애니메이션 캐러셀

### **Firebase authentication + jwt**

- Firebase authentication 구글 로그인
- JSON Web Token Authentication 활용

<br>

## Installation

---

### **Client**

```
$ git clone https://github.com/thatIsItForToday/thatIsItForToday-client.git
$ cd that-is-it-for-today-client

$ npm install

$ npm start
```

### **Server**

```
$ git clone https://github.com/thatIsItForToday/thatIsItForToday-server.git
$ cd that-is-it-for-today-server

$ npm install

$ npm run server-window   // command for window OS
$ npm run server-mac      // command for Mac OS
```

<br>

## Tech Stack

---

### **FrontEnd**

- React
- Redux-Toolkit
- ffmpeg.wasm
- three.js
- Firebase authentication + jwt
- AWS S3, preSignedURL

### **BackEnd**

- Node.js
- Express
- MongoDB, mongoose
- AWS S3, Lambda, Element Media Convert, CloudFront
- jwt

### **Deployment**

- Netlify
- AWS Elastic Beanstalk

<br>

## Challenges

---

- cross-origin-isolated page: gif 파일 변환을 위한 방식을 고민하다 웹어셈블리 모듈을 사용하였습니다. 그 이유는 클라이언트 측에서 파일 변환 작업을 바로 할 수 있을 뿐 아니라 브라우저 상에서 low-level 언어처럼 작업을 진행할 수 있어 높은 퍼포먼스를 보여주는 것으로 확인했기 때문입니다. 파일의 크기가 대체적으로 클 수 밖에 없는 동영상을 다룬다는 점을 고려할 때 운영서버에서 nodejs를 사용하여 buffer와 stream을 사용하여 변환시킨다면 운영서버의 메모리 사용량에 무리가 갈 것으로 판단하였습니다. 그러나 이러한 높은 퍼포먼스를 가져오기 위해서는 브라우저 상에서 보안상의 이유로 기본적으로 사용불가 하도록 설정되어 있는 SharedArrayBuffer를 사용할 수 있도록 클라이언트 측에서 COOP, COEP 값을 헤더설정 해주어야 했습니다. 이로 인해 로컬환경에서는 괜찮았지만 배포 단계 이후 firebase authentication 로그인 요청이 block 되면서 CORP 설정에 어려움이 발생했습니다. 동영상을 다루며 다소 생소한 개념들에 대해 공부하게 되어 흥미로웠지만 웹어셈블리를 사용하게 된다면 사전에 고려해야 할 부분으로 사전에 조사가 부족했던 탓으로 고생을 많이 했습니다. 조사를 더욱 충분히 해야겠다는 교훈을 얻었습니다.

<br>

- AWS VOD: 처음 서비스를 기획하는 단계에서는 스트리밍으로 영상을 확인할 수 있도록 만들어야 겠다는 생각은 없었습니다. 그러나 기능을 만들어가면서 만약 사용자가 스트리밍 방식으로 본인의 영상을 확인 할 수 있도록 만드는 것이 데이터 절약, 보다 나은 유저경험 등 여러 면에서 이점을 가져올 수 있다는 생각이 들었습니다. 그래서 1주차인 기획 및 기술 검증기간이 아니라 2-3주차인 실제 개발 단계에서 조금 더 조사하는데 시간을 들여야 했고 이는 태스크 일정을 제 때 마무리 해야한다는 점을 고려하며 조급한 마음과 부담으로 다가왔었습니다. 기획 단계에서 조금 더 효율적이고 유저의 입장에서 장점으로 다가올 수 있는 부분에 대해 더 깊이 고민해야겠다는 교훈을 얻었습니다. 또한 아직 많은 부분이 부족하지만, 개발하며 발견하게 된 문제를 해결할 수 있는 방법에 대해 스스로 조사하고 구현하는데에 성공했다는 기쁜 경험을 가질 수 있어서 좋았습니다.

<br>
