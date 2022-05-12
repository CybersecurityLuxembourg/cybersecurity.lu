import React from "react";
import "./PageHomeComingEvents.css";
import { Link } from "react-router-dom";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../../utils/request.jsx";
import Loading from "../box/Loading.jsx";
import NoImage from "../box/NoImage.jsx";
import Message from "../box/Message.jsx";
import { getApiURL } from "../../utils/env.jsx";
import { dictToURI } from "../../utils/url.jsx";
import { dateToString } from "../../utils/date.jsx";

export default class PageHomeComingEvents extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			news: null,
			selectedNews: 0,
		};
	}

	componentDidMount() {
		this.getNews();

		this.setState({
			timer: setInterval(() => {
				this.changeNews();
			}, 5000),
		});
	}

	componentWillUnmount() {
		clearInterval(this.state.timer);
	}

	getNews() {
		const params = {
			type: "EVENT",
			per_page: 5,
			order_by: "start_date",
			order: "asc",
			min_end_date: dateToString(new Date()),
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
	}

	changeNews() {
		if (this.state.news) {
			if (this.state.selectedNews === null) {
				this.setState({ selectedNews: 0 });
			} else if (this.state.news.items.length <= this.state.selectedNews + 1) {
				this.setState({ selectedNews: 0 });
			} else {
				this.setState({ selectedNews: this.state.selectedNews + 1 });
			}
		}
	}

	getBoxContent(article, i) {
		return <div className={"PageHomeComingEvents-article "
			+ (this.state.selectedNews === i && "PageHomeComingEvents-article-selected")}>
			<div className={"PageHomeComingEvents-date"}>
				{article.start_date.split("T")[0]}&nbsp;-&nbsp;
			</div>
			<div className={"PageHomeComingEvents-title"}>
				{article.title}
			</div>
		</div>;
	}

	render() {
		if (!this.state.news) {
			return <div className={"col-md-12"}>
				<Loading
					height={300}
				/>
			</div>;
		}

		if (this.state.news.pagination.total === 0) {
			return <div className={"col-md-12"}>
				<Message
					text={"No call to action found"}
					height={300}
				/>
			</div>;
		}

		return <div id="PageHomeComingEvents" className={"row"}>
			<div className={"col-md-4"}>
				<div className={"PageHomeComingEvents-image"}>
					{this.state.news.items[this.state.selectedNews].image
						? <img
							src={getApiURL() + "public/get_public_image/"
								+ this.state.news.items[this.state.selectedNews].image}
							alt="Article image"/>
						: <NoImage/>
					}
				</div>
			</div>

			<div className={"col-md-8"}>
				<div className={"row"}>
					{this.state.news.items.map((c, i) => <div
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
								{this.getBoxContent(c, i)}
							</a>
							: <Link
								to={"/news/" + c.handle}
								className="Article-link">
								{this.getBoxContent(c, i)}
							</Link>
						}
					</div>)}
				</div>
			</div>
		</div>;
	}
}
