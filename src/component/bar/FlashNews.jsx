import React from "react";
import "./FlashNews.css";
import { NotificationManager as nm } from "react-notifications";
import { Link } from "react-router-dom";
import { getRequest } from "../../utils/request.jsx";
import { dictToURI } from "../../utils/url.jsx";

export default class FlashNews extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			news: null,
		};
	}

	componentDidMount() {
		this.getNews();
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.analytics && this.props.analytics) {
			this.getNews();
		}
	}

	getNews() {
		if (this.props.analytics
			&& this.props.analytics.taxonomy_values) {
			const values = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "ARTICLE CATEGORY")
				.filter((v) => v.name === "IMPORTANT NEWS");

			if (values.length > 0) {
				const params = {
					type: "NEWS",
					taxonomy_values: values.map((v) => v.id).join(","),
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

	render() {
		if (!this.state.news || this.state.news.pagination.total === 0) {
			return "";
		}

		return (
			<div className="FlashNews">
				<div className="FlashNews-wrapper">
					{[...Array(parseInt(50 / this.state.news.items.length, 10)).keys()].map(() => (
						this.state.news.items.map((n) => (
							<div key={n.id}>
								{n.link
									? <a
										href={n.link}
										target={"_blank"}
										rel="noreferrer">
										{n.title}
									</a>
									: <Link to={"/news/" + n.handle}>
										{n.title}
									</Link>
								}
							</div>
						))
					))}
				</div>
			</div>
		);
	}
}
