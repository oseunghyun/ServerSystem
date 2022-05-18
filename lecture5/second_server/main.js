// 이벤트 리스너를 추가한 간단한 웹서버
const port = 80,
  http = require("http"),
  httpStatus = require("http-status-codes"),
  app = http.createServer();

const getJSONString = (obj) => {
  return JSON.stringify(obj, null, 2);
};

app.on("request", (req, res) => {
  // console.log(req.method); // 사용된 HTTP 메소드(GET, POST)
  // console.log(req.url); // 요청 URL
  // console.log(Req.headers); // 요청 헤더

  console.log(`Method: ${getJSONString(req.method)}`);
  console.log(`URL: ${getJSONString(req.url)}`);
  console.log(`Headers: ${getJSONString(req.headers)}`);

  var body = [];

  // 데이터를 수신했을 때 호출될 콜백 함수 등록
  req.on("data", (bodyData) => {
    body.push(bodyData);
  });

  //데이터 전송이 완료될 때 호출될 콜백 함수 등록
  req.on("end", () => {
    body = Buffer.concat(body).toString();
    console.log(`Request Body Contents: ${body} `);
  });

  res.writeHead(httpStatus.OK, {
    "Content-Tpye": "text/html",
  });

  let responseMessage = "<h1>This will show on the screen.</h1>";
  res.end(responseMessage);
});

// 80번 포트를 수신하도록 설정
app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);
