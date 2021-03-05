import ReactDOM from "react-dom";
import { CookiesProvider } from "react-cookie";
import App from "./App.jsx";

ReactDOM.render(
	<CookiesProvider>
		<App />
	</CookiesProvider>,
	document.getElementById("root");
);
