import React from "react";
import "./PageHome.css";
import { NotificationManager as nm } from "react-notifications";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import Loading from "./box/Loading.jsx";
import Message from "./box/Message.jsx";
import Analytic from "./box/Analytic.jsx";
import { getRequest } from "../utils/request.jsx";
import Article from "./item/Article.jsx";
import Event from "./item/Event.jsx";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { getEcosystemAppURL, getPrivateAppURL } from "../utils/env.jsx";
import { dictToURI } from "../utils/url.jsx";

export default class PageHome extends React.Component {
	constructor(props) {
		super(props);

		this.getNews = this.getNews.bind(this);
		this.getEventsOutOfBreakfast = this.getEventsOutOfBreakfast.bind(this);
		this.getCybersecurityBreakfastEvents = this.getCybersecurityBreakfastEvents.bind(this);

		this.state = {
			memberNews: null,
			memberNewsCompanies: null,
			newsLTAC: null,
			newsTC: null,
			newsCTA: null,
			newsIN: null,
			events: null,
			breakfastArticles: null,
			breakfastEvents: null,
		};
	}

	componentDidMount() {
		this.getNews("LËTZ TALK ABOUT CYBER", "newsLTAC");
		this.getNews("TECH CORNER", "newsTC");
		this.getNews("INSTITUTIONAL NEWS - EUROPE", "newsINE");
		this.getNews("INSTITUTIONAL NEWS - LUXEMBOURG", "newsINL");
		this.getNews("CALL TO ACTION", "newsCTA");
		this.getNews("CYBERSECURITY BREAKFAST", "breakfastArticles");
		this.getEventsOutOfBreakfast();
		this.getCybersecurityBreakfastEvents();
		this.getMemberNews();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.analytics === null && this.props.analytics !== null) {
			this.getNews("LËTZ TALK ABOUT CYBER", "newsLTAC");
			this.getNews("TECH CORNER", "newsTC");
			this.getNews("INSTITUTIONAL NEWS - EUROPE", "newsINE");
			this.getNews("INSTITUTIONAL NEWS - LUXEMBOURG", "newsINL");
			this.getNews("CALL TO ACTION", "newsCTA");
			this.getNews("CYBERSECURITY BREAKFAST", "breakfastArticles");
			this.getEventsOutOfBreakfast();
			this.getCybersecurityBreakfastEvents();
			this.getMemberNews();
		}
	}

	static getNumberOfArticlePerCategory(category) {
		if (category.startsWith("INSTITUTIONAL NEWS")) {
			return 1;
		}
		if (category === "TECH CORNER") {
			return 1;
		}
		if (category === "LËTZ TALK ABOUT CYBER") {
			return 1;
		}
		if (category === "CALL TO ACTION") {
			return 1;
		}
		return 2;
	}

	getNews(categoryValue, stateName) {
		if (this.props.analytics !== null
			&& this.props.analytics.taxonomy_values !== undefined) {
			const values = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "ARTICLE CATEGORY")
				.filter((v) => v.name === categoryValue);

			const params = {
				type: "NEWS",
				include_tags: "true",
				taxonomy_values: values.map((v) => v.id).join(","),
				per_page: 2,
				page: 1,
			};

			getRequest.call(this, "public/get_public_articles?" + dictToURI(params), (data) => {
				this.setState({
					[stateName]: data.items,
				});
			}, (response) => {
				nm.warning(response.statusText);
			}, (error) => {
				nm.error(error.message);
			});
		}
	}

	getMemberNews() {
		const params = {
			type: "NEWS",
			include_tags: "true",
			is_created_by_admin: false,
			per_page: 2,
			page: 1,
		};

		getRequest.call(this, "public/get_public_articles?" + dictToURI(params), (data) => {
			this.setState({
				memberNews: data.items,
			}, () => {
				const params2 = {
					ids: [
						Array.prototype.concat.apply(
							[],
							data.items
								.filter((i) => i.company_tags)
								.map((i) => i.company_tags),
						),
					],
				};

				getRequest.call(this, "public/get_public_companies?" + dictToURI(params2), (data2) => {
					this.setState({
						memberNewsCompanies: data2,
					});
				}, (response) => {
					nm.warning(response.statusText);
				}, (error) => {
					nm.error(error.message);
				});
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	getCybersecurityBreakfastEvents() {
		if (this.props.analytics !== null
			&& this.props.analytics.taxonomy_values !== undefined) {
			const values = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "ARTICLE CATEGORY" && v.name === "CYBERSECURITY BREAKFAST");

			if (values.length > 0) {
				getRequest.call(this, "public/get_public_articles?type=EVENT&include_tags=true&taxonomy_values="
					+ values[0].id, (data) => {
					this.setState({
						breakfastEvents: data.items
							.filter((d) => d.end_date !== null && d.start_date !== null)
							.filter((d) => d.end_date > new Date().toISOString())
							.sort((a, b) => (b.start_date > a.start_date ? -1 : 1))
							.slice(0, 1),
					});
				}, (response) => {
					nm.warning(response.statusText);
				}, (error) => {
					nm.error(error.message);
				});
			}
		}
	}

	getEventsOutOfBreakfast() {
		if (this.props.analytics !== null
			&& this.props.analytics.taxonomy_values !== undefined) {
			const values = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "ARTICLE CATEGORY" && v.name === "CYBERSECURITY BREAKFAST");

			if (values.length > 0) {
				getRequest.call(this, "public/get_public_articles?type=EVENT&include_tags=true", (data) => {
					this.setState({
						events: data.items
							.filter((d) => d.end_date !== null && d.start_date !== null)
							.filter((d) => d.end_date > new Date().toISOString())
							.filter((d) => d.taxonomy_tags.indexOf(values[0].id) < 0)
							.sort((a, b) => (b.start_date > a.start_date ? -1 : 1))
							.slice(0, 3),
					});
				}, (response) => {
					nm.warning(response.statusText);
				}, (error) => {
					nm.error(error.message);
				});
			}
		}
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

	getArticleCategoryContent(category, stateValue, width, hidePublicationDate) {
		if (this.state[stateValue] === null
			|| this.state[stateValue] === undefined) {
			return <Loading
				height={150}
			/>;
		}

		if (this.props.analytics !== null) {
			const sortedNews = this.state[stateValue]
				.slice(0, PageHome.getNumberOfArticlePerCategory(category));

			if (sortedNews.length === 0) {
				return <Message
					text={"No article found"}
					height={150}
				/>;
			}

			return sortedNews.map((a) => <div
				className={"col-md-" + width}
				key={a.id}>
				<Article
					info={a}
					hidePublicationDate={hidePublicationDate}
				/>
			</div>);
		}

		return "";
	}

	getMemberNewsContent() {
		if (!this.state.memberNews) {
			return <Loading
				height={150}
			/>;
		}

		if (this.props.analytics) {
			if (this.state.memberNews.length === 0) {
				return <Message
					text={"No article found"}
					height={150}
				/>;
			}

			return this.state.memberNews.map((a) => <div
				className={"col-md-6"}
				key={a.id}>
				<Article
					info={a}
					companies={this.state.memberNewsCompanies}
				/>
			</div>);
		}

		return "";
	}

	getInstitutionalNewsContent(width) {
		/* This one is specific to get the latest "INSTITUTIONAL NEWS - LUXEMBOURG"
		 * and the lastest "INSTITUTIONAL NEWS - EUROPE"
		 */
		if (this.state.newsINL === null
			|| this.state.newsINL === undefined
			|| this.state.newsINE === null
			|| this.state.newsINE === undefined) {
			return <Loading
				height={150}
			/>;
		}

		if (this.props.analytics !== null) {
			const sortedNewsINL = this.state.newsINL.slice(0, 1);
			const sortedNewsINE = this.state.newsINE.slice(0, 1);

			const sortedNews = sortedNewsINL.concat(sortedNewsINE)
				.sort((a, b) => (b.publication_date < a.publication_date ? -1 : 1));

			if (sortedNews.length === 0) {
				return <Message
					text={"No article found"}
					height={150}
				/>;
			}

			return sortedNews.map((a) => <div
				className={"col-md-" + width}
				key={a.id}>
				<Article
					info={a}
				/>
			</div>);
		}

		return "";
	}

	getBreakfastContent(category, width) {
		if (this.state.breakfastArticles === null
			|| this.state.breakfastEvents === null) {
			return <Loading
				height={150}
			/>;
		}

		if (this.state.breakfastArticles.length === 0
			&& this.state.breakfastEvents.length === 0) {
			return <Message
				text={"No article found"}
				height={150}
			/>;
		}

		return this.state.breakfastEvents
			.concat(this.state.breakfastArticles)
			.slice(0, 2)
			.map((a) => <div
				className={"col-md-" + width}
				key={a.id}>
				{a.type === "EVENT"
					? <Event
						info={a}
					/>
					: <Article
						info={a}
					/>
				}
			</div>);
	}

	getArticleCategoryURL(values) {
		if (this.props.analytics === null
			|| this.props.analytics.taxonomy_values === undefined) {
			return null;
		}

		const filteredValues = this.props.analytics.taxonomy_values
			.filter((v) => v.category === "ARTICLE CATEGORY" && values.indexOf(v.name) >= 0);

		if (filteredValues.length === 0) {
			return null;
		}

		return "/news?taxonomy_values=" + filteredValues.map((v) => v.id).join(",");
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	render() {
		return (
			<div
				id={"PageHome"}
				className={""}>

				{window.location.pathname.startsWith("/newsletter")
					&& <div className={"page max-sized-page"}>
						<div className="row row-spaced">
							<div className="col-md-12">
								<Breadcrumb>
									<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
									<Breadcrumb.Item><Link to="/newsletter">NEWSLETTER</Link></Breadcrumb.Item>
								</Breadcrumb>
							</div>

							<div className="col-md-12">
								<h1>Monthly Newsletter of the Luxembourg Cybersecurity Ecosystem</h1>

								<p>
									Keep up to date with the latest cybersecurity news in and around Luxembourg:
									rom institutional news, to the tech corner and upcoming events, find a review
									of all the newest developments in one place and remain a step ahead of
									what&apos;s coming next.
								</p>

								<p>
									Sent every first Tuesday of the month, this monthly newsletter is a great
									opportunity to get to know the entities that make up the ecosystem.
								</p>
							</div>

							<p>&nbsp;</p>

							<div className="col-md-12">
								{/* eslint-disable no-script-url */}
								<button href="javascript:;"
									className="nav-link nav-link-blue full-width-button blue-button"
									onClick={() => this.props.ml_account("webforms", "3328240", "r1e0z6", "show")}>
									<i className="fas fa-paper-plane"/> Subscribe now
								</button>
							</div>
						</div>
					</div>
				}

				<div className="blue-bordered">
					<ul className="Background-petals">
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
					</ul>

					<ul className="Background-petals-bottom">
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
					</ul>

					<div className="max-sized-page">
						<div className="row">
							<div className="col-md-12">
								<h1>What&apos;s up?</h1>
							</div>

							<div className="col-md-4 shadow-section PageHome-newsletter">
								{/* eslint-disable no-script-url */}
								<a
									href={getPrivateAppURL()}
									target={"_blank"}
									rel="noreferrer"
								>
									<div className="PageHome-newsletter-content">
										<h3>Share your latest news here</h3>

										<i className="fas fa-feather-alt"/>

										<div className="PageHome-newsletter-content-desc">
											With just a few clicks, give your organisation
											a greater visibility.
											Log in to My CYBERLUX now.
										</div>
									</div>
								</a>
							</div>

							<div className="col-md-8">
								<div className="row">
									<div className="col-md-12">
										<a
											className="PageHome-title-link"
											href={"/news?member_news_only=true"}>
											<div className="PageHome-title">
												<h3>MEMBER NEWS <span>more</span></h3>
											</div>
										</a>
									</div>
								</div>
								<div className="row">
									{this.getMemberNewsContent()}
								</div>
							</div>
						</div>

						<div className="row">
							<div className="col-md-8">
								<div className="row">
									<div className="col-md-12">
										<a
											className="PageHome-title-link"
											href={this.getArticleCategoryURL(
												["INSTITUTIONAL NEWS - EUROPE", "INSTITUTIONAL NEWS - LUXEMBOURG"],
											)}>
											<div className="PageHome-title">
												<h3>INSTITUTIONAL NEWS <span>more</span></h3>
											</div>
										</a>
									</div>
								</div>
								<div className="row">
									{this.getInstitutionalNewsContent(6)}
								</div>
							</div>

							<div className="col-md-4 shadow-section">
								<div className="row">
									<div className="col-md-12">
										<a
											className="PageHome-title-link"
											href={this.getArticleCategoryURL(["CALL TO ACTION"])}>
											<div className="PageHome-title">
												<h3>CALL TO ACTION <span>more</span></h3>
											</div>
										</a>
									</div>
								</div>
								<div className="row">
									{this.getArticleCategoryContent("CALL TO ACTION", "newsCTA", 12, true)}
								</div>
							</div>
						</div>

						<div className="row">
							<div className="col-md-4 shadow-section PageHome-newsletter">
								{/* eslint-disable no-script-url */}
								<a
									href="mailto:info@cybersecurity-luxembourg.com"
									subject="Organisation of a Cybersecurity Breakfast">
									<div className="PageHome-newsletter-content">
										<h3>Become a partner</h3>
										<i className="fas fa-handshake"/>
										<div className="PageHome-newsletter-content-desc">
											Cybersecurity Breakfast is a monthly series.
											If you are interested in organising an edition
											or becoming partner of the month,
											please contact us.
										</div>
									</div>
								</a>
							</div>

							<div className="col-md-8">
								<div className="row">
									<div className="col-md-12">
										<a
											className="PageHome-title-link"
											href={this.getArticleCategoryURL(["CYBERSECURITY BREAKFAST"])}>
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
							<div className="col-md-8">
								<div className="row">
									<div className="col-md-12">
										<a
											className="PageHome-title-link"
											href={this.getArticleCategoryURL(["LËTZ TALK ABOUT CYBER"])}>
											<div className="PageHome-title">
												<h3>LËTZ TALK ABOUT CYBER <span>more</span></h3>
											</div>
										</a>
									</div>
								</div>
								<div className="row">
									{this.getArticleCategoryContent("LËTZ TALK ABOUT CYBER", "newsLTAC", 12)}
								</div>
							</div>

							<div className="col-md-4">
								<div className="row">
									<div className="col-md-12">
										<a
											className="PageHome-title-link"
											href={this.getArticleCategoryURL(["TECH CORNER"])}>
											<div className="PageHome-title">
												<h3>TECH CORNER <span>more</span></h3>
											</div>
										</a>
									</div>
								</div>
								<div className="row">
									{this.getArticleCategoryContent("TECH CORNER", "newsTC", 12)}
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

				{!window.location.pathname.startsWith("/newsletter")
					&& <div className="red-bordered">
						<ul className="Background-petals">
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
						</ul>

						<ul className="Background-petals-bottom">
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
						</ul>

						<div className="max-sized-page">
							<div className="row row-spaced">
								<div className="col-md-12">
									<h1>Where to meet?</h1>
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
									&& <div className="col-md-12">
										<Loading
											height={300}
										/>
									</div>
								}
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
				}

				{!window.location.pathname.startsWith("/newsletter")
					&& <div className="black-bordered">
						<ul className="Background-petals">
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
						</ul>

						<ul className="Background-petals-bottom">
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
						</ul>

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
				}
			</div>
		);
	}
}
