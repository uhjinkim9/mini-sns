import Sequelize, { DataTypes } from "sequelize"; // 라이브러리
import sequelize from "../database/database.js"; // DB 연결

const User = sequelize.define(
  "user",
  {
    companyId: {
      type: Sequelize.STRING(20),
      allowNull: false,
      comment: "회사 ID",
    },
    userId: {
      type: Sequelize.STRING(20),
      allowNull: false,
      primaryKey: true,
      comment: "사용자 ID",
    },
    userNm: {
      type: Sequelize.STRING(50),
      allowNull: false,
      comment: "사용자 이름",
    },
    userPw: {
      type: Sequelize.STRING(50),
      defaultValue: null,
      comment: "사용자 비밀번호",
    },
    empNo: {
      type: Sequelize.STRING(20),
      defaultValue: null,
      comment: "사용자 사번",
    },
    useYn: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      comment: "계정 사용 여부: 1. true / 0. false",
    },
    userType: {
      type: Sequelize.STRING(1),
      defaultValue: "3",
      comment: "사용자 유형(기능 개방 범위): 1. 개발자 / 2. 관리자 / 3. 사용자",
    },
    userRole: {
      type: Sequelize.STRING(20),
      defaultValue: "ROLE002",
      comment:
        "사용자 역할(기능 개방 범위 내에서 권한 부여): ROLE001.관리자 / ROLE002.사용자",
    },
    restrictYn: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      comment: "관리자에 의해 사용 제한",
    },
    loginFailCount: {
      type: Sequelize.INTEGER(11),
      defaultValue: 0,
      comment: "로그인 실패 횟수",
    },
    refreshToken: {
      type: Sequelize.STRING(500),
      defaultValue: null,
      comment: "사용자 토큰",
    },
    email: {
      type: Sequelize.STRING(100),
      defaultValue: null,
      comment: "내부 이메일",
    },
    extEmail: {
      type: Sequelize.STRING(100),
      defaultValue: null,
      comment: "외부 이메일",
    },
    mailYn: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      comment: "안내 메일 수신 여부",
    },
    createUser: {
      type: Sequelize.STRING(20),
      defaultValue: null,
      comment: "등록자",
    },
    updateUser: {
      type: Sequelize.STRING(20),
      defaultValue: null,
      comment: "변경자",
    },
  },
  {
    comment: "그룹웨어 사용자",
    timezone: "+09:00", // 한국 시간대 설정
  }
);

export default User;
