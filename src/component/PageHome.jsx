import React from "react";
import "./PageHome.css";
import { NotificationManager as nm } from "react-notifications";
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
			sortedNews: null,
			events: null,
			breakfastArticles: null,
		};
	}

	componentDidMount() {
		this.getNews();
		this.getEvents();
		this.getBreakfastArticles();
	}

	componentDidUpdate(prevProps) {
		if (this.props.analytics !== null
			&& this.state.news !== null
			&& this.state.sortedNews == null) {
			const sortedNews = {};

			const articleCategoryValues = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "ARTICLE CATEGORY");

			for (let i = 0; i < articleCategoryValues.length; i++) {
				sortedNews[articleCategoryValues[i].name] = this.state.news
					.filter((a) => a.taxonomy_tags.indexOf(articleCategoryValues[i].id) >= 0)
					.slice(0, PageHome.getNumberOfArticlePerCategory(articleCategoryValues[i].name));
			}

			this.setState({
				sortedNews,
			});
		}

		if (prevProps.analytics === null && this.props.analytics !== null) {
			this.getBreakfastArticles();
		}
	}

	static getNumberOfArticlePerCategory(category) {
		if (category === "INSTITUTIONAL NEWS") {
			return 1;
		}
		if (category === "LËTZ TALK ABOUT CYBER") {
			return 1;
		}
		return 2;
	}

	getNews() {
		getRequest.call(this, "public/get_public_articles?media=CYBERLUX&type=NEWS&include_tags=true", (data) => {
			this.setState({
				news: data
					.sort((a, b) => (b.publication_date < a.publication_date ? -1 : 1)),
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	getBreakfastArticles() {
		if (this.props.analytics !== null
			&& this.props.analytics.taxonomy_values !== undefined) {
			const values = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "ARTICLE CATEGORY" && v.name === "CYBERSECURITY BREAKFAST");

			if (values.length > 0) {
				getRequest.call(this, "public/get_public_articles?media=CYBERLUX&include_tags=true&taxonomy_values="
					+ values[0].id, (data) => {
					this.setState({
						breakfastArticles: data
							.sort((a, b) => (b.publication_date < a.publication_date ? -1 : 1))
							.slice(0, 2),
					});
				}, (response) => {
					nm.warning(response.statusText);
				}, (error) => {
					nm.error(error.message);
				});
			}
		}
	}

	getEvents() {
		getRequest.call(this, "public/get_public_articles?media=CYBERLUX&type=EVENT", (data) => {
			this.setState({
				events: data
					.filter((d) => d.end_date !== null && d.start_date !== null)
					.filter((d) => d.end_date > new Date().toISOString())
					.sort((a, b) => (b.start_date > a.start_date ? -1 : 1))
					.slice(0, 2),
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
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

	getArticleCategoryContent(category, width) {
		if (this.state.sortedNews === null
			|| this.state.sortedNews[category] === undefined) {
			return <Loading
				height={150}
			/>;
		}

		if (this.state.sortedNews[category].length === 0) {
			return <Message
				text={"No article found"}
				height={150}
			/>;
		}

		return this.state.sortedNews[category].map((a) => <div
			className={"col-md-" + width}
			key={a.id}>
			<Article
				info={a}
			/>
		</div>);
	}

	getBreakfastContent(category, width) {
		if (this.state.breakfastArticles === null) {
			return <Loading
				height={150}
			/>;
		}

		if (this.state.breakfastArticles.length === 0) {
			return <Message
				text={"No article found"}
				height={150}
			/>;
		}

		return this.state.breakfastArticles.map((a) => <div
			className={"col-md-" + width}
			key={a.id}>
			<Article
				info={a}
			/>
		</div>);
	}

	getArticleCategoryURL(category, value) {
		if (this.props.analytics === null
			|| this.props.analytics.taxonomy_values === undefined) {
			return null;
		}

		const values = this.props.analytics.taxonomy_values
			.filter((v) => v.category === category && v.name === value);

		if (values.length === 0) {
			return null;
		}

		return "/news?taxonomy_values=" + values[0].id;
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	render() {
		return (
			<div
				id={"PageHome"}
				className={""}>

				<div className="blue-bordered">
					<div className="max-sized-page">
						<div className="row">
							<div className="col-md-12">
								<h1>What&apos;s up?</h1>
							</div>

							<div className="col-md-8">
								<div className="row">
									<div className="col-md-12">
										<a
											className="PageHome-title-link"
											href={this.getArticleCategoryURL("ARTICLE CATEGORY", "INSTITUTIONAL NEWS")}>
											<div className="PageHome-title">
												<h3>INSTITUTIONAL NEWS <span>more</span></h3>
											</div>
										</a>
									</div>
								</div>
								<div className="row">
									{this.getArticleCategoryContent("INSTITUTIONAL NEWS", 12)}
								</div>
							</div>

							<div className="col-md-4 shadow-section">
								<div className="row">
									<div className="col-md-12">
										<a
											className="PageHome-title-link"
											href={this.getArticleCategoryURL("ARTICLE CATEGORY", "CALL TO ACTION")}>
											<div className="PageHome-title">
												<h3>CALL TO ACTION <span>more</span></h3>
											</div>
										</a>
									</div>
								</div>
								<div className="row">
									{this.getArticleCategoryContent("CALL TO ACTION", 12)}
								</div>
							</div>
						</div>

						<div className="row">
							<div className="col-md-4">
								<div className="row">
									<div className="col-md-12">
										<a
											className="PageHome-title-link"
											href={this.getArticleCategoryURL("ARTICLE CATEGORY", "LËTZ TALK ABOUT CYBER")}>
											<div className="PageHome-title">
												<h3>LËTZ TALK ABOUT CYBER <span>more</span></h3>
											</div>
										</a>
									</div>
								</div>
								<div className="row">
									{this.getArticleCategoryContent("LËTZ TALK ABOUT CYBER", 12)}
								</div>
							</div>

							<div className="col-md-8">
								<div className="row">
									<div className="col-md-12">
										<a
											className="PageHome-title-link"
											href={this.getArticleCategoryURL("ARTICLE CATEGORY", "CYBERSECURITY BREAKFAST")}>
											<div className="PageHome-title">
												<h3>CYBERSECURITY BREAKFAST <span>more</span></h3>
											</div>
										</a>
									</div>
								</div>
								<div className="row">
									{this.getBreakfastContent("CYBERSECURITY BREAKFAST", 6)}
								</div>
							</div>
						</div>

						<div className="row row-spaced">
							<div className="col-md-4 shadow-section PageHome-newsletter">
								{/* eslint-disable no-script-url */}
								<a href="javascript:;" onClick={() => this.props.ml_account("webforms", "3328240", "r1e0z6", "show")}>
									<div className="PageHome-newsletter-content">
										<h3>NEWSLETTER</h3>
										<i className="far fa-newspaper"/>
										<div className="PageHome-newsletter-content-desc">
											Subscribe to the newsletter to received the monthly news!
										</div>
									</div>
								</a>
							</div>

							<div className="col-md-8">
								<div className="row">
									<div className="col-md-12">
										<a
											className="PageHome-title-link"
											href={this.getArticleCategoryURL("ARTICLE CATEGORY", "TECH CORNER")}>
											<div className="PageHome-title">
												<h3>TECH CORNER <span>more</span></h3>
											</div>
										</a>
									</div>
								</div>
								<div className="row">
									{this.getArticleCategoryContent("TECH CORNER", 6)}
								</div>
							</div>
						</div>

						<div className="row">
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
					</div>
				</div>

				<div className="red-bordered">
					<div className="max-sized-page">
						<div className="row row-spaced">
							<div className="col-md-12">
								<h1>Where to meet?</h1>
							</div>

							{this.state.events !== null && this.state.events.length === 0
								&& <div className="col-md-8">
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
								&& <div className="col-md-8">
									<Loading
										height={300}
									/>
								</div>
							}

							<div className="col-md-4 shadow-section PageHome-cswl">
								{/* eslint-disable no-script-url */}
								<a
									href="https://www.cybersecurityweek.lu/"
									target="_blank"
									rel="noreferrer">
									<div className="PageHome-cswl-content">
										<h3>CYBERSECURITY WEEK LUXEMBOURG</h3>
										<div className="PageHome-cswl-content-desc">
											18-28 October 2021
										</div>
										<i className="fas fa-shield-alt"/>
										<div className="PageHome-cswl-content-desc">
											Visit the official website!
										</div>
									</div>
								</a>
							</div>

						</div>
						<div className="row row-spaced">
							<div className={"col-md-12"}>
								<div className={"right-buttons"}>
									<button
										className={"red-button"}
										onClick={() => this.props.history.push("/calendar")}
									>
										<i className="fas fa-arrow-alt-circle-right"/> Open the calendar
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="black-bordered">
					<div className="max-sized-page">
						<div className="row row-spaced">
							<div className="col-md-12 row-spaced">
								<h1>Ecosystem overview</h1>
							</div>

							<div className="col-md-12 row-spaced">
								{this.state.news !== null
									? <div className={"row"}>
										<div className="col-md-4">
											<a
												className={"PageHome-link"}
												href={getEcosystemAppURL() + "privatesector"}
												target={"_blank"}
												rel="noreferrer"
											>
												<Analytic
													value={this.getEcosystemRoleCount("ECOSYSTEM ROLE", "ACTOR")}
													desc={"Private companies"}
												/>
											</a>
										</div>
										<div className="col-md-4">
											<a
												className={"PageHome-link"}
												href={getEcosystemAppURL() + "publicsector"}
												target={"_blank"}
												rel="noreferrer"
											>
												<Analytic
													value={this.getEcosystemRoleCount("ENTITY TYPE", "PUBLIC SECTOR")}
													desc={"Public entities"}
												/>
											</a>
										</div>
										<div className="col-md-4">
											<a
												className={"PageHome-link"}
												href={getEcosystemAppURL() + "civilsociety"}
												target={"_blank"}
												rel="noreferrer"
											>
												<Analytic
													value={this.getEcosystemRoleCount("ENTITY TYPE", "CIVIL SOCIETY")}
													desc={"Civil society organisations"}
												/>
											</a>
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
										className={"black-button"}
										onClick={() => window.open(getEcosystemAppURL())}
									>
										<i className="fas fa-arrow-alt-circle-right"/> Go to the ecosystem platform
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
