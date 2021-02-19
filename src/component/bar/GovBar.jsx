import React from 'react';
import './GovBar.css';
import { Link } from "react-router-dom";


export default class GovBar extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
		}
	}

	componentDidMount() {

	}

	render() {
		return (
		  	<div id="GovBar" class="govbar">
			    <a href="//gouvernement.lu" target="_blank" class="govbar-logo" rel="noopener" title="Gouvernement du Grand-Duché de Luxembourg (Nouvelle fenêtre)">
			    	<img src="//cdn.public.lu/pictures/logos/gov/gov-light.png" srcset="//cdn.public.lu/pictures/logos/gov/gov-light-hdpi.png 1.5x,//cdn.public.lu/pictures/logos/gov/gov-light-xhdpi.png 2x,//cdn.public.lu/pictures/logos/gov/gov-light-xxhdpi.png 3x" alt="Gouvernement du Grand-Duché de Luxembourg (Nouvelle fenêtre)"/>
			    </a>

			    <ul class="govbar-links">
			      	<li><a href="https://luxembourg.public.lu" target="_blank" rel="noopener" title="luxembourg.lu - Nouvelle fenêtre" class="govbar-link">luxembourg.lu</a>
			      	</li>
			      	<li><a href="https://guichet.public.lu" target="_blank" rel="noopener" title="guichet.lu - Nouvelle fenêtre" class="govbar-link">guichet.lu</a>
			      	</li>
			      	<li><a href="https://gouvernement.lu" target="_blank" rel="noopener" title="gouvernement.lu - Nouvelle fenêtre" class="govbar-link">gouvernement.lu</a></li>
			      	<li><a href="https://crossgov.public.lu" target="_blank" rel="noopener" title="crossgov.lu - Nouvelle fenêtre" class="govbar-link">crossgov.lu</a>
			      	</li>
			      
			    	<li><a href="https://etat.public.lu" target="_blank" rel="noopener" title="Autres sites - Nouvelle fenêtre" class="govbar-link govbar-more">Autres sites</a></li>
			    </ul>
			</div>
		)
	}
}