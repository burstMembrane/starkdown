import React, {Component} from 'react';
import './MarkdownEditor.css';
import styled from 'styled-components';

// import default markdown

const markdownPath = 'default.md';

const TextArea = styled.textarea`
	padding: 1rem;
	width: 100%;
	height: 100%;
	color: black;
	background: papayawhip;
	border: none;
	border-radius: 3px;
	resize: none;
	outline: none;
`;

class MarkdownEditor extends Component {
	state = {text: ''};

	onInputChange(e) {
		e.preventDefault();
		this.setState({text: e.target.value});
		this.props.trackInput(e.target.value);
	}
	componentDidMount() {
		fetch(markdownPath)
			.then((response) => {
				return response.text();
			})
			.then((text) => this.setState({text: `${text}`}));
		this.props.trackInput(this.state.text);
	}

	render() {
		return (
			<div className="ui transparent fluid input" style={{height: '100%'}}>
				<TextArea
					onChange={(e) => {
						this.onInputChange(e);
					}}
					value={this.state.text}
					autoFocus={true}
					placeholder={this.props.placeholder}
				/>
			</div>
		);
	}
}

export default MarkdownEditor;
