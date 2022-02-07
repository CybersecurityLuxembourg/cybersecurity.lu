import React from "react";
import "./PageHome.css";
import { NotificationManager as nm } from "react-notifications";
import Loading from "./box/Loading.jsx";
import Message from "./box/Message.jsx";
import ShadowBoxPcDoctor from "./box/ShadowBoxPcDoctor.jsx";
import ShadowBoxPureStartup from "./box/ShadowBoxPureStartup.jsx";
import ShadowBoxEducation from "./box/ShadowBoxEducation.jsx";
import ShadowBoxCyber4Growth from "./box/ShadowBoxCyber4Growth.jsx";
import ShadowBoxECSC from "./box/ShadowBoxECSC.jsx";
import ShadowBoxJobs from "./box/ShadowBoxJobs.jsx";
import PageHomeLatestNews from "./pagehome/PageHomeLatestNews.jsx";
import { getRequest } from "../utils/request.jsx";
import Article from "./item/Article.jsx";
import { dictToURI } from "../utils/url.jsx";

export default class PageHome extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			callToActionNews: null,
			callToActionNewsCompany: null,
		};
	}

	componentDidMount() {
		this.getCallToActionNews();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.analytics === null && this.props.analytics !== null) {
			this.getCallToActionNews();
		}
	}

	getCallToActionNews() {
		if (this.props.analytics
			&& this.props.analytics.taxonomy_values) {
			const values = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "ARTICLE CATEGORY")
				.filter((v) => v.name === "CALL TO ACTION");

			if (values > 0) {
				const params = {
					type: "NEWS",
					include_tags: "true",
					taxonomy_values: values.map((v) => v.id).join(","),
					per_page: 3,
					page: 1,
				};

				getRequest.call(this, "public/get_public_articles?" + dictToURI(params), (data) => {
					this.setState({
						callToActionNews: data,
					}, () => {
						const params2 = {
							ids: Array.prototype.concat.apply(
								[],
								data.items
									.filter((i) => i.company_tags)
									.map((i) => i.company_tags),
							),
						};

						getRequest.call(this, "public/get_public_companies?" + dictToURI(params2), (data2) => {
							this.setState({
								callToActionNewsCompanies: data2,
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
			} else {
				this.setState({
					callToActionNews: { pagination: { total: 0 } },
				});
			}
		}
	}

	getNewsContent(news) {
		if (!news) {
			return <Loading
				height={150}
			/>;
		}

		if (this.props.analytics) {
			if (news.pagination.total === 0) {
				return <Message
					text={"No article found"}
					height={150}
				/>;
			}

			return news.items.map((a) => <div
				className={"col-md-4"}
				key={a.id}>
				<Article
					info={a}
					companies={this.state.callToActionNewsCompany}
				/>
			</div>);
		}

		return "";
	}

	// eslint-disable-next-line class-methods-use-this
	getBackgroundPetal() {
		return <ul className="Background-petals">
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
		</ul>;
	}

	// eslint-disable-next-line class-methods-use-this
	getBackgroundPetalBottom() {
		return <ul className="Background-petals-bottom">
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
		</ul>;
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	render() {
		return (
			<div id={"PageHome"}>
				<div className="PageHome-banner">
					<div className="max-sized-page">
						<div className="row row-spaced">
							<div className="col-md-6">
								<div className="shadow-section blue-shadow-section centered-shadow-section">
									ddddddddddddddddd
								</div>
							</div>
							<div className="col-md-6">
								<div className="shadow-section blue-shadow-section centered-shadow-section">
									gggddddddddddddddddddddddddddd
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="blue-bordered">
					{this.getBackgroundPetal()}
					{this.getBackgroundPetalBottom()}

					<div className="max-sized-page">
						<div className="row">
							<div className="col-md-12">
								<h1>Latest news</h1>
							</div>

							<div className="col-md-12">
								<PageHomeLatestNews/>
							</div>
						</div>
					</div>
				</div>

				<div className="black-bordered">
					{this.getBackgroundPetal()}
					{this.getBackgroundPetalBottom()}

					<div className="max-sized-page">
						<div className="row row-spaced">
							<div className="col-md-12">
								<h1>View on our programmes & challenges</h1>
							</div>

							<div className="col-md-6">
								<ShadowBoxCyber4Growth/>
							</div>
							<div className="col-md-6">
								<ShadowBoxECSC/>
							</div>
						</div>
					</div>
				</div>

				<div className="red-bordered">
					{this.getBackgroundPetal()}
					{this.getBackgroundPetalBottom()}

					<div className="max-sized-page">
						<div className="row">
							<div className="col-md-12">
								<h1>Ecosystem highlights</h1>
							</div>
						</div>

						<div className="row row-spaced">
							<div className="col-md-6">
								<ShadowBoxPcDoctor
									analytics={this.props.analytics}
									color={"red"}
								/>
							</div>
							<div className="col-md-6">
								<ShadowBoxPureStartup
									color={"red"}
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="black-bordered">
					{this.getBackgroundPetal()}
					{this.getBackgroundPetalBottom()}

					<div className="max-sized-page">
						<div className="row">
							<div className="col-md-12">
								<h1>Education & jobs</h1>
							</div>

							<div className="col-md-6">
								<ShadowBoxEducation
									{...this.props}
								/>
							</div>
							<div className="col-md-6">
								<ShadowBoxJobs
									{...this.props}
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="blue-bordered">
					{this.getBackgroundPetal()}
					{this.getBackgroundPetalBottom()}

					<div className="max-sized-page">
						<div className="row">
							<div className="col-md-12">
								<h1>Be visible & take part in the initiatives</h1>
							</div>

							<div className="col-md-3"/>
							<div className="col-md-6">
								d
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
