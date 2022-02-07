import React from "react";
import "./PageHomeLatestNews.css";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../../utils/request.jsx";
import Loading from "../box/Loading.jsx";
import NoImage from "../box/NoImage.jsx";
import { getApiURL } from "../../utils/env.jsx";

export default class PageHomeLatestNews extends React.Component {
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
		getRequest.call(this, "public/get_public_articles?type=NEWS&per_page=6", (data) => {
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

	render() {
		if (!this.state.news || !this.state.selectedNews === null) {
			return <div className={"col-md-12"}>
				<Loading
					height={300}
				/>
			</div>;
		}

		return <div id="PageHomeLatestNews" className={"row"}>
			<div className={"col-md-4"}>
				<div className={"PageHomeLatestNews-image"}>
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
						<a href={c.link}>
							<div className={"PageHomeLatestNews-article "
								+ (this.state.selectedNews === i && "PageHomeLatestNews-article-selected")}>
								<div className={"PageHomeLatestNews-date"}>
									{c.publication_date}&nbsp;-&nbsp;
								</div>
								<div className={"PageHomeLatestNews-title"}>
									{c.title}
								</div>
							</div>
						</a>
					</div>)}
				</div>
			</div>
		</div>;
	}
}
