/**
 * 서버 실행 모듈
 * node로 실행하는 파일
 */

import http from "http";

import app from "./app.js";
import sequelize from "../database/database.js";

const server = http.createServer(app);

sequelize
	// .sync({ force: true })
	.sync()
	//   .then(result => {
	//     return User.findById(1);
	//     // console.log(result);
	//   })
	//   .then(user => {
	//     if (!user) {
	//       return User.create({ name: 'Max', email: 'test@test.com' });
	//     }
	//     return user;
	//   })
	//   .then(user => {
	//     // console.log(user);
	//     return user.createCart();
	//   })
	.then(() => {
		server.listen(3001, () => {
			console.log("the server is running on 3001");
		});
	})
	.catch((err) => {
		console.log(err);
	});
