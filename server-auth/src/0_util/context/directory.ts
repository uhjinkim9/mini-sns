/****************
 * 경로 관련 함수
 ****************/

import {resolve} from "path";

const __pwdPath = process.cwd();

/**
 * 최상위 루트 경로 가리키는 함수자만 현재 앱 경로를 가리키고 있음
 */
export function getRootDir(): string {
	return resolve("..", __pwdPath);
}

/**
 * 현재 앱 루트 경로 가리키는 함수
 */
export function getAppRootDir(): string {
	return resolve("..", __pwdPath, "server-auth");
}

console.log(getRootDir());
console.log(getAppRootDir());
