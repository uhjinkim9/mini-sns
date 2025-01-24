/**
 * 서버 실행 모듈
 * node로 실행하는 파일
 */

import http from "http";

import app from "./app.js";
import sequelize from "./database/database.js";

// Models
import Page from "./model/page.js";

const server = http.createServer(app);

sequelize
	// .sync({force: true}) // WARNING: DB Reset
	.sync()
	.then(() => {
		return Page.findAll();
	})
	.then(() => {
		server.listen(5003, () => {
			console.log("the server is running on 5003");
		});
	})
	.catch((err) => {
		console.log(err);
	});
