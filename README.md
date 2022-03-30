# 오늘은 여기까지 (That's it for today)

배포 URL: [https://that-is-it-for-today.com](https://that-is-it-for-today.com)

프로젝트 기간: 2022.2.20 ~ 2022.3.13 (기획 1주, 개발 2주)

`Description`

'바쁘다 바빠 현대사회'에서 다시 오지 않을 매일의 모습을 영상에 담아 gif 파일과 함께 업로드하고 녹화영상들을 VOD 스트리밍으로 시청할 수 있는 웹 서비스입니다.

<br>

![Gif 스크롤](https://that-is-it-for-today.s3.ap-northeast-2.amazonaws.com/GIF_SCROLL.png)

<details>
<summary>이미지 살펴보기</summary>

![메인화면](<https://that-is-it-for-today.s3.ap-northeast-2.amazonaws.com/MAIN+(2).png>)

메인 랜딩페이지입니다.

![녹화](https://that-is-it-for-today.s3.ap-northeast-2.amazonaws.com/RECORDER.png)
녹화페이지입니다. 런타임을 확인하며 영상을 녹화합니다.

![변환](https://that-is-it-for-today.s3.ap-northeast-2.amazonaws.com/GIF_CONVERT.png)
녹화 완료버튼을 누르면 웹 어셈블리를 통해 브라우저상에서 녹화된 영상 파일을 Gif 파일로 변환합니다.
![미리보기](https://that-is-it-for-today.s3.ap-northeast-2.amazonaws.com/GIF_CONVERTED.jpg)
사용자는 변환된 Gif 파일을 녹화영상 미리보기 이미지로서 확인할 수 있습니다. 사용자는 해당 영상을 업로드하거나 재녹화 할 수 있습니다.

![Gif 스크롤](https://that-is-it-for-today.s3.ap-northeast-2.amazonaws.com/GIF_SCROLL.png)
내 영상보기 페이지입니다. 사용자가 업로드한 영상들의 리스트를 Gif 이미지로 보여주고 스크롤을 통해 확인할 수 있습니다. Gif 이미지를 클릭 시 해당 영상을 VOD 스트리밍으로 시청할 수 있습니다.

![스트리밍](https://that-is-it-for-today.s3.ap-northeast-2.amazonaws.com/DetailPage.jpg)
영상 디테일 페이지입니다. 해당 영상파일(.mp4)과 Gif 파일을 로컬 다운로드 할 수 있고 영상을 삭제할 수 있습니다.

</details>

<br>

`Motivation`

지나고 보면 시간이 정말 빠르다고 느끼는 때가 많습니다. 현재의 모습을 영상으로 기록하고 이후에 확인할 수 있다면 잊어버리기 쉬운 감정과 기억들을 더 잘 회상할 수 있을 것 같다는 생각으로 영상기록 서비스를 기획하였습니다.

매일 바뀌는 모습으로 살아가는 영화 “뷰티인사이드”의 주인공이 자신의 모습을 기억하기 위해 녹화 하는 모습이 인상 깊어 주인공의 대사를 프로젝트 이름으로 반영했습니다. 영화 "인터스텔라"의 주인공이 과거의 자신과 마주하는 다차원의 공간을 배경으로 표현하였습니다.

<br>

## Features

---

### **영상 녹화, 웹 어셈블리를 사용한 video.mp4 -> image.gif 파일변환**

- 웹캠을 이용한 영상 녹화
- 웹 어셈블리(ffmpeg.wasm)를 통한 브라우저상에서의 녹화 영상 Gif 파일 변환(video.mp4 -> image.gif)
- 녹화 영상 파일, Gif 파일 로컬 다운로드 기능

### **AWS VOD 스트리밍 서비스**

- AWS S3, Lambda, Elemental MediaConvert, CloudFront를 사용하여 VOD 스트리밍 서비스 구축
- AWS S3(소스용 버킷) 파일 업로드 -> AWS Lambda, Elemental MediaConvert을 통한 스트리밍용 파일 변환 작업(.mp4 -> hls 파일) -> AWS S3(스트리밍용 버킷) 업로드 -> AWS CloudFront 배포 통한 cdn 구축

### **Gif 스크롤 애니메이션**

- 움직이는 3D 씬을 배경으로 한 Gif 스크롤 애니메이션

### **Firebase authentication + jwt**

- Firebase authentication 구글 로그인
- JSON Web Token Authentication

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

// command for window OS
$ npm run server-window

// command for Mac OS
$ npm run server-mac
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
- Amazon S3, Amazon API Gateway

### **BackEnd**

- Node.js
- Express
- MongoDB, mongoose
- Amazon S3, AWS Lambda, AWS Elemental MediaConvert, AWS CloudFront
- jwt

### **Deployment**

- Client: Netlify
- Server: AWS Elastic Beanstalk

<br>

## Challenges

---

### **1. cross-origin-isolated page... 그리고 서버 사이드 랜더링**

gif 파일변환 작업방식을 놓고 고민하다 웹 어셈블리를 사용하여 클라이언트 브라우저상에서 변환 작업을 할 수 있도록 구현했습니다. 그 이유는 크게 두 가지 입니다.

- 파일의 용량이 대체로 큰 영상들을 다룬다는 점을 고려할 때, Node.js 운영서버에서 buffer와 stream을 사용하여 gif 파일변환 작업을 진행하도록 구현한다면 운영서버의 메모리 사용량이 지나치게 많아지는 부담이 있기 때문입니다. 이는 좋지 않은 사용자 경험으로 연결될 뿐 아니라 서버운영 비용에도 부담을 줄 수 있다고 판단했습니다.
- 웹 어셈블리를 사용하면 low-level 언어로 작성된 프로그램(이 프로젝트에서는 FFmpeg 라이브러리)을 웹 브라우저에서 바로 실행함으로써 높은 퍼포먼스를 경험할 수 가져올 수 있을 뿐 아니라 서버와의 통신도 최소화할 수 있기 때문에 장점이 크다고 판단했습니다.

웹 어셈블리를 사용할 시 높은 퍼포먼스를 가져올 수 있는 큰 이유는 SharedArrayBuffer 데이터 형태를 사용하기 때문입니다. 기본적으로 대부분의 브라우저에서 보안상의 이유로 사용 설정이 막혀있기 때문에 COOP(cross-origin-opener-policy)와 COEP(cross-origin-embeder-policy) 값을 응답 헤더에 설정해줌으로써 웹 페이지를 사용할 수 있는 환경인 cross-origin-isolated page로 만들어 주었습니다.

💥Firebase authenticaion 로그인 이슈..!

cross-origin-isolated page 설정의 영향으로 Firebase authentication 구글 로그인 서비스 요청이 Block 되는 이슈가 발생했습니다. 이는 CORP(cross-origin-resource-policy) 값을 해당 서버 응답 헤더에 설정함으로써 해결할 수 있는데 현재 Firebase authentication 서비스상에서는 응답 헤더 값을 따로 설정할 수 없기 때문에 해당 로그인 기능을 위해 서버 사이드 랜더링을 통해 새로운 웹 페이지를 랜더링함으로써 이슈를 해결하였습니다.

웹 어셈블리를 사용하며 만난 이슈들로 처음엔 당황하였지만 이를 계기로 다소 생소했던 개념들에 대해 조사하고 해결하는 과정이 흥미로웠습니다. 또한 새로운 기술스택을 사용할 시, 더욱 충분한 사전조사를 통해 미래의 나 자신이 덜 고통받도록(?) 해야겠다는 교훈을 얻었습니다.

<br>

### **2. VOD 스트리밍 서비스?**

처음 서비스 기획 단계에서는 스트리밍으로 영상을 확인할 수 있도록 만들어야 겠다는 생각은 없었습니다. 그러나 개발 단계에서 기능을 만들어가면서 그냥 단순히 녹화한 mp4 영상파일을 로드하여 사용자가 시청하는 방식의 웹 서비스는 비효율적이고 불편한 유저경험을 제공하게 된다는 문제점을 인식하게 되었습니다. 스트리밍 방식으로 본인의 영상을 확인할 수 있도록 만드는 것이 훨씬 더 신속하고 유연한 유저경험을 제공하는 장점이 있다고 판단하였습니다.

AWS에서 제공하는 서비스들을 이용하여 스트리밍 서비스를 구현할 수 있도록 구조와 흐름을 이해하는데 시간을 추가적으로 들여야 했고 이는 개발 일정이 조금씩 딜레이 되도록 만든 요소이기도 했습니다. 덕분에 조급한 마음으로 부담이 생기기도 했지만, 개발하며 발견하게 된 문제점을 인식하고 해결할 수 있는 방법을 찾아 조사하고 구현했다는 뿌듯한 경험을 할 수 있었습니다.

<br>
