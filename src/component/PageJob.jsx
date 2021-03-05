import React from "react";
import "./PageJob.css";
import { NotificationManager as nm } from "react-notifications";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import Collapsible from "react-collapsible";
import Lock from "./box/Lock.jsx";
import { getRequest } from "../utils/request.jsx";
import { getApiURL } from "../utils/env.jsx";
import { getContentFromBlock, getNextTitle1Position } from "../utils/article.jsx";
import Loading from "./box/Loading.jsx";
import Chip from "./form/Chip.jsx";
import Message from "./box/Message.jsx";
import Article from "./item/Article.jsx";

export default class PageJob extends React.Component {
	constructor(props) {
		super(props);

		this.getArticleContent = this.getArticleContent.bind(this);

		this.state = {
			article: null,
		};
	}

	componentDidMount() {
		this.getArticleContent();
	}

	getArticleContent() {
		this.setState({
			article: null,
		});

		getRequest.call(this, "public/get_article_content/" + this.props.match.params.id, (data) => {
			this.setState({
				article: data,
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
			<div className={"PageJob page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/jobs">JOBS</Link></Breadcrumb.Item>
							{this.state.article !== null && !this.state.loading
								? <Breadcrumb.Item><Link to={"/jobs/" + this.state.article.id}>{this.state.article.title}</Link></Breadcrumb.Item>
								: ""}
						</Breadcrumb>
					</div>
				</div>

				{this.state.article !== null && this.state.article.content !== undefined
					? <div className="row row-spaced">
						<div className="col-md-12">
							<article>
								<div className='PageJob-content-cover'>
									{this.state.article.image !== null
										? <img src={getApiURL() + "public/get_image/" + this.state.article.image}/>
										: ""}
									<div className='PageJob-publication-date'>
										{this.state.article.publication_date}
									</div>
								</div>

								<div className="PageJob-tags">
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
											const nextTitle1Position = getNextTitle1Position(i + 1, this.state.articleC.content);

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

								<div className="PageJob-tags">
									{this.state.article.tags.map((t) => (
										<Chip
											label={t.name}
										/>
									))}
								</div>

								<div className="right-buttons">
									<button
										className={"blue-background"}
									>
										<i className="fas fa-arrow-alt-circle-right"/> View original webpage
									</button>
								</div>
							</article>
						</div>
					</div>
					: 					<Loading
						height={400}
					/>
				}
			</div>
		);
	}
}
