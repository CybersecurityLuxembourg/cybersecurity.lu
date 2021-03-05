import React from "react";
import "./PageHome.css";
import { NotificationManager as nm } from "react-notifications";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import Lock from "./box/Lock.jsx";
import Loading from "./box/Loading.jsx";
import Message from "./box/Message.jsx";
import Analytic from "./box/Analytic.jsx";
import { getRequest } from "../utils/request.jsx";
import Article from "./item/Article.jsx";
import Event from "./item/Event.jsx";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import VennActorDistribution from "./chart/VennActorDistribution.jsx";

export default class PageHome extends React.Component {
	constructor(props) {
		super(props);

		this.getActors = this.getActors.bind(this);
		this.getNews = this.getNews.bind(this);
		this.getEvents = this.getEvents.bind(this);

		this.state = {
			actors: null,
			news: null,
			events: null,
		};
	}

	componentDidMount() {
		this.getActors();
		this.getNews();
		this.getEvents();
	}

	getActors() {
		getRequest.call(this, "public/get_public_companies?type=ACTOR", (data) => {
			this.setState({
				actors: data,
			});
		}, (response) => {
			this.setState({ loading: false });
			nm.warning(response.statusText);
		}, (error) => {
			this.setState({ loading: false });
			nm.error(error.message);
		});
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
						<h1>Ecosystem overview</h1>
					</div>

					<div className="col-md-12">
						{this.state.news !== null
							? <VennActorDistribution
								actors={this.state.actors !== null ? this.state.actors : []}
							/>
							:							<Loading
								height={400}
							/>
						}
					</div>

					<div className={"col-md-12"}>
						<div className={"right-buttons"}>
							<button
								className={"blue-background"}
								onClick={() => this.props.history.push("/ecosystem")}
							>
								<i className="fas fa-arrow-alt-circle-right"/> Consult the ecosystem
							</button>
						</div>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-12">
						<h1>Latest news</h1>
					</div>

					{this.state.news !== null
						? (this.state.news.length === 0
							? <div className="col-md-12">
								<Message
									text={"No news found"}
									height={400}
								/>
							</div>
							:							this.state.news.map((e) => (
								<div className="col-md-4">
									<Article
										info={e}
									/>
								</div>
							))
						)
						:						<Loading
							height={400}
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

					{this.state.events !== null
						? (this.state.events.length === 0
							? <div className="col-md-12">
								<Message
									text={"No coming event found"}
									height={400}
								/>
							</div>
							:							this.state.events.map((e) => (
								<div className="col-md-4">
									<Event
										info={e}
									/>
								</div>
							))
						)
						:						<Loading
							height={400}
						/>
					}

					<div className={"col-md-12"}>
						<div className={"right-buttons"}>
							<button
								className={"blue-background"}
								onClick={() => this.props.history.push("/calendar")}
							>
								<i className="fas fa-arrow-alt-circle-right"/> Consult the calendar
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
