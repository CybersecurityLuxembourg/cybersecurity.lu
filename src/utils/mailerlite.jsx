export default function getMailerliteFunction() {
	/* eslint-disable */
	(function(m, a, i, l, e, r) {
		m["MailerLiteObject"] = e;
		function f(){
			const c = {
				a: arguments,
				q: []
			};

			const r = this.push(c);
			return "number" !== typeof r ? r : f.bind(c.q);
		}
		f.q = f.q || [];
		m[e] = m[e] || f.bind(f.q);
		m[e].q = m[e].q || f.q;
		r = a.createElement(i);
		const _ = a.getElementsByTagName(i)[0];
		r.async = 1;
		r.src = l + "?v" + (~~(new Date().getTime()/1000000));
		_.parentNode.insertBefore(r, _);
	})(window, document, "script", "https://static.mailerlite.com/js/universal.js", "ml");

	const ml_account = ml("accounts", "2758498", "t7f8b8i6b8", "load");
	const ml_webform_3328240 = ml_account("webforms", "3328240", "r1e0z6", "load");

	ml_webform_3328240("animation", "fadeIn");
	
	return ml_account;
	/* eslint-enable */
}
