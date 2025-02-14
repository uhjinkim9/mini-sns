/****************
 * ��� ���� �Լ�
 ****************/

import {resolve} from "path";

const __pwdPath = process.cwd();

/**
 * �ֻ��� ��Ʈ ��� ����Ű�� �Լ��ڸ� ���� �� ��θ� ����Ű�� ����
 */
export function getRootDir(): string {
	return resolve("..", __pwdPath);
}

/**
 * ���� �� ��Ʈ ��� ����Ű�� �Լ�
 */
export function getAppRootDir(): string {
	return resolve("..", __pwdPath, "server-auth");
}

console.log(getRootDir());
console.log(getAppRootDir());
