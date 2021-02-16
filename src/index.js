import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { unregister } from './registerServiceWorker';
import { CookiesProvider } from 'react-cookie';

//unregister();

ReactDOM.render(
	<CookiesProvider>
    	<App />
    </CookiesProvider>,
    document.getElementById('root')
);
