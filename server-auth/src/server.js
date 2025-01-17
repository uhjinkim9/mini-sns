/**
 * 서버 실행 모듈
 * node로 실행하는 파일
 */

import http from "http";

import app from "./app.js";
import sequelize from "../database/database.js";

// Models
import User from "../model/user.js";

const server = http.createServer(app);

sequelize
	// .sync({force: true})
	.sync()
	.then((result) => {
		return User.findOne({
			where: {
				userId: "admin",
			},
		});
	})
	.then((user) => {
		if (!user) {
			return User.create({
				companyId: "1000",
				userId: "admin",
				userNm: "admin",
				email: "ejkim@u-cube.kr",
			});
		}
		return user;
	})
	.then(() => {
		server.listen(5002, () => {
			console.log("the server is running on 5002");
		});
	})
	.catch((err) => {
		console.log(err);
	});