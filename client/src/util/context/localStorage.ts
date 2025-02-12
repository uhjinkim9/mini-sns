/***************************************************
 * 로컬스토리지에 객체를 저장, 조회, 삭제하는 함수
 * 객체를 포함한 어느 데이터든 저장 가능
 ***************************************************/

/**
 * 객체 저장 (set)
 * @param key 저장할 데이터의 키
 * @param value 저장할 데이터의 값
 */
export function setItem(key: string, value: any): void {
	try {
		const jsonValue = JSON.stringify(value);
		localStorage.setItem(key, jsonValue);
	} catch (error) {
		console.error("로컬스토리지 저장 오류:", error);
	}
}

/**
 * 객체 조회 (get)
 * T: 제네릭, 불러올 데이터의 타입
 * @param key 불러올 데이터의 키
 * @returns 저장된 데이터
 */
export function getItem<T>(key: string): T | null {
	try {
		const value = localStorage.getItem(key);
		return value ? JSON.parse(value) : null;
	} catch (error) {
		console.error("로컬스토리지 조회 오류:", error);
		return null;
	}
}

/**
 * 특정 키 삭제 (remove)
 * @param key 키
 */
export function removeItem(key: string): void {
	localStorage.removeItem(key);
}

/**
 * 모든 데이터 삭제
 */
export function clearAll(): void {
	localStorage.clear();
}
