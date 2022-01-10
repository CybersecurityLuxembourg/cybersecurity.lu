import React from "react";
import "./PageArticle.css";
import dompurify from "dompurify";
import { NotificationManager as nm } from "react-notifications";
import { Helmet } from "react-helmet";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import Collapsible from "react-collapsible";
import { getRequest } from "../utils/request.jsx";
import { getApiURL } from "../utils/env.jsx";
import { dictToURI } from "../utils/url.jsx";
import Loading from "./box/Loading.jsx";
import Chip from "./form/Chip.jsx";
import Message from "./box/Message.jsx";
import Article from "./item/Article.jsx";
import { getContentFromBlock, getNextTitle1Position } from "../utils/article.jsx";
import { dateToString } from "../utils/date.jsx";
import TwitterLink from "./form/TwitterLink.jsx";
import LinkedInLink from "./form/LinkedInLink.jsx";

export default class PageArticle extends React.Component {
	constructor(props) {
		super(props);

		this.getArticleContent = this.getArticleContent.bind(this);

		this.state = {
			article: null,
			articleCompanies: null,
			relatedArticles: null,
			relatedArticleCompanies: null,
			articleLoading: false,
			relatedArticleLoading: false,
		};
	}

	componentDidMount() {
		this.getArticleContent();
	}

