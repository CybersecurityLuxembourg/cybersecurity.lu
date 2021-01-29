import React from 'react';
import './PageCalendar.css';
import Loading from "./box/Loading";
import {getRequest} from '../utils/request';
import {NotificationManager as nm} from 'react-notifications';
import Event from './item/Event';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from "react-router-dom";
import Message from "./box/Message";
import { dictToURI } from "../utils/url";
import ArticleSearch from './form/ArticleSearch';
import { Calendar, momentLocalizer  } from 'react-big-calendar';
import BigCalendar from 'react-big-calendar'
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
const localizer = momentLocalizer(moment)


export default class PageCalendar extends React.Component {

    constructor(props){
        super(props);

        this.getArticles = this.getArticles.bind(this);
        this.modifyFilters = this.modifyFilters.bind(this);

        this.state = {
            articles: null,
            loading: false,
            filters: {
                "media": "CYBERLUX",
                "type": "Event",
                "taxonomy_values": [],
                "title": null
            }
        }
    }

    componentDidMount() {
        this.getArticles()
    }

    getArticles() {
        this.setState({
            loading: true
        });

        let params = dictToURI(this.state.filters)

        getRequest.call(this, "public/get_public_articles?" + params, data => {
            this.setState({
                articles: data,
                loading: false
            });
        }, response => {
            this.setState({ loading: false });
            nm.warning(response.statusText);
        }, error => {
            this.setState({ loading: false });
            nm.error(error.message);
        });
    }

    modifyFilters(field, value) {
        let filters = {...this.state.filters};
        filters[field] = value
        this.setState({ filters: filters });
    }

	render() {
        const ColoredDateCellWrapper = ({ children }) =>
            React.cloneElement(React.Children.only(children), {
                style: {
                    backgroundColor: 'lightblue',
                },
            })

        if (this.state.articles !== null)
            console.log(this.state.articles.map(e => { return (
                                            {
                                                title: e.title,
                                                start: new Date(e.publication_date),
                                                end: new Date(e.publication_date)
                                            }
                                        )}))
        

		return(
			<div className={"page max-sized-page"}>
                <div className="row">
                    <div className="col-md-12">
                        <Breadcrumb>
                            <Breadcrumb.Item><Link to="/">SECURITYMADEIN.LU</Link></Breadcrumb.Item>
                            <Breadcrumb.Item><Link to="/calendar">CALENDAR</Link></Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>

                <ArticleSearch
                    filters={this.state.filters}
                    onChange={this.modifyFilters}
                    onSearch={this.getArticles}
                />

                <div className="row row-spaced">
                    <div className="col-md-12">
                        <h1>Calendar</h1>
                    </div>
                    {this.state.articles !== null && !this.state.loading ? 
                        (this.state.articles.length === 0 ?
                            <div className="col-md-12">
                                <Message
                                    text={"No event found"}
                                    height={200}
                                />
                            </div>
                        : 
                            <div className="col-md-12">
                                <Calendar
                                    events={this.state.articles.map(e => { return (
                                        {
                                            title: e.title,
                                            start: new Date(e.publication_date),
                                            end: new Date(e.publication_date),
                                            handle: e.handle
                                        }
                                    )})}
                                    step={60}
                                    showMultiDayTimes
                                    defaultDate={new Date()}
                                    components={{
                                        timeSlotWrapper: ColoredDateCellWrapper,
                                    }}
                                    localizer={localizer}
                                    style={{ 
                                        height: 700 
                                    }}
                                    onSelectEvent={event => this.props.history.push("/event/" + event.handle)}
                                />
                            </div>
                        )
                    :
                        <Loading
                            height={200}
                        />
                    }
                </div>

                <div className="row row-spaced">
                    <div className="col-md-12">
                        <h1>Events</h1>
                    </div>
                    {this.state.articles !== null && !this.state.loading ? 
                        (this.state.articles.length === 0 ?
                            <div className="col-md-12">
                                <Message
                                    text={"No article found"}
                                    height={200}
                                />
                            </div>
                        : 
                            this.state.articles.map(a => { return (
                                <div className="col-md-4">
                                    <Event
                                        info={a}
                                    />
                                </div>
                            )})
                        )
                    : 
                        <Loading
                            height={200}
                        />
                    }
                </div>
			</div>
		);
	}
}