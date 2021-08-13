import React from "react";
import "./GovBar.css";

export default class GovBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id="GovBar" className="govbar">
				<a
					href="//gouvernement.lu"
					target="_blank"
					className="govbar-logo"
					rel="noreferrer"
					title="Gouvernement du Grand-Duché de Luxembourg (Nouvelle fenêtre)">
					<img
						src="/img/gov-light.png"
						alt="Gouvernement du Grand-Duché de Luxembourg (Nouvelle fenêtre)"
					/>
				</a>

				<ul className="govbar-links">
					<li>
						<a
							href="https://luxembourg.public.lu"
							target="_blank"
							rel="noreferrer"
							title="luxembourg.lu - Nouvelle fenêtre"
							className="govbar-link">
							luxembourg.lu
						</a>
					</li>
					<li>
						<a
							href="https://guichet.public.lu"
							target="_blank"
							rel="noreferrer"
							title="guichet.lu - Nouvelle fenêtre"
							className="govbar-link">
							guichet.lu
						</a>
					</li>
					<li>
						<a
							href="https://gouvernement.lu"
							target="_blank"
							rel="noreferrer"
							title="gouvernement.lu - Nouvelle fenêtre"
							className="govbar-link">
							gouvernement.lu
						</a>
					</li>
					<li>
						<a
							href="https://crossgov.public.lu"
							target="_blank"
							rel="noreferrer"
							title="crossgov.lu - Nouvelle fenêtre"
							className="govbar-link">
							crossgov.lu
						</a>
					</li>
					<li>
						<a
							href="https://etat.public.lu"
							target="_blank"
							rel="noreferrer"
							title="Autres sites - Nouvelle fenêtre"
							className="govbar-link govbar-more">
							Autres sites
						</a>
					</li>
				</ul>
			</div>
		);
	}
}
