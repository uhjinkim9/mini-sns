/**
 * 서버 실행 모듈
 * node로 실행하는 파일
 */

import http from "http";

import app from "./app.js";
import sequelize from "./database/database.js";

// Models
import User from "./model/user.js";

const server = http.createServer(app);

sequelize
	// .sync({force: true}) // DB 초기화 시에만
	.sync()
	.then(() => {
		return User.findOne({
			where: {
				userId: "admin",
			},
		});
	})
	.then(() => {
		server.listen(5002, () => {
			console.log("the server is running on 5002");
		});
	})
	.catch((err) => {
		console.log(err);
	});
