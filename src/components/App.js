import React, {Component} from 'react';

import MarkdownEditor from './MarkdownEditor';
import MarkdownPreview from './MarkdownPreview';
import './App.css';

class App extends Component {
	state = {text: '', isTyping: false, clearEditor: false};

	handleInputChange(e) {
		this.setState({text: e, isTyping: true});
	}

	clearEditor(e) {
		if (!this.state.clearEditor) {
			this.setState({clearEditor: true});
		} else {
			this.setState({clearEditor: false});
		}

		console.log(this.state.clearEditor);
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
							clearEditor={this.state.clearEditor}
						/>
					</div>
					<div className="column">
						<MarkdownPreview
							trackInput={(e) => {
								this.handleInputChange(e);
							}}
							clearEditor={(e) => {
								this.clearEditor(e);
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
