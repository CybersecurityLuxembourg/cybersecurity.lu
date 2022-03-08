import React from "react";
import "./PageCSB.css";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { NotificationManager as nm } from "react-notifications";
import Loading from "./box/Loading.jsx";
import Message from "./box/Message.jsx";
import DynamicTable from "./table/DynamicTable.jsx";
import Event from "./item/Event.jsx";
import Article from "./item/Article.jsx";
import { dictToURI } from "../utils/url.jsx";
import { getRequest } from "../utils/request.jsx";
import { dateToString } from "../utils/date.jsx";
import ShadowBox from "./box/ShadowBox.jsx";

export default class PageCSB extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			news: null,
			events: null,
		};
	}

	componentDidMount() {
		this.getNews();
		this.getEvents();
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.analytics && this.props.analytics) {
			this.getNews();
			this.getEvents();
		}
	}

	getNews(page) {
		if (this.props.analytics
			&& this.props.analytics.taxonomy_values) {
			const values = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "ARTICLE CATEGORY")
				.filter((v) => v.name === "CYBERSECURITY BREAKFAST");

			if (values.length > 0) {
				const params = {
					type: "NEWS",
					include_tags: "true",
					taxonomy_values: values.map((v) => v.id).join(","),
					per_page: 6,
					page: page === undefined ? 1 : page,
				};

				getRequest.call(this, "public/get_public_articles?" + dictToURI(params), (data) => {
					this.setState({
						news: data,
					});
				}, (response) => {
					nm.warning(response.statusText);
				}, (error) => {
					nm.error(error.message);
				});
			} else {
				this.setState({
					news: { pagination: { total: 0 } },
				});
			}
		}
	}

	getEvents(page) {
		if (this.props.analytics
			&& this.props.analytics.taxonomy_values) {
			const values = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "ARTICLE CATEGORY")
				.filter((v) => v.name === "CYBERSECURITY BREAKFAST");

			if (values.length > 0) {
				const params = {
					type: "EVENT",
					include_tags: "true",
					taxonomy_values: values.map((v) => v.id).join(","),
					per_page: 6,
					page: page === undefined ? 1 : page,
					min_end_date: dateToString(new Date()),
					order_by: "start_date",
					order: "asc",
				};

				getRequest.call(this, "public/get_public_articles?" + dictToURI(params), (data) => {
					this.setState({
						events: data,
					});
				}, (response) => {
					nm.warning(response.statusText);
				}, (error) => {
					nm.error(error.message);
				});
			} else {
				this.setState({
					events: { pagination: { total: 0 } },
				});
			}
		}
	}

	render() {
		return (
			<div id="PageCSB" className={"page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/breakfast">CYBERSECURITY BREAKFAST</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-6">
						<img
							className="PageCSB-image"
							src={"img/csb_series.jpg"}
							alt={"SECURITYMADEIN.LU"}
						/>
					</div>

					<div className="col-md-6">
						<div className="row PageCSB-description">
							<div className="col-md-12">
								<p>
									CYBERSECURITY Breakfast series (CSB) is a 1-hour monthly
									&quot;rendez-vous&quot; (breakfast time CET – 09.15-10.15).
								</p>

								<p>
									Every month, CSB tackles another trending or pressing topic.
									A panel of key experts is invited to discuss it.
								</p>
							</div>

							<div className="col-md-5">
								<ShadowBox
									title="Keynote"
									abstract="15 minutes"
									color="black"
								/>
							</div>

							<div className="col-md-7">
								<ShadowBox
									title="Round table discussion"
									abstract="45 minutes"
									color="black"
								/>
							</div>

							<div className="col-md-12">
								<p>
									Each CSB episode is live streamed and made available in podcast
									afterwards (access our podcast series <a
										href="https://peertube.securitymadein.lu/c/podcasts/videos?s=1"
										target="_blank"
										rel="noreferrer"
									>
										here
									</a> or on <a
										href="https://podcasts.apple.com/lu/podcast/cybersecurity-breakfast-podcast/id1607508932"
										target="_blank"
										rel="noreferrer"
									>
										Apple podcast
									</a>).
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-12">
						<h1>Upcoming CSB</h1>
					</div>

					<div className="col-md-12">
						{this.state.events && this.state.events.pagination.total > 0
							&& <DynamicTable
								items={this.state.events.items}
								pagination={this.state.events.pagination}
								changePage={(page) => this.getNews(page)}
								buildElement={(a) => <div className="col-md-4">
									<Event
										info={a}
										analytics={this.props.analytics}
									/>
								</div>
								}
							/>
						}

						{this.state.events && this.state.events.pagination.total === 0
							&& <Message
								text={"No upcoming CSB found"}
								height={300}
							/>
						}

						{!this.state.events
							&& <Loading
								height={300}
							/>
						}
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-12">
						<h1>Past CSB</h1>

						{this.state.news && this.state.news.pagination.total > 0
							&& <DynamicTable
								items={this.state.news.items}
								pagination={this.state.news.pagination}
								changePage={(page) => this.getNews(page)}
								buildElement={(a) => <div className="col-md-4">
									<Article
										info={a}
										analytics={this.props.analytics}
									/>
								</div>
								}
							/>
						}

						{this.state.news && this.state.news.pagination.total === 0
							&& <Message
								text={"No CSB recap found"}
								height={300}
							/>
						}

						{!this.state.news
							&& <Loading
								height={300}
							/>
						}
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<h1>Get visible by sponsoring a CSB episode!</h1>

						<p>
							You want to become partner of a CSB episode? 2
							options are available for you!
						</p>
					</div>
				</div>

				<div className="row row-spaced PageCSB-options">
					<div className="col-md-4">
					</div>
					<div className="col-md-4 centered">
						<h3>VISIBILITY Package</h3>
					</div>
					<div className="col-md-4 centered">
						<h3>EXCLUSIVITY Package</h3>
					</div>

					<div className="col-md-4 PageCSB-options-criteria">
						<h4>Price</h4>
					</div>
					<div className="col-md-4">
						<div className="shadow-section blue-shadow-section centered-shadow-section">
							<div className={"PageCSB-options-mobile"}>
								VISIBILITY Package
							</div>
							<h4>
								500€ (+ VAT)
							</h4>
						</div>
					</div>
					<div className="col-md-4">
						<div className="shadow-section blue-shadow-section centered-shadow-section">
							<div className={"PageCSB-options-mobile"}>
								EXCLUSIVITY Package
							</div>
							<h4>
								2000€ (+ VAT)
							</h4>
						</div>
					</div>

					<div className="col-md-4 PageCSB-options-criteria">
						<h4>Exclusive sponsoring</h4>
					</div>
					<div className="col-md-4">
						<div className="shadow-section grey-shadow-section centered-shadow-section">
							<div className={"PageCSB-options-mobile"}>
								VISIBILITY Package
							</div>
							<h4>
								No
							</h4>
						</div>
					</div>
					<div className="col-md-4">
						<div className="shadow-section blue-shadow-section centered-shadow-section">
							<div className={"PageCSB-options-mobile"}>
								EXCLUSIVITY Package
							</div>
							<h4>
								Yes
							</h4>
						</div>
					</div>

					<div className="col-md-4 PageCSB-options-criteria">
						<h4>Keynote speech</h4>
					</div>
					<div className="col-md-4">
						<div className="shadow-section grey-shadow-section centered-shadow-section">
							<div className={"PageCSB-options-mobile"}>
								VISIBILITY Package
							</div>
							<h4>
								No
							</h4>
						</div>
					</div>
					<div className="col-md-4">
						<div className="shadow-section blue-shadow-section centered-shadow-section">
							<div className={"PageCSB-options-mobile"}>
								EXCLUSIVITY Package
							</div>
							<h4>
								Yes
							</h4>
						</div>
					</div>

					<div className="col-md-4 PageCSB-options-criteria">
						<h4>Participation in the selection of round table speakers</h4>
					</div>
					<div className="col-md-4">
						<div className="shadow-section grey-shadow-section centered-shadow-section">
							<div className={"PageCSB-options-mobile"}>
								VISIBILITY Package
							</div>
							<h4>
								No
							</h4>
						</div>
					</div>
					<div className="col-md-4">
						<div className="shadow-section blue-shadow-section centered-shadow-section">
							<div className={"PageCSB-options-mobile"}>
								EXCLUSIVITY Package
							</div>
							<h4>
								Yes
							</h4>
						</div>
					</div>

					<div className="col-md-4 PageCSB-options-criteria">
						<h4>Logo appearance</h4>
					</div>
					<div className="col-md-4">
						<div className="shadow-section blue-shadow-section centered-shadow-section">
							<div className={"PageCSB-options-mobile"}>
								VISIBILITY Package
							</div>
							<h4>
								On promotion support created for the sponsored CSB
							</h4>
						</div>
					</div>
					<div className="col-md-4">
						<div className="shadow-section blue-shadow-section centered-shadow-section">
							<div className={"PageCSB-options-mobile"}>
								EXCLUSIVITY Package
							</div>
							<h4>
								On promotion support created for the sponsored CSB
							</h4>
						</div>
					</div>

					<div className="col-md-4 PageCSB-options-criteria">
					</div>
					<div className="col-md-4">
						<div className="shadow-section blue-shadow-section centered-shadow-section">
							<div className={"PageCSB-options-mobile"}>
								VISIBILITY Package
							</div>
							<h4>
								On the CSB visuals used for the live stream
							</h4>
						</div>
					</div>
					<div className="col-md-4">
						<div className="shadow-section blue-shadow-section centered-shadow-section">
							<div className={"PageCSB-options-mobile"}>
								EXCLUSIVITY Package
							</div>
							<h4>
								On the CSB visuals used for the live stream
							</h4>
						</div>
					</div>

					<div className="col-md-4 PageCSB-options-criteria">
					</div>
					<div className="col-md-4">
						<div className="shadow-section blue-shadow-section centered-shadow-section">
							<div className={"PageCSB-options-mobile"}>
								VISIBILITY Package
							</div>
							<h4>
								On the CSB invitation mailing
							</h4>
						</div>
					</div>
					<div className="col-md-4">
						<div className="shadow-section blue-shadow-section centered-shadow-section">
							<div className={"PageCSB-options-mobile"}>
								EXCLUSIVITY Package
							</div>
							<h4>
								On the CSB invitation mailing
							</h4>
						</div>
					</div>

					<div className="col-md-4 PageCSB-options-criteria">
						<h4>
							Mention of your organisation and your keynote
							speaker in all social media posts related to the CSB
						</h4>
					</div>
					<div className="col-md-4">
						<div className="shadow-section blue-shadow-section centered-shadow-section">
							<div className={"PageCSB-options-mobile"}>
								VISIBILITY Package
							</div>
							<h4>
								Yes
							</h4>
						</div>
					</div>
					<div className="col-md-4">
						<div className="shadow-section blue-shadow-section centered-shadow-section">
							<div className={"PageCSB-options-mobile"}>
								EXCLUSIVITY Package
							</div>
							<h4>
								Yes
							</h4>
						</div>
					</div>

					<div className="col-md-4 PageCSB-options-criteria">
						<h4>
							Mention of your organisation in the RECAP article of
							the CSB, published on cybersecurity.lu
						</h4>
					</div>
					<div className="col-md-4">
						<div className="shadow-section blue-shadow-section centered-shadow-section">
							<div className={"PageCSB-options-mobile"}>
								VISIBILITY Package
							</div>
							<h4>
								Yes
							</h4>
						</div>
					</div>
					<div className="col-md-4">
						<div className="shadow-section blue-shadow-section centered-shadow-section">
							<div className={"PageCSB-options-mobile"}>
								EXCLUSIVITY Package
							</div>
							<h4>
								Yes
							</h4>
						</div>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-6">
						<ShadowBox
							link="img/01-CSB_sponsorship_packages_2022.pdf"
							title="Download the brochure here"
							icon="fas fa-file-pdf"
						/>
					</div>

					<div className="col-md-6">
						<a
							href="mailto:info@cybersecurity-luxembourg.com"
							subject="Organisation of a Cybersecurity Breakfast">
							<ShadowBox
								title="Interested? Get in touch with us"
								icon="fas fa-envelope-open-text"
							/>
						</a>
					</div>
				</div>
			</div>
		);
	}
}
