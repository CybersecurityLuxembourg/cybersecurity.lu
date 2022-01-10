import React from "react";
import "./PageHome.css";
import { NotificationManager as nm } from "react-notifications";
import SearchField from "./form/SearchField.jsx";
import Loading from "./box/Loading.jsx";
import Message from "./box/Message.jsx";
import Analytic from "./box/Analytic.jsx";
import ShadowBoxPcDoctor from "./box/ShadowBoxPcDoctor.jsx";
import ShadowBoxPureStartup from "./box/ShadowBoxPureStartup.jsx";
import ShadowBoxMyCyberlux from "./box/ShadowBoxMyCyberlux.jsx";
import ShadowBoxSubscribeNewsletter from "./box/ShadowBoxSubscribeNewsletter.jsx";
import { getRequest } from "../utils/request.jsx";
import Article from "./item/Article.jsx";
import "react-responsive-carousel/lib/styles/carousel.min.css";
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
				<div className="blue-bordered">
					{this.getBackgroundPetal()}
					{this.getBackgroundPetalBottom()}

					<div className="max-sized-page">
						<div className="row">
							<div className="col-md-12">
								<h1>Call to action</h1>
							</div>

							{this.getNewsContent(this.state.callToActionNews)}
						</div>
					</div>
				</div>

				<div className="black-bordered">
					{this.getBackgroundPetal()}
					{this.getBackgroundPetalBottom()}

					<div className="max-sized-page">
						<div className="row row-spaced">
							<div className="col-md-12">
								<h1>Search over the portal</h1>
							</div>

							<div className="col-md-2"/>
							<div className="col-md-8">
								<SearchField/>
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
								<h1>CYBERSECURITY Luxembourg company selection</h1>
							</div>
						</div>

						<div className="row row-spaced">
							<div className="col-md-4">
								<ShadowBoxPcDoctor
									analytics={this.props.analytics}
									color={"red"}
								/>
							</div>
							<div className="col-md-4">
								<ShadowBoxPureStartup
									color={"red"}
								/>
							</div>
							<div className="col-md-4">
								<ShadowBoxMyCyberlux/>
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
								<h1>Subscribe to the newsletter</h1>
							</div>

							<div className="col-md-3"/>
							<div className="col-md-6">
								<ShadowBoxSubscribeNewsletter
									{...this.props}
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="red-bordered">
					{this.getBackgroundPetal()}
					{this.getBackgroundPetalBottom()}

					<div className="max-sized-page">
						<div className="row row-spaced">
							<div className="col-md-12">
								<h1>Ecosystem overview</h1>
							</div>

							<div className="col-md-12">
								{this.state.analytics !== null
									? <div className={"row"}>
										<div className="col-md-4">
											<a
												className={"PageHome-link"}
												href={"/privatesector"}
											>
												<Analytic
													value={this.props.privateSectorCount
														? this.props.privateSectorCount : 0}
													desc={"Private companies"}
												/>
											</a>
										</div>
										<div className="col-md-4">
											<a
												className={"PageHome-link"}
												href={"/publicsector"}
											>
												<Analytic
													value={this.props.publicSectorCount
														? this.props.publicSectorCount : 0}
													desc={"Public entities"}
												/>
											</a>
										</div>
										<div className="col-md-4">
											<a
												className={"PageHome-link"}
												href={"/civilsociety"}
											>
												<Analytic
													value={this.props.civilSocietyCount
														? this.props.civilSocietyCount : 0}
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
						</div>
					</div>
				</div>
			</div>
		);
	}
}
