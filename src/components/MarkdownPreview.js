import React, {Component} from 'react';
import {markdown} from 'markdown';
import copy from 'copy-to-clipboard';
import styled from 'styled-components';

import Button from './Button';

const ButtonGroup = styled.div`
	position: fixed;
	display: flex;
	align-items: baseline;
	top: 10px;
	right: 10px;
`;

const MarkdownDisplay = styled.div`padding: 1rem;`;

class MarkdownPreview extends Component {
	constructor(props) {
		super(props);

		this.state = {parsedMD: '', labelClass: 'ui left pointing label hidden', rawHTML: '', HTMLclass: 'none'};
	}

	parseMD = (text) => {
		const parsed = markdown.toHTML(text);
		this.setState({parsedMD: parsed});
	};
	componentDidMount() {
		this.setState({parsedMD: this.parseMD(this.props.raw)});
	}

	componentDidUpdate(prevProps) {
		if (this.props.raw !== prevProps.raw) {
			this.parseMD(this.props.raw);
		}
	}

	copytoClipBoard() {
		copy(this.state.parsedMD);
		this.setState({labelClass: 'ui right pointing label visible'});
		setTimeout(
			function() {
				this.setState({labelClass: 'ui right pointing label hidden'});
			}.bind(this),
			1000
		);
	}

	render() {
		return (
			<div>
				<ButtonGroup>
					<label className={this.state.labelClass}>Copied to clipboard!</label>
					<Button
						icon="clipboard"
						handleClick={(e) => {
							this.copytoClipBoard(e);
						}}
					/>
				</ButtonGroup>
				<MarkdownDisplay dangerouslySetInnerHTML={{__html: this.state.parsedMD}} />
			</div>
		);
	}
}

export default MarkdownPreview;
