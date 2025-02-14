/***************************************************
 * 저장소에 객체를 저장, 조회, 삭제하는 함수
 * 객체를 포함한 어느 데이터든 저장 가능
 *
 * 종류: 로컬 스토리지, 세션 스토리지, 쿠키
 ***************************************************/

/*******************
 * 로컬 스토리지 함수
 *******************/

// 같은 스토리지 함수끼리 객체로 묶어서 수정하기

export const LocalStorage = {
	/**
	 * 객체 저장
	 * @param key 저장할 데이터의 키
	 * @param value 저장할 데이터의 값
	 */
	setItem: (key: string, value: any): void => {
		try {
			const jsonValue = JSON.stringify(value);
			localStorage.setItem(key, jsonValue);
		} catch (error) {
			console.error("로컬스토리지 저장 오류:", error);
		}
	},

	/**
	 * 객체 조회
	 * T: 제네릭, 불러올 데이터의 타입
	 * @param key 불러올 데이터의 키
	 * @returns 저장된 데이터
	 */
	getItem: <T>(key: string): T | null => {
		try {
			const value = localStorage.getItem(key);
			return value ? JSON.parse(value) : null;
		} catch (error) {
			console.error("로컬스토리지 조회 오류:", error);
			return null;
		}
	},

	/**
	 * 특정 키 삭제
	 * @param key 키
	 */
	removeItem: (key: string): void => {
		localStorage.removeItem(key);
	},

	/**
	 * 모든 데이터 삭제
	 */
	clearAll: (): void => {
		localStorage.clear();
	},
};

/*******************
 * 세션 스토리지 함수
 *******************/

export const SessionStorage = {
	/**
	 * 모든 데이터 삭제
	 */
	clearAll: (): void => {
		sessionStorage.clear();
	},
};

/*******************
 * 쿠키 함수
 *******************/

export const Cookies = {
	/**
	 * 모든 데이터 삭제
	 */
	clearAll: (): void => {
		document.cookie.split(";").forEach((c) => {
			document.cookie = c
				.replace(/^ +/, "")
				.replace(
					/=.*/,
					"=;expires=" + new Date().toUTCString() + ";path=/"
				);
		});
	},
};
