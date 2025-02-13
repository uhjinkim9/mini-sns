/*******************************
 * 비었는지 아닌지 확인하는 함수
 *******************************/

export function isNotEmpty(thing: any): boolean {
	if (thing !== null && thing !== undefined) {
		if (Array.isArray(thing)) return thing.length > 0;
		if (typeof thing === "string") return thing.trim().length > 0;
		if (typeof thing === "object") return Object.keys(thing).length > 0;
		return true;
	}
	return false;
}

export function isEmpty(thing: any): boolean {
	return !isNotEmpty(thing);
}
