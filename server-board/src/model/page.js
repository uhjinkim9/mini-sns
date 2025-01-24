import Sequelize from "sequelize"; // 라이브러리
import sequelize from "../database/database.js"; // DB 연결

const Page = sequelize.define(
  "page",
  {
    idx: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      comment: "Page Index",
    },
    pageGroup: {
      type: Sequelize.STRING(50),
      allowNull: false,
      comment: "페이지 폴더명: 소문자로 시작",
    },
    pageNm: {
      type: Sequelize.STRING(100),
      allowNull: false,
      comment: "페이지명: 대문자로 시작, 함수명 일치",
    },
    creator: {
      type: Sequelize.STRING(50),
      comment: "페이지 생성한 유저 아이디",
    },
  },
  {
    comment: "페이지 라우팅 정보",
    timestamps: true,
  }
);

export default Page;
