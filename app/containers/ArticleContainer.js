import React from 'react';
import {CardDeck, Card, CardBody, CardText, CardFooter, Button, ButtonGroup,
	ButtonToolbar, UncontrolledTooltip} from 'reactstrap';
import Tippy from '@tippy.js/react';
// import 'tippy.js/dist/tippy.css';

import {ArticleHead} from '../components/articleHead';
import {getNews, urlUS, urlIN, urlPrefix, countries} from '../news';
import {urlKey} from '../config/key';

export class ArticleContainer extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
		articles: [], 
		toolTipOpen: false, 
		isFetchingArticles: false, 
		country: '', 
		isError: false
	};
	this.fetchNews = this.fetchNews.bind(this);
	this.toggle = this.toggle.bind(this);
	// this.showArticle = this.showArticle.bind(this);
    }

    async fetchNews(urlVar) {
		this.setState({isFetchingArticles: true})
		await fetch(urlVar)
			.then(resp => {
				// add error checking since only network error i.e. error above 400 & 500 are 
				// thrown by native fetch
				if (resp.status >= 200 && resp.status <= 299) {
					return resp.json() 
				} else {
					throw new Error(resp.statusText)
				}
			})
			.then(res => res.articles)
			.then(articles => this.setState({articles: articles}))
			.catch((error) => {
				this.setState({ isError: true })
				console.log(error)
			});
		this.setState({isFetchingArticles: false})
    }

    toggle() {
	this.setState({
	    toolTipOpen: !this.state.toolTipOpen
	});
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
	let newsButtonTooltips =[];
	for (const [k,v] of Object.entries(countries)) {
		/* newsButtons.push(<span><Button data-toggle="tooltip" data-placement="auto" title={k} className="mx-1 bg-secondary text-light" size="sm" id={k} onClick={(e) => this.fetchNews(urlPrefix + e.target.textContent + urlKey)}><small>{v.toUpperCase()}</small></Button>
				</span>); */
		newsButtons.push(<Tippy arrow={true} arrowType="round" distance={2} size="small" content={k}><Button id={k} className="mx-1 bg-secondary text-light" size="sm" 
			onClick={(e) => {
				this.fetchNews(urlPrefix + e.target.textContent + urlKey)
				this.setState({country: k})
			} }><small>{v.toUpperCase()}</small></Button></Tippy>);
	}

	if (this.state.isFetchingArticles === true) {
		return (
				<h5>Fetching Articles from <em>{`${this.state.country}...`}</em></h5>
		)
	} else if(this.state.isError === true) {
		return (
			<div>
				<h5>Error while fetching Articles from <em>{`${this.state.country}...`}</em></h5>
				<Button onClick={e=> this.setState({isError: false})}>Back</Button>
			</div>
		)
	} else {
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
						<div><Button outline size="sm" color="danger" onClick={() => window.open(article.url, "_blank")}>Read more ...</Button></div><hr /><br />
					</div>)
					}
				</CardDeck>
			</div>
		)
	}
    }
}