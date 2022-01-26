import React from 'react';
import {CardDeck, Card, CardBody, CardText, CardFooter, Button, ButtonGroup,
	ButtonToolbar} from 'reactstrap';
import {ArticleHead} from '../components/articleHead';

export const ArticlesComponent = ({ articles, newsButtons }) => {
    return (
        <div>
            <CardDeck>
            <ButtonToolbar className="mb-2"><ButtonGroup>{newsButtons}</ButtonGroup></ButtonToolbar>
            { 
                articles.map(article => 
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