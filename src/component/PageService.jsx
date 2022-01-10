import React from "react";
import "./PageService.css";
import dompurify from "dompurify";
import { NotificationManager as nm } from "react-notifications";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import Collapsible from "react-collapsible";
import { getRequest } from "../utils/request.jsx";
import { getApiURL } from "../utils/env.jsx";
import Loading from "./box/Loading.jsx";
import Chip from "./form/Chip.jsx";
import { getContentFromBlock, getNextTitle1Position } from "../utils/article.jsx";

export default class PageService extends React.Component {
	constructor(props) {
		super(props);

		this.getArticleContent = this.getArticleContent.bind(this);

		this.state = {
			article: null,
			articleLoading: false,
		};
	}

	componentDidMount() {
		this.getArticleContent();
	}

	getArticleContent() {
		this.setState({
			article: null,
			articleLoading: false,
		});

		getRequest.call(this, "public/get_article_content/" + this.props.match.params.handle, (data) => {
			this.setState({
				article: data,
				articleLoading: false,
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
		let positionToTreat = 0;

		return (
			<div className={"PageService page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							{this.state.article && !this.state.loading
								? <Breadcrumb.Item><Link to={"/service/" + this.props.match.params.handle}>{this.state.article.title}</Link></Breadcrumb.Item>
								: ""}
						</Breadcrumb>
					</div>
				</div>

				{this.state.article && this.state.article.content
					&& !this.state.articleLoading
					? <div className="row row-spaced">
						<div className="col-md-12">
							<article>
								<div className='PageService-content-cover'>
									{this.state.article.image !== null
										? <img src={getApiURL() + "public/get_public_image/" + this.state.article.image}/>
										: ""}
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

								{this.state.article.link !== null
									&& this.state.article.link !== undefined
									&& this.state.article.link.length > 0
									&& <div className="PageTool-external-link">
										<button
											onClick={() => window.open(this.state.article.link)}
										>
											<i className="fas fa-arrow-alt-circle-right"/> Open the source
										</button>
									</div>
								}
							</article>
						</div>
					</div>
					: <Loading
						height={400}
					/>
				}
			</div>
		);
	}
}
