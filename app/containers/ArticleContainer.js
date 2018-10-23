import React from 'react';
import {CardDeck, Card, CardBody, CardText, CardFooter, Button, ButtonGroup,
	ButtonToolbar} from 'reactstrap';

import {ArticleHead} from '../components/articleHead';
import {getNews, urlUS, urlIN, urlPrefix, countries} from '../news';
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
	let newsButtons = [];
	for (const [k,v] of Object.entries(countries)) {
		newsButtons.push(<Button id={k} onClick={(e) => this.fetchNews(urlPrefix + e.target.innerText + urlKey)}>{v}</Button>)
	}
	return (
	  <div>
	    <CardDeck>
		<ButtonToolbar className="mb-2"><ButtonGroup>{newsButtons}</ButtonGroup></ButtonToolbar>

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