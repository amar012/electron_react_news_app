import React from 'react';
import {CardDeck, Card, CardBody, CardText, CardFooter, CardLink} from 'reactstrap';

import {ArticleHead} from '../components/articleHead';
import {getNews, urlUS, urlIN, urlPrefix} from '../news';
import {urlKey} from '../config/key';

export class ArticleContainer extends React.Component {
    constructor(props) {
	super(props);
	this.state = {articles: []};
	this.fetchNews = this.fetchNews.bind(this);
	// this.showArticle = this.showArticle.bind(this);
    }

    async fetchNews(urlVar) {
	fetch(urlVar).then(resp => resp.json()).then(res => res.articles).then(articles => this.setState({articles: articles}));
    }

/*
    componentDidMount() {
	this.fetchNews();
    }

    showArticle(artUrl) {
	window.open(artUrl, "_blank");
    }
*/

    render() {
	return (
	  <div>
	    <CardDeck>
		<div style={{display: "inline-block"}}>
		<button style={{width: "48%", marginRight: "4%" }} onClick={(e) => this.fetchNews(urlPrefix + e.target.innerText + urlKey)}>US</button>
		<button style={{width: "48%"}} onClick={() => this.fetchNews(urlIN)}>IN</button>
		</div><br />
		{ 
		    this.state.articles.map(article => 
			<div><Card>
			        <div><ArticleHead article={article} /></div>
			        <div><CardBody className="mt-3">
				    <CardText className="text-info">{typeof article.content !== 'undefined' ? article.content : "article content is undefined"}</CardText>
				</CardBody></div>
			        <CardFooter className="d-flex"><span className="mr-auto"><small  className="text-muted font-italic">{article.source.name}</small></span>
					{article.author ? <span className="ml-auto font-weight-light"><small className="text-muted">{article.author} </small></span> : ''}
				</CardFooter>
		             </Card>
			    <div><button className="btn btn-primary" onClick={() => window.open(article.url, "_blank")}>Read more ...</button></div><hr /><br />	
			</div>)
	        }
	    </CardDeck>
	  </div>
	)
    }
}