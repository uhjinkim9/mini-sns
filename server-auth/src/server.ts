/************************
 * 서버 실행 모듈
 * 'node'로 실행하는 파일
 ************************/

import http from "http";
import path from "path";

import sequelize from "./0_util/database/database";
import app from "./app";

// 모델 Import해야 DB에서 테이블 생성 수행
import User from "./4_model/user";
import UserToken from "./4_model/userToken";

const server = http.createServer(app);

sequelize
  .sync()
  //   .sync({ force: true }) // WARNING: DB Reset
  //   .then(() => {
  //     return User.create({
  //       companyId: "1000",
  //       userId: "admin",
  //       userNm: "admin",
  //       userPw:
  //         "fa2acea7fcc04ddefab39415ced36e02b73f30352e74dad8ab0307c88e9d0c38ccdbaab168d7681b41148685778327d7a7481e733ab89730d9db0ca4b0fb5556.7a1d6daf2d937965",
  //     });
  //   })
  .then(() => {
    server.listen(5002, () => {
      console.log("the auth server is running on 5002");
    });
  })
  .catch((err: any) => {
    console.log(err);
  });
