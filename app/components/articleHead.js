import React from 'react';
import {CardImg, CardImgOverlay, CardHeader} from 'reactstrap';

export const ArticleHead = ({article}) => {
	const articleTitle = article.title;
	const imgUrl = article.urlToImage;

	if (articleTitle) {
	    if (imgUrl && imgUrl.indexOf(".jpg") !== -1) {
		return (
		    <div><CardImg top src={imgUrl} /><CardImgOverlay className="text-warning"><strong>{articleTitle}</strong></CardImgOverlay></div>
		)
	    }
	    return (
		<div><CardHeader className="text-warning"><strong>{articleTitle}</strong></CardHeader></div>
	    )
	}
}
