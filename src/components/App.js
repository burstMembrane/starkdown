import React, {Component} from 'react';

import MarkdownEditor from './MarkdownEditor';
import MarkdownPreview from './MarkdownPreview';
import './App.css';

class App extends Component {
	state = {text: '', isTyping: false};

	handleInputChange(e) {
		this.setState({text: e, isTyping: true});
	}

	render() {
		return (
			<div className="ui fluid container" style={{margin: '0'}}>
				<div className="ui fluid stackable two column grid" style={{height: 'calc(100vh + 14px)'}}>
					<div className="column" style={{backgroundColor: 'papayawhip'}}>
						<MarkdownEditor
							placeholder=""
							trackInput={(e) => {
								this.handleInputChange(e);
							}}
						/>
					</div>
					<div className="column">
						<MarkdownPreview
							trackInput={(e) => {
								this.handleInputChange(e);
							}}
							raw={this.state.text}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
