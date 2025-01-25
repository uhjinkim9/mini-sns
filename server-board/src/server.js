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
  .sync()
  // .sync({ force: true }) // WARNING: DB Reset
  // .then(() => {
  //   return Page.bulkCreate([
  //     {
  //       pageGroup: "main",
  //       pageNm: "Main",
  //       creator: "admin",
  //     },
  //     {
  //       pageGroup: "board",
  //       pageNm: "Board",
  //       creator: "admin",
  //     },
  //   ]);
  // })
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
