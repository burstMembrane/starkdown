import React, {Component} from 'react';
import copy from 'copy-to-clipboard';
import styled from 'styled-components';
import markdownit from 'markdown-it';
import ReactHtmlParser from 'react-html-parser';
import hljs from 'highlight.js';
import Button from './Button';

const md = markdownit({});

const ButtonGroup = styled.div`
	position: fixed;
	display: flex;
	align-items: baseline;
	top: 10px;
	right: 10px;
`;

const MarkdownDisplay = styled.div`padding: 1rem;`;

const defaultState = {
	parsedMD: ' ',
	copyText: 'Copy to clipboard',
	rawHTML: ''
};
class MarkdownPreview extends Component {
	constructor(props) {
		super(props);

		this.state = {defaultState};
	}

	parseMD = (text) => {
		const parsed = md.render(text);

		this.setState({parsedMD: parsed});
	};
	componentDidMount() {
		this.setState({parsedMD: this.parseMD(this.props.raw)});
	}

	componentDidUpdate(prevProps) {
		if (this.props.raw !== prevProps.raw) {
			this.clearPreview();
			this.parseMD(this.props.raw);
		}
	}

	clearEditor(e) {
		this.props.clearEditor(e);
		this.clearPreview();
		this.setState(defaultState);
	}
	clearPreview() {
		this.setState({parsedMD: '', copyText: 'Copy to clipboard'});
	}

	showHTML() {
		console.log(this.state.parsedMD);
		if (this.state.parsedMD) {
			const highlighted = hljs.highlightAuto(this.state.parsedMD).value;
			this.clearPreview();
			this.setState({rawHTML: highlighted});
			return;
		}
		this.clearPreview();
		this.setState({rawHTML: ''});
		this.parseMD(this.props.raw);
	}
	copytoClipBoard() {
		copy(this.state.parsedMD);
		this.setState({copyText: 'Copied!'});
	}

	render() {
		return (
			<div>
				<ButtonGroup>
					<Button
						popup={this.state.copyText}
						icon="clipboard"
						handleClick={(e) => {
							this.copytoClipBoard(e);
						}}
					/>
					<Button
						popup="Clear Editor"
						icon="trash"
						handleClick={(e) => {
							this.clearEditor(e);
						}}
					/>
					<Button
						popup="View HTML"
						icon="code"
						handleClick={(e) => {
							this.showHTML(e);
						}}
					/>
				</ButtonGroup>
				<MarkdownDisplay>{ReactHtmlParser(this.state.rawHTML)} </MarkdownDisplay>
				<MarkdownDisplay>{ReactHtmlParser(this.state.parsedMD)} </MarkdownDisplay>
			</div>
		);
	}
}

export default MarkdownPreview;