	getArticleContent() {
		this.setState({
			article: null,
			articleCompanies: null,
			relatedArticles: null,
			relatedArticleCompanies: null,
			articleLoading: false,
			relatedArticleLoading: false,
		});

		getRequest.call(this, "public/get_article_content/" + this.props.match.params.handle, (data) => {
			this.setState({
				article: data,
				articleLoading: false,
			});

			if (data.type === "NEWS") {
				getRequest.call(this, "public/get_related_articles/" + this.props.match.params.handle + "?include_tags=true", (data2) => {
					this.setState({
						relatedArticles: data2,
						relatedArticleLoading: false,
					}, () => {
						const params2 = {
							ids: Array.prototype.concat.apply(
								[],
								data2
									.filter((i) => i.company_tags)
									.map((i) => i.company_tags),
							),
						};

						if (params2.ids.length > 0) {
							getRequest.call(this, "public/get_public_companies?" + dictToURI(params2), (data3) => {
								this.setState({
									relatedArticleCompanies: data3,
								});
							}, (response) => {
								nm.warning(response.statusText);
							}, (error) => {
								nm.error(error.message);
							});
						}
					});
				}, (response) => {
					this.setState({ loading: false });
					nm.warning(response.statusText);
				}, (error) => {
					this.setState({ loading: false });
					nm.error(error.message);
				});
			}
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

	getOriginMenu() {
		if (this.state.article === null) {
			return "";
		}

		if (this.state.article.type === "NEWS") {
			return "WHAT'S UP?";
		}

		if (this.state.article.type === "TOOL") {
			return "NATIONAL STRATEGY";
		}

		return "";
	}

	getOriginMenuUrl() {
		if (this.state.article === null) {
			return "";
		}

		if (this.state.article.type === "NEWS") {
			return "/news";
		}

		if (this.state.article.type === "TOOL") {
			return "/strategy";
		}

		return "";
	}

	render() {
		let positionToTreat = 0;

		return (
			<div className={"PageArticle page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item>
								<Link to={this.getOriginMenuUrl()}>
									{this.getOriginMenu()}
								</Link>
							</Breadcrumb.Item>
							{this.state.article !== null && !this.state.loading
								? <Breadcrumb.Item>
									<Link to={this.getOriginMenuUrl() + "/" + this.props.match.params.handle}>
										{this.state.article.title}
									</Link>
								</Breadcrumb.Item>
								: ""}
						</Breadcrumb>
					</div>
				</div>

				{this.state.article !== null && this.state.article.content !== undefined
					&& !this.state.articleLoading
					? <div className="row row-spaced">
						<div className={this.state.article.type === "NEWS" ? "col-md-8" : "col-md-12"}>
							<article>
								<Helmet>
									<meta name="title" property="og:title" content={this.state.article.title}/>
									<meta name="description" property="og:description" content={this.state.article.abstract}/>
									<meta name="image" property="og:image" content={getApiURL() + "public/get_public_image/" + this.state.article.image}/>
									<meta name="url" property="og:url" content={this.state.article.link !== undefined
										&& this.state.article.link !== null
										&& this.state.article.link.length > 0
										? this.state.article.link
										: window.location.origin + "/news/"
											+ this.props.match.params.handle}/>
								</Helmet>

								<div className='PageArticle-content-cover'>
									{this.state.article.image !== null
										? <img src={getApiURL() + "public/get_public_image/" + this.state.article.image}/>
										: ""}
									<div className='PageArticle-publication-date'>
										{dateToString(this.state.article.publication_date, "DD MMM YYYY")}
									</div>
								</div>

								<div className="PageArticle-tags">
									{this.state.article.taxonomy_tags.map((t) => (
										<Chip
											key={t.name}
											label={t.name}
											url={"/search?taxonomy_values=" + t.id}
										/>
									))}
								</div>

								<div className="PageArticle-companies">
									{this.state.article.company_tags.map((t) => (
										<Chip
											key={t.name}
											label={t.name}
											color={"#ffa8b0"}
											url={"/company/" + t.id}
										/>
									))}
								</div>

								<h1 className="showFulltext">
									{this.state.article.title}
								</h1>

								{this.state.article.abstract !== null
									&& <div
										className="PageArticle-abstract"
										dangerouslySetInnerHTML={{
											__html:
											dompurify.sanitize(this.state.article.abstract),
										}}>
									</div>
								}

								{this.state.article.content.map((b, i) => {
									if (positionToTreat <= i) {
										if (b.type === "TITLE1") {
											const nextTitle1Position = getNextTitle1Position(
												this.state.article.content,
												i,
											);

											const el = <Collapsible
												trigger={getContentFromBlock(b)}
												open={true}>
												{this.state.article.content
													.slice(positionToTreat + 1, nextTitle1Position - 1)
													.map((b2) => getContentFromBlock(b2))}
											</Collapsible>;

											positionToTreat = nextTitle1Position - 1;

											return el;
										}
										positionToTreat += 1;
										return getContentFromBlock(b);
									}
									return null;
								})}

								<div className="PageArticle-tags">
									{this.state.article.taxonomy_tags.map((t) => (
										<Chip
											key={t.name}
											label={t.name}
											url={"/search?taxonomy_values=" + t.id}
										/>
									))}
								</div>

								<div className="PageArticle-companies">
									{this.state.article.company_tags.map((t) => (
										<Chip
											key={t.name}
											label={t.name}
											color={"#ffa8b0"}
											url={"/company/" + t.id}
										/>
									))}
								</div>
							</article>
						</div>
						{this.state.article.type === "NEWS"
							? <div className="col-md-4">
								<div className="container">
									<div className="row PageArticle-social-media">
										<div className="col-md-12">
											<h3>Share on social media</h3>
										</div>

										<div className="col-md-12">
											<div className="PageArticle-social-media-links">
												<TwitterLink
													text={this.state.article.title}
													url={this.state.article.link !== undefined
														&& this.state.article.link !== null
														&& this.state.article.link.length > 0
														? this.state.article.link
														: window.location.origin + "/news/"
															+ this.props.match.params.handle
													}
												/>
												<LinkedInLink
													text={this.state.article.title}
													url={this.state.article.link !== undefined
														&& this.state.article.link !== null
														&& this.state.article.link.length > 0
														? this.state.article.link
														: window.location.origin + "/news/"
															+ this.props.match.params.handle
													}
												/>
											</div>
										</div>
									</div>
								</div>

								<div className="container">
									<div className="row PageArticle-related-article">
										<div className="col-md-12">
											<h3>Related articles</h3>
										</div>

										{this.state.relatedArticles !== null && !this.state.relatedArticleLoading
											&& this.state.relatedArticles.length > 0
											&& this.state.relatedArticles.map((a) => (
												<div
													className="col-md-12"
													key={a.id}>
													<Article
														key={a.id}
														info={a}
														companies={this.state.relatedArticleCompanies}
													/>
												</div>
											))
										}

										{this.state.relatedArticles !== null && !this.state.relatedArticleLoading
											&& this.state.relatedArticles.length === 0
											&& <div className="col-md-12">
												<Message
													text={"No related article found"}
													height={150}
												/>
											</div>
										}

										{(this.state.relatedArticles === null || this.state.relatedArticleLoading)
											&& <div className="col-md-12">
												<Loading
													height={150}
												/>
											</div>
										}
									</div>
								</div>
							</div>
							: ""}
					</div>
					: 					<Loading
						height={200}
					/>
				}
			</div>
		);
	}
}
