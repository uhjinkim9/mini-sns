/**
 * 서버 실행 모듈
 * node로 실행하는 파일
 */

import http from "http";

import app from "./app.js";
import sequelize from "./database/database.js";

import User from "./model/user.js";

const server = http.createServer(app);

sequelize
	.sync({force: true})
	.then(() => {
		return User.create({
			companyId: 1000,
			userId: "admin",
			userNm: "admin",
			userPw: "1234",
		});
	}) // WARNING: DB Reset
	// .sync()
	.then(() => {
		server.listen(5002, () => {
			console.log("the server is running on 5002");
		});
	})
	.catch((err) => {
		console.log(err);
	});
