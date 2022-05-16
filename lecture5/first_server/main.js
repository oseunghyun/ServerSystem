// 애플리케이션 작성
// - 웹 서버에서 사용할 포트번호 지정

// const로 port, http, httpStatus, app 다 선언한거라 한 줄임
const port = 80,
  // 외부 모듈 불러옴
  http = require("http"),
  httpStatus = require("http-status-codes"),
  // request, response를 매개변수로 가지고 createServer를 만들고 있음
  // createServer의 매개변수는 콜백함수임 => 아래 내용
  // createServer를 통해 만들어진 app이라는 서버는 request가 올 때마다
  // 안 쪽의 코드를 실행하게 된다.
  app = http.createServer((request, response) => {
    console.log("Received an incoming request!");
    // response의 헤더 부분 작성(기본 속성 정의)
    // httpStatus.OK == 200
    response.writeHead(httpStatus.OK, {
      "Content-Type": "text/html",
    });

    let responseMessage = "<h1>Hello, Universe!</h1>";
    // 헤더부분 이외의 내용 작성
    response.write(responseMessage);
    // 응답을 end를 해야지만 연결이 종료됨
    response.end();
    console.log(`Sent a response : ${responseMessage}`);
  });

// 80번 포트를 수신하도록 설정
app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);
