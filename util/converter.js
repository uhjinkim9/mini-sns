/**
 * @param {string} strDate 단위 시각 문자열(1y, 1d, 1h, 1m, 1s)
 * @constant {string} lastChar 단위(y, d, h, m, s)
 * @constant {string} timeChar 시간간
 * @return {Date} 변환된 시간
 */
// export function strTimeToSec(strTime) {
// 	const lastChar = strTime.slice(-1);
// 	const timeChar = parseInt(strTime.slice(0, -1), 10);
// 	const now = new Date();
// 	switch (lastChar) {
// 		case 'y': // 연 단위
// 		timeChar * 12 * 30 * 
// 			break;
	
// 		default:
// 			break;
// 	}
// return lastChar;
// }