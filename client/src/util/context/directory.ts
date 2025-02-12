/****************
 * 경로 관련 함수
 ****************/

import {resolve} from "path";

const __pwdPath = resolve(); // C:\ucubeDev\workspace\mini-sns

/**
 * 최상위 루트 경로 가리키는 함수
 */
export function getRootDir(): string {
	return resolve(__pwdPath);
}

/**
 * 현재 앱 루트 경로 가리키는 함수
 */
export function getAppRootDir(): string {
	return resolve(__pwdPath, "client");
}
