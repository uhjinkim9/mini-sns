/***************************************************
 * 저장소에 객체를 저장, 조회, 삭제하는 함수
 * 객체를 포함한 어느 데이터든 저장 가능
 *
 * 종류: 로컬 스토리지, 세션 스토리지, 쿠키
 ***************************************************/

/*******************
 * 로컬 스토리지 함수
 *******************/

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
 * 쿠키 스토리지 함수
 *******************/

export const CookieStorage = {
	/**
	 * 쿠키 저장
	 * <예시>
	 * const expires = new Date(Date.now() + 60 * 30 * 1000); // 30분 후 만료
	 * CookieStorage.setItem("accessToken", 액세스 토큰 값, expires);
	 * @param key 저장할 쿠키 키
	 * @param value 저장할 값
	 * @param expires 만료 시간(Date 객체)
	 * @param path 적용 경로(기본값: "/"), 쿠키에 접근 가능한 폴더
	 */
	setItem: (
		key: string,
		value: string,
		expires: Date,
		path: string = "/"
	): void => {
		document.cookie = `${key}=${encodeURIComponent(
			value
		)}; expires=${expires.toUTCString()}; path=${path}`;
	},

	/**
	 * 쿠키 조회
	 * @param key 불러올 쿠키의 키
	 * @returns 쿠키 값 (없으면 null)
	 */
	getItem: (key: string): string | null => {
		const cookies = document.cookie
			.split("; ")
			// Record<string, string>: TS에서 문자열 키와 문자열 값을 가지는 객체
			.reduce((acc: Record<string, string>, cookie) => {
				const [cookieKey, cookieValue] = cookie.split("=");
				acc[cookieKey] = decodeURIComponent(cookieValue);
				return acc;
			}, {});

		return cookies[key] || null;
	},

	/**
	 * 특정 쿠키 삭제
	 * @param key 삭제할 쿠키 키
	 * @param expires 만료 시간(Date 객체, 기본값 0이어서 명시하지 않아도 삭제 가능)
	 * @param path 삭제할 경로(기본값: "/")
	 */
	removeItem: (
		key: string,
		path: string = "/",
		expires: Date = new Date(0)
	): void => {
		document.cookie = `${key}=; expires=${expires.toUTCString()}; path=${path}`;
	},

	/**
	 * 모든 쿠키 삭제
	 */
	clearAll: (): void => {
		document.cookie.split(";").forEach((cookie) => {
			const key = cookie.split("=")[0].trim();
			document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
		});
	},
};
