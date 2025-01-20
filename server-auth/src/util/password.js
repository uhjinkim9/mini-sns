import {scrypt, randomBytes} from "crypto";
import {promisify} from "util";

const scryptAsync = promisify(scrypt);

export class Password {
	// 회원가입: 비밀번호 해시화 + 솔트
	static async toHash(password) {
		const salt = randomBytes(8).toString("hex");
		const buf = await scryptAsync(password, salt, 64);

		return `${buf.toString("hex")}.${salt}`;
	}

	// 로그인: 비밀번호 검증
	static async compare(storedPassword, suppliedPassword) {
		const [hashedPassword, salt] = storedPassword.split(".");
		const buf = await scryptAsync(suppliedPassword, salt, 64);

		return buf.toString("hex") === hashedPassword;
	}
}
