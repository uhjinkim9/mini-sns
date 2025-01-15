/**
 *  서버 실행 모듈
 */

import http from "http";
import app from "./app.js";

const server = http.createServer(app);

server.listen(3001, () => {
	console.log("the server is running on 3001");
});
