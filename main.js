const port = 80,
  // 애플리케이션에 express 모듈 추가
  express = require("express"),
  // app에 express 웹 서버 애플리케이션 할당
  // -> 내장 웹 서버 기능 포함
  app = express();
// Router-level middleware: express.Router()의 객체에 연결되는 미들웨어
const router = express.Router();

// 한 경로에 GET에 대한 route가 여러 개 등록된 경우
// -> 다음 route로 넘어가기
app.get(
  `/user/:id`,
  (req, res, next) => {
    // user ID가 0인 경우 다음 route로 넘어가기
    if (req.params.id === `0`) next(`route`);
    // 아니라면 다음 미들웨어에 넘겨줌
    else next();
  },
  (req, res, next) => {
    // send a regular response
    res.send(`regular`);
  }
);

// handler for the /user/:id path, which sends a special response
app.get(`/user/:id`, (req, res, next) => {
  res.send(`special`);
});

// 여러 미들웨어 이어서 정의
// next()는 다음 callback 함수 호출
app.use(
  "/user/:id",
  (req, res, next) => {
    console.log(`Request URL:`, req.originalUrl);
    next();
  },
  (req, res, next) => {
    console.log(`Request Type:`, req.method);
    next();
  }
);

// 홈페이지에 GET 라우트 셋팅
// -> 별도의 다른 모듈 없이 GET 라우트 정의 방법 제공함
app
  .get("/", (req, res) => {
    console.log(req.params);
    console.log(req.body);
    console.log(req.url);
    console.log(req.query);
    // 서버에서 클라이언트로의 응답 발행
    // -> http 모듈의 write와 비슷한 역할을 수행
    // (send는 보냄과 동시에 end까지 처리함, write는 end 반드시 필요(요청 처리 X))
    res.send("Hello, Universe!");
  })
  // 80번 포트로 요청 수신 대기 상태 설정
  .listen(port, () => {
    // 연결 되었을 때
    console.log(
      `The Express.js server hs started and is listening on port number: ${port}`
    );
  });
