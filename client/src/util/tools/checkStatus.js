export function isNotEmpty(thing) {
	if (thing !== null && thing !== undefined) {
		if (Array.isArray(thing)) return thing.length > 0;
		if (typeof thing === "string") return thing.trim().length > 0;
		if (typeof thing === "object") return Object.keys(thing).length > 0;
		return true;
	}
	return false;
}

export function isEmpty(thing) {
	return !isNotEmpty(thing);
}

const checkStatus = {isNotEmpty, isEmpty};
export default checkStatus;
