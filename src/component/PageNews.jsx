import React from "react";
import "./PageNews.css";
import { NotificationManager as nm } from "react-notifications";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import Loading from "./box/Loading.jsx";
import Message from "./box/Message.jsx";
import ShadowBoxShareNews from "./box/ShadowBoxShareNews.jsx";
import ShadowBoxBecomePartner from "./box/ShadowBoxBecomePartner.jsx";
import SearchField from "./form/SearchField.jsx";
import { getRequest } from "../utils/request.jsx";
import Article from "./item/Article.jsx";
import Event from "./item/Event.jsx";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { dictToURI } from "../utils/url.jsx";

export default class PageNews extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			memberNews: null,
			memberNewsCompanies: null,
			newsLTAC: null,
			newsTC: null,
			newsCTA: null,
			newsIN: null,
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
					ids: Array.prototype.concat.apply(
						[],
						data.items
							.filter((i) => i.company_tags)
							.map((i) => i.company_tags),
					),
				};

				if (params2.ids.length > 0) {
					getRequest.call(this, "public/get_public_companies?" + dictToURI(params2), (data2) => {
						this.setState({
							memberNewsCompanies: data2,
						});
					}, (response) => {
						nm.warning(response.statusText);
					}, (error) => {
						nm.error(error.message);
					});
				}
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
			} else {
				this.setState({
					breakfastEvents: [],
				});
			}
		}
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
				.slice(0, PageNews.getNumberOfArticlePerCategory(category));

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
		if (!this.state.breakfastArticles
			|| !this.state.breakfastEvents) {
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

		return "/search?taxonomy_values=" + filteredValues.map((v) => v.id).join(",");
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	render() {
		return (
			<div id={"PageNews"} className={"page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/news">NEWS</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>

					<div className="col-md-12">
						<h4>Search over the portal</h4>
					</div>

					<div className="col-md-12 row-spaced">
						<SearchField/>
					</div>

					<div className="col-md-4">
						<ShadowBoxShareNews/>
					</div>

					<div className="col-md-8">
						<div className="row">
							<div className="col-md-12">
								<a
									className="PageNews-title-link"
									href={"/news?member_news_only=true"}>
									<div className="PageNews-title">
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
								<Link
									className="PageNews-title-link"
									to={this.getArticleCategoryURL(
										["INSTITUTIONAL NEWS - EUROPE", "INSTITUTIONAL NEWS - LUXEMBOURG"],
									)}>
									<div className="PageNews-title">
										<h3>INSTITUTIONAL NEWS <span>more</span></h3>
									</div>
								</Link>
							</div>
						</div>
						<div className="row">
							{this.getInstitutionalNewsContent(6)}
						</div>
					</div>

					<div className="col-md-4">
						<div className="shadow-section">
							<a
								className="PageNews-title-link"
								href={this.getArticleCategoryURL(["CALL TO ACTION"])}>
								<div className="PageNews-title">
									<h3>CALL TO ACTION <span>more</span></h3>
								</div>
							</a>

							{this.getArticleCategoryContent("CALL TO ACTION", "newsCTA", 12, true)}
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-md-4">
						<ShadowBoxBecomePartner/>
					</div>

					<div className="col-md-8">
						<div className="row">
							<div className="col-md-12">
								<a
									className="PageNews-title-link"
									href={this.getArticleCategoryURL(["CYBERSECURITY BREAKFAST"])}>
									<div className="PageNews-title">
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
									className="PageNews-title-link"
									href={this.getArticleCategoryURL(["LËTZ TALK ABOUT CYBER"])}>
									<div className="PageNews-title">
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
									className="PageNews-title-link"
									href={this.getArticleCategoryURL(["TECH CORNER"])}>
									<div className="PageNews-title">
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
			</div>
		);
	}
}
