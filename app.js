const http = require("http");

const server = http.createServer();

const users = [
  {
    id: 1,
    name: "Rebekah Johnson",
    email: "Glover12345@gmail.com",
    password: "123qwe",
  },
  {
    id: 2,
    name: "Fabian Predovic",
    email: "Connell29@gmail.com",
    password: "password",
  },
];

const posts = [
  {
    id: 1,
    title: "간단한 HTTP API 개발 시작!",
    content: "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.",
    userId: 1,
  },
  {
    id: 2,
    title: "HTTP의 특성",
    content: "Request/Response와 Stateless!!",
    userId: 1,
  },
];

const httpRequestListner = function (request, response) {
  const { url, method } = request;

  if (method === "GET") {
    if (url === "/ping") {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: "pong" }));
    }
  } else if (method === "POST") {
    if (url === "/users/signup") {
      let body = "";

      request.on("data", (data) => {
        body += data;
      });

      request.on("end", () => {
        const user = JSON.parse(body);

        users.push({
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
        });
        // response.end("ok");
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ users: users }));
      });
    }
  }
};

server.on("request", httpRequestListner); //서버 객체를 이벤트에 연결!! 위 함수만 쓰면 함수를 실행시킬 수 없어 그렇기에 이걸써야해!
// 'request'라는 이벤트가 들어오게 되면 뒤에 함수를 실행해라! 모든 클라이언트의 요청은 request로 들어오게된다.
const IP = "127.0.0.1";
const PORT = 8003;

server.listen(PORT, IP, function () {
  console.log(`Listening to request on IP ${IP} & port ${PORT}`);
});
