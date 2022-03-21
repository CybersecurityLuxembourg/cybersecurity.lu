import React from "react";
import "./PageJobOffer.css";
import dompurify from "dompurify";
import { NotificationManager as nm } from "react-notifications";
import { Helmet } from "react-helmet";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import Collapsible from "react-collapsible";
import { getRequest } from "../../utils/request.jsx";
import { getApiURL } from "../../utils/env.jsx";
import Loading from "../box/Loading.jsx";
import Chip from "../form/Chip.jsx";
import { getContentFromBlock, getNextTitle1Position } from "../../utils/article.jsx";
import { dateToString } from "../../utils/date.jsx";
import TwitterLink from "../form/TwitterLink.jsx";
import LinkedInLink from "../form/LinkedInLink.jsx";

export default class PageJobOffer extends React.Component {
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
				getRequest.call(this, "public/get_related_articles/" + this.props.match.params.handle, (data2) => {
					this.setState({
						relatedArticles: data2,
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
			<div className={"PageJobOffer page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/jobs">JOBS</Link></Breadcrumb.Item>
							{this.state.article !== null && !this.state.loading
								? <Breadcrumb.Item>
									<Link to={"/job/" + this.props.match.params.handle}>
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
						<div className={"col-md-8"}>
							<article>
								<Helmet>
									<meta prefix="og: http://ogp.me/ns#" property="og:title" content={this.state.article.title}/>
									<meta prefix="og: http://ogp.me/ns#" property="og:description" content={this.state.article.abstract}/>
									<meta prefix="og: http://ogp.me/ns#" property="og:image" content={getApiURL() + "public/get_public_image/" + this.state.article.image}/>
									<meta prefix="og: http://ogp.me/ns#" property="og:url" content={this.state.article.link !== undefined
										&& this.state.article.link !== null
										&& this.state.article.link.length > 0
										? this.state.article.link
										: window.location.origin + "/news/"
											+ this.props.match.params.handle}/>
									<meta name="twitter:card" content="summary_large_image"/>
								</Helmet>

								<div className='PageJobOffer-content-cover'>
									{this.state.article.image !== null
										? <img src={getApiURL() + "public/get_public_image/" + this.state.article.image}/>
										: ""}
									<div className='PageJobOffer-publication-date'>
										{dateToString(this.state.article.publication_date, "DD MMM YYYY")}
									</div>
								</div>

								<div className="PageJobOffer-tags">
									{this.state.article.taxonomy_tags.map((t) => (
										<Chip
											key={t.name}
											label={t.name}
											url={"/search?taxonomy_values=" + t.id}
										/>
									))}
								</div>

								<div className="PageJobOffer-companies">
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
										className="PageJobOffer-abstract"
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

								<div className="PageJobOffer-tags">
									{this.state.article.taxonomy_tags.map((t) => (
										<Chip
											key={t.name}
											label={t.name}
											url={"/search?taxonomy_values=" + t.id}
										/>
									))}
								</div>

								<div className="PageJobOffer-companies">
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

						<div className="col-md-4">
							<div className="container">
								<div className="row PageJobOffer-social-media">
									<div className="col-md-12">
										<h3>Share on social media</h3>
									</div>

									<div className="col-md-12">
										<div className="PageJobOffer-social-media-links">
											<TwitterLink
												article={this.state.article}
											/>
											<LinkedInLink
												article={this.state.article}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					: 					<Loading
						height={200}
					/>
				}
			</div>
		);
	}
}
