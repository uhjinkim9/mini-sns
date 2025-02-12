/****************
 * ��� ���� �Լ�
 ****************/

import {resolve} from "path";

const __pwdPath = resolve(); // C:\ucubeDev\workspace\mini-sns

/**
 * �ֻ��� ��Ʈ ��� ����Ű�� �Լ�
 */
export function getRootDir(): string {
	return resolve(__pwdPath);
}

/**
 * ���� �� ��Ʈ ��� ����Ű�� �Լ�
 */
export function getAppRootDir(): string {
	return resolve(__pwdPath, "server-auth");
}
