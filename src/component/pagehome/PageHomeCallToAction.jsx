import React from "react";
import "./PageHomeCallToAction.css";
import { NotificationManager as nm } from "react-notifications";
import { Link } from "react-router-dom";
import { getRequest } from "../../utils/request.jsx";
import { dateToString } from "../../utils/date.jsx";
import Loading from "../box/Loading.jsx";
import NoImage from "../box/NoImage.jsx";
import Message from "../box/Message.jsx";
import { getApiURL } from "../../utils/env.jsx";
import { dictToURI } from "../../utils/url.jsx";

export default class PageHomeCallToAction extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			callToAction: null,
			selectedCallToAction: 0,
		};
	}

	componentDidMount() {
		this.fetchCallToAction();

		this.setState({
			timer: setInterval(() => {
				this.changeNews();
			}, 5000),
		});
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.analytics && this.props.analytics) {
			this.fetchCallToAction();
		}
	}

	componentWillUnmount() {
		clearInterval(this.state.timer);
	}

	fetchCallToAction(page) {
		if (this.props.analytics) {
			const values = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "ARTICLE CATEGORY")
				.filter((v) => v.name === "CALL TO ACTION");

			if (values.length > 0) {
				const params = {
					type: "NEWS",
					page: page || 1,
					per_page: 5,
					taxonomy_values: values.map((v) => v.id),
					order_by: "start_date",
					order: "asc",
					min_end_date: dateToString(new Date()),
				};

				getRequest.call(this, "public/get_public_articles?"
					+ dictToURI(params), (data) => {
					this.setState({
						callToAction: data,
					});
				}, (response) => {
					nm.warning(response.statusText);
				}, (error) => {
					nm.error(error.message);
				});
			} else {
				this.setState({
					callToAction: { pagination: { total: 0 } },
				});
			}
		}
	}

	changeNews() {
		if (this.state.callToAction) {
			if (!this.state.selectedCallToAction === null) {
				this.setState({ selectedCallToAction: 0 });
			} else if (this.state.callToAction.pagination.total
				<= this.state.selectedCallToAction + 1) {
				this.setState({ selectedCallToAction: 0 });
			} else {
				this.setState({ selectedCallToAction: this.state.selectedCallToAction + 1 });
			}
		}
	}

	render() {
		if (!this.state.callToAction) {
			return <div className={"col-md-12"}>
				<Loading
					height={300}
				/>
			</div>;
		}

		if (this.state.callToAction.pagination.total === 0) {
			return <div className={"col-md-12"}>
				<Message
					text={"No call to action found"}
					height={300}
				/>
			</div>;
		}

		return <div id="PageHomeCallToAction" className={"row"}>
			<div className={"col-md-8"}>
				<div className={"row"}>
					{this.state.callToAction.items.map((c, i) => <div
						key={c.id}
						className={"col-md-12"}>
						{c.link !== null
							&& c.link !== undefined
							&& c.link.length > 0
							? <a
								href={c.link}
								target={"_blank"}
								rel="noreferrer"
								className="Article-link">
								<div className={"PageHomeCallToAction-article "
									+ (this.state.selectedCallToAction === i && "PageHomeCallToAction-article-selected")}>
									<div className={"PageHomeCallToAction-title"}>
										{c.title}
									</div>
								</div>
							</a>
							: <Link
								to={"/news/" + c.handle}
								className="Article-link">
								<div className={"PageHomeCallToAction-article "
									+ (this.state.selectedCallToAction === i && "PageHomeCallToAction-article-selected")}>
									<div className={"PageHomeCallToAction-title"}>
										{c.title}
									</div>
								</div>
							</Link>
						}
					</div>)}
				</div>
			</div>

			<div className={"col-md-4"}>
				<div className={"PageHomeCallToAction-image"}>
					{this.state.callToAction.items[this.state.selectedCallToAction].image
						? <img
							src={getApiURL() + "public/get_public_image/"
								+ this.state.callToAction.items[this.state.selectedCallToAction].image}
							alt="Article image"/>
						: <NoImage/>
					}
				</div>
			</div>
		</div>;
	}
}
