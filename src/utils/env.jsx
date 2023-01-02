export function getApiURL() {
	if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname === "") {
		return "http://localhost:5000/";
	}
	return "https://api." + window.location.hostname.replace("www.", "") + "/";
}

export function getPrivateAppURL() {
	if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname === "") {
		return "http://localhost:3001/";
	}
	return "https://community." + window.location.hostname.replace("www.", "") + "/";
}

export function getLhcAppURL() {
	if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname === "") {
		return "http://localhost:3007/";
	}
	if (window.location.hostname.includes("test.")) {
		return "https://test.lhc.lu/";
	}
	return "https://lhc.lu/";
}

export function isInternetExplorer() {
	const ua = window.navigator.userAgent;
	const msie = ua.indexOf("MSIE ");

	return msie > 0 || !!navigator.userAgent.match(/Trident.*rv:11\./);
}
