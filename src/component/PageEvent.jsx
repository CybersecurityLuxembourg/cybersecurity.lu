import React from 'react';
import './PageEvent.css';
import Lock from "./box/Lock";
import {getRequest} from '../utils/request';
import {getApiURL} from '../utils/env';
import {NotificationManager as nm} from 'react-notifications';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from "react-router-dom";
import Loading from "./box/Loading";
import Chip from './form/Chip';
import Collapsible from 'react-collapsible';
import Message from "./box/Message";
import Article from './item/Article';


export default class PageEvent extends React.Component {

	constructor(props){
		super(props);

        this.getArticleContent = this.getArticleContent.bind(this);
        this.getContentFromBlock = this.getContentFromBlock.bind(this);
        this.getNextTitle1Position = this.getNextTitle1Position.bind(this);

		this.state = {
            article: null,
            relatedArticles: null,
            articleLoading: false,
            relatedArticleLoading: false
		}
	}

	componentDidMount() {
        this.getArticleContent()
	}

    getArticleContent(){
        this.setState({
            article: null,
            relatedArticles: null,
            articleLoading: false,
            relatedArticleLoading: false
        });

        getRequest.call(this, "public/get_article_content/" + this.props.match.params.handle, data => {
            this.setState({
                article: data,
                articleLoading: false
            });

            if (data.type === "NEWS") {
                getRequest.call(this, "public/get_related_articles/" + this.props.match.params.handle, data => {
                    this.setState({
                        relatedArticles: data,
                        relatedArticleLoading: false
                    });
                }, response => {
                    this.setState({ loading: false });
                    nm.warning(response.statusText);
                }, error => {
                    this.setState({ loading: false });
                    nm.error(error.message);
                });
            }

        }, response => {
            this.setState({ loading: false });
            nm.warning(response.statusText);
        }, error => {
            this.setState({ loading: false });
            nm.error(error.message);
        });
    }

    getContentFromBlock(b) {
        let el = null;

        if (b.type === "TITLE1")
            el = <h2 className="showFulltext clickable">{b.content}</h2>
        else if (b.type === "TITLE2")
            el = <h3>{b.content}</h3>
        else if (b.type === "TITLE3")
            el = <h4>{b.content}</h4>
        else if (b.type === "PARAGRAPH")
            el = <div dangerouslySetInnerHTML={{ __html: b.content }} />
        else if (b.type === "IMAGE") {
            if (b.content !== null) {
                el = <div class='PageEvent-content-media'>
                        <img src={getApiURL() + 'public/get_image/' + b.content}/>
                    </div>
            }
        } else if (b.type === "FRAME") {
            if (b.content !== null) {
                el = <div class='PageEvent-content-media'>
                        <div dangerouslySetInnerHTML={{ __html: b.content.replace("&lt;", "<").replace("&gt;", ">") }} />
                    </div>
            }
        }

        return el;
    }

    getNextTitle1Position(pos) {
        for (let i = pos + 1; i < this.state.article.content.length; i++) {
            if (this.state.article.content[i].type === "TITLE1") {
                return i + 1
            }
        }

        return this.state.article.content.length + 1
    }

	changeState(field, value) {
        this.setState({[field]: value});
    }

	render() {
        let positionToTreat = 0;

		return(
			<div className={"PageEvent page max-sized-page"}>
                <div className="row">
                    <div className="col-md-12">
                        <Breadcrumb>
                            <Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
                            <Breadcrumb.Item><Link to="/calendar">CALENDAR</Link></Breadcrumb.Item>
                            {this.state.article !== null && !this.state.loading ?
                            <Breadcrumb.Item><Link to={"/calendar/" + this.state.article.handle}>{this.state.article.title}</Link></Breadcrumb.Item>
                                : ""}
                        </Breadcrumb>
                    </div>
                </div>

                {this.state.article !== null && this.state.article.content !== undefined && !this.state.articleLoading ? 
                    <div className="row">
                        <div className={this.state.article.type === "NEWS" ? "col-md-8" : "col-md-12"}>
                            <article>
                                <div class='PageEvent-content-cover'>
                                    {this.state.article.image !== null ?
                                        <img src={getApiURL() + 'public/get_image/' + this.state.article.image}/>
                                    : ""}
                                    <div class='PageEvent-publication-date'>
                                        {this.state.article.publication_date}
                                    </div>
                                </div>

                                <div className="PageEvent-tags">
                                    {this.state.article.tags.map(t => { return (
                                        <Chip
                                            label={t.name}
                                        />
                                    )})}
                                </div>
                            
                                <h1 className="showFulltext">
                                    {this.state.article.title}
                                </h1>

                                {this.state.article.content.map((b, i) => { 
                                    if (positionToTreat <= i) {
                                        if (b.type === "TITLE1") {
                                            let nextTitle1Position = this.getNextTitle1Position(i + 1);

                                            let el =  
                                                <Collapsible trigger={this.getContentFromBlock(b)}>
                                                    {this.state.article.content
                                                        .slice(positionToTreat + 1, nextTitle1Position - 1)
                                                        .map(b2 => {
                                                        return this.getContentFromBlock(b2)
                                                    })}
                                                </Collapsible>

                                            positionToTreat = nextTitle1Position - 1

                                            return el
                                        } else {
                                            positionToTreat += 1
                                            return this.getContentFromBlock(b);
                                        }
                                    }
                                })}

                                <div className="PageEvent-tags">
                                    {this.state.article.tags.map(t => { return (
                                        <Chip
                                            label={t.name}
                                        />
                                    )})}
                                </div>
                            </article>
                        </div>
                        {this.state.article.type === "NEWS" ?
                            <div className="col-md-4">
                                <div class="container">
                                    <div className="row PageEvent-related-article">
                                        <div className="col-md-12">
                                            <h2>Related articles</h2>
                                            
                                            {this.state.relatedArticles !== null && !this.state.relatedArticleLoading ? 
                                                (this.state.relatedArticles.length > 0 ?
                                                    this.state.relatedArticles.map(a => { return (
                                                        <Article
                                                            title={a.title}
                                                            handle={a.handle}
                                                            date={a.publication_date}
                                                            abstract={a.abstract}
                                                            image={a.image}
                                                            tags={a.tags}
                                                        />
                                                    )})
                                                    
                                                :
                                                    <Message
                                                        text={"No related article found"}
                                                        height={150}
                                                    />
                                                )
                                            : 
                                                <Loading
                                                    height={150}
                                                />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        : ""}
                    </div>
                : 
                    <Loading
                        height={200}
                    />
                }
			</div>
		);
	}
}