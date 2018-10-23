import React from 'react';
import ReactDOM from 'react-dom';
import {ArticleContainer} from './containers/ArticleContainer';

class App extends React.Component {
    render() {
	return (
	  <div className="container">
	    <h4>Read News</h4>
	    <ArticleContainer />
	  </div>
	);
    }
}

ReactDOM.render(<App/>, document.getElementById("root"));