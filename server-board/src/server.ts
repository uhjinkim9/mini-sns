/************************
 * 서버 실행 모듈
 * 'node'로 실행하는 파일
 ************************/

import http from "http";

import sequelize from "./0. util/database/database";
import app from "./app";

// 모델 Import해야 DB에서 테이블 생성 수행
import Page from "./4. model/page";
import BoardContent from "./4. model/boardContent";

const server = http.createServer(app);

sequelize
	.sync()
	// .sync({force: true}) // WARNING: DB Reset
	// .then(() => {
	// 	return Page.bulkCreate([
	// 		{
	// 			pageGroup: "main",
	// 			pageNm: "Main",
	// 			creator: "admin",
	// 		},
	// 		{
	// 			pageGroup: "board",
	// 			pageNm: "Board",
	// 			creator: "admin",
	// 		},
	// 	]);
	// })
	// .then(() => {
	// 	return Page.findAll();
	// })
	.then(() => {
		server.listen(5003, () => {
			console.log("the board server is running on 5002");
		});
	})
	.catch((err: any) => {
		console.log(err);
	});
