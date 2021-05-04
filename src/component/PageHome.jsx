import React from "react";
import "./PageHome.css";
import { NotificationManager as nm } from "react-notifications";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import Loading from "./box/Loading.jsx";
import Message from "./box/Message.jsx";
import Analytic from "./box/Analytic.jsx";
import { getRequest } from "../utils/request.jsx";
import Article from "./item/Article.jsx";
import Event from "./item/Event.jsx";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { getEcosystemAppURL } from "../utils/env.jsx";

export default class PageHome extends React.Component {
	constructor(props) {
		super(props);

		this.getNews = this.getNews.bind(this);
		this.getEvents = this.getEvents.bind(this);

		this.state = {
			news: null,
			events: null,
		};
	}

	componentDidMount() {
		this.getNews();
		this.getEvents();
	}

	getNews() {
		getRequest.call(this, "public/get_public_articles?media=CYBERLUX&type=NEWS", (data) => {
			this.setState({
				news: data
					.sort((a, b) => (b.publication_date > a.publication_date ? -1 : 1))
					.slice(0, 3),
			});
		}, (response) => {
			this.setState({ loading: false });
			nm.warning(response.statusText);
		}, (error) => {
			this.setState({ loading: false });
			nm.error(error.message);
		});
	}

	getEvents() {
		getRequest.call(this, "public/get_public_articles?media=CYBERLUX&type=EVENT", (data) => {
			this.setState({
				events: data
					.filter((d) => d.end_date !== null && d.start_date !== null)
					.filter((d) => d.end_date > new Date().toISOString())
					.sort((a, b) => (b.start_date > a.start_date ? -1 : 1))
					.slice(0, 3),
			});
		}, (response) => {
			this.setState({ loading: false });
			nm.warning(response.statusText);
		}, (error) => {
			this.setState({ loading: false });
			nm.error(error.message);
		});
	}

	getEcosystemRoleCount(category, value) {
		if (this.props.analytics === null
			|| this.props.analytics.taxonomy_values === undefined
			|| this.props.analytics.taxonomy_assignments === undefined) {
			return null;
		}

		const values = this.props.analytics.taxonomy_values
			.filter((v) => v.category === category && v.name === value);

		if (values.length === 0) {
			return null;
		}

		return this.props.analytics.taxonomy_assignments
			.filter((a) => a.taxonomy_value === values[0].id)
			.length;
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	render() {
		return (
			<div className={"page max-sized-page"}>
				<div className="row">
					<Carousel
						dynamicHeight={false}
						showStatus={false}
						showThumbs={false}
						infiniteLoop={true}
					>
						<Link to="/about">
							<div>
								<img src="/img/1.png" />
								<p className="legend">Legend 1</p>
							</div>
						</Link>
					</Carousel>
				</div>

				<div className="row row-spaced">
					<div className="col-md-12">
						<h1>Latest news</h1>
					</div>

					{this.state.news !== null && this.state.news.length === 0
						&& <div className="col-md-12">
							<Message
								text={"No news found"}
								height={300}
							/>
						</div>
					}

					{this.state.news !== null && this.state.news.length > 0
						&& this.state.news.map((e) => (
							<div className="col-md-4" key={e.id}>
								<Article
									info={e}
								/>
							</div>
						))
					}

					{this.state.news === null
						&& <Loading
							height={300}
						/>
					}

					<div className={"col-md-12"}>
						<div className={"right-buttons"}>
							<button
								className={"blue-background"}
								onClick={() => this.props.history.push("/news")}
							>
								<i className="fas fa-arrow-alt-circle-right"/> Consult all news
							</button>
						</div>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-12">
						<h1>Coming events</h1>
					</div>

					{this.state.events !== null && this.state.events.length === 0
						&& <div className="col-md-12">
							<Message
								text={"No coming event found"}
								height={300}
							/>
						</div>
					}

					{this.state.events !== null && this.state.events.length > 0
						&& this.state.events.map((e) => (
							<div className="col-md-4" key={e.id}>
								<Event
									info={e}
								/>
							</div>
						))
					}

					{this.state.events === null
						&& <Loading
							height={300}
						/>
					}

					<div className={"col-md-12"}>
						<div className={"right-buttons"}>
							<button
								className={"blue-background"}
								onClick={() => this.props.history.push("/calendar")}
							>
								<i className="fas fa-arrow-alt-circle-right"/> Open the calendar
							</button>
						</div>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-12 row-spaced">
						<h1>Ecosystem overview</h1>
					</div>

					<div className="col-md-12 row-spaced">
						{this.state.news !== null
							? <div className={"row"}>
								<div className="col-md-4">
									<Analytic
										value={this.getEcosystemRoleCount("ECOSYSTEM ROLE", "ACTOR")}
										desc={"Private companies"}
									/>
								</div>
								<div className="col-md-4">
									<Analytic
										value={this.getEcosystemRoleCount("ENTITY TYPE", "PUBLIC SECTOR")}
										desc={"Public entities"}
									/>
								</div>
								<div className="col-md-4">
									<Analytic
										value={this.getEcosystemRoleCount("ENTITY TYPE", "CIVIL SOCIETY")}
										desc={"Civil society organisations"}
									/>
								</div>
							</div>
							: <Loading
								height={200}
							/>
						}
					</div>

					<div className={"col-md-12"}>
						<div className={"right-buttons"}>
							<button
								className={"blue-background"}
								onClick={() => window.open(getEcosystemAppURL())}
							>
								<i className="fas fa-arrow-alt-circle-right"/> Go to the ecosystem website
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
