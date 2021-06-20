export function parseQueryString(query: string): {[key: string]: any} {
	let vars = query.split('&');
	let queryString = {};
	for (let i = 0; i < vars.length; i++) {
		let pair = vars[i].split('=');
		let key = decodeURIComponent(pair[0]);
		let value = decodeURIComponent(pair[1]);
		// If first entry with this name
		if (typeof queryString[key] === 'undefined') {
			queryString[key] = decodeURIComponent(value);
			// If second entry with this name
		} else if (typeof queryString[key] === 'string') {
			let arr = [queryString[key], decodeURIComponent(value)];
			queryString[key] = arr;
			// If third or later entry with this name
		} else {
			queryString[key].push(decodeURIComponent(value));
		}
	}

	return queryString;
}
