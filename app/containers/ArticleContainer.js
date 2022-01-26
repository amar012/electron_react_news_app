import React from 'react';
import { Button } from 'reactstrap';
import Tippy from '@tippy.js/react';

import { urlPrefix, countries} from '../news';
import {urlKey} from '../config/key';
import { ErrorDisplayComponent } from '../components/errorDisplayComponent';
import { IsLoadingComponent } from '../components/isLoadingComponent';
import { ArticlesComponent } from '../components/ArticlesComponent';

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
	this.handleError = this.handleError.bind(this);
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

	handleError(){
		this.setState({isError: false})
	}

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
				<IsLoadingComponent country={this.state.country} />
		)
	} else if(this.state.isError === true) {
		return (<ErrorDisplayComponent handleError={this.handleError} country={this.state.country} />)
	} else {
		return (
			<ArticlesComponent newsButtons={newsButtons} articles={this.state.articles} />
		)
	}
    }
}