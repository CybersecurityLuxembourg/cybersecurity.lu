import React from "react";
import "./PageArticle.css";
import { NotificationManager as nm } from "react-notifications";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import Collapsible from "react-collapsible";
import Lock from "./box/Lock.jsx";
import { getRequest } from "../utils/request.jsx";
import { getApiURL } from "../utils/env.jsx";
import Loading from "./box/Loading.jsx";
import Chip from "./form/Chip.jsx";
import Message from "./box/Message.jsx";
import Article from "./item/Article.jsx";
import { getContentFromBlock, getNextTitle1Position } from "../utils/article.jsx";

export default class PageArticle extends React.Component {
	constructor(props) {
		super(props);

		this.getArticleContent = this.getArticleContent.bind(this);

		this.state = {
			article: null,
			relatedArticles: null,
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
			relatedArticles: null,
			articleLoading: false,
			relatedArticleLoading: false,
		});

		getRequest.call(this, "public/get_article_content/" + this.props.match.params.handle, (data) => {
			this.setState({
				article: data,
				articleLoading: false,
			});

			if (data.type === "NEWS") {
				getRequest.call(this, "public/get_related_articles/" + this.props.match.params.handle, (data) => {
					this.setState({
						relatedArticles: data,
						relatedArticleLoading: false,
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

	render() {
		let positionToTreat = 0;

		return (
			<div className={"PageArticle page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/news">NEWS</Link></Breadcrumb.Item>
							{this.state.article !== null && !this.state.loading
								? <Breadcrumb.Item><Link to={"/article/" + this.state.article.handle}>{this.state.article.title}</Link></Breadcrumb.Item>
								: ""}
						</Breadcrumb>
					</div>
				</div>

				{this.state.article !== null && this.state.article.content !== undefined && !this.state.articleLoading
					? <div className="row row-spaced">
						<div className={this.state.article.type === "NEWS" ? "col-md-8" : "col-md-12"}>
							<article>
								<div className='PageArticle-content-cover'>
									{this.state.article.image !== null
										? <img src={getApiURL() + "public/get_image/" + this.state.article.image}/>
										: ""}
									<div className='PageArticle-publication-date'>
										{this.state.article.publication_date}
									</div>
								</div>

								<div className="PageArticle-tags">
									{this.state.article.tags.map((t) => (
										<Chip
											label={t.name}
										/>
									))}
								</div>

								<h1 className="showFulltext">
									{this.state.article.title}
								</h1>

								{this.state.article.content.map((b, i) => {
									if (positionToTreat <= i) {
										if (b.type === "TITLE1") {
											const nextTitle1Position = getNextTitle1Position(i + 1, this.state.article.content);

											const el = <Collapsible trigger={getContentFromBlock(b)}>
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
								})}

								<div className="PageArticle-tags">
									{this.state.article.tags.map((t) => (
										<Chip
											label={t.name}
										/>
									))}
								</div>
							</article>
						</div>
						{this.state.article.type === "NEWS"
							? <div className="col-md-4">
								<div className="container">
									<div className="row PageArticle-related-article">
										<div className="col-md-12">
											<h2>Related articles</h2>

											{this.state.relatedArticles !== null && !this.state.relatedArticleLoading
												? (this.state.relatedArticles.length > 0
													? this.state.relatedArticles.map((a) => (
														<Article
															title={a.title}
															handle={a.handle}
															date={a.publication_date}
															abstract={a.abstract}
															image={a.image}
															tags={a.tags}
														/>
													))
													:													<Message
														text={"No related article found"}
														height={150}
													/>
												)
												: 												<Loading
													height={150}
												/>
											}
										</div>
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
