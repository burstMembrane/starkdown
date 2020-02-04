import React, {Component} from 'react';

class Button extends Component {
	handleClick(e) {
		this.props.handleClick(e);
	}

	render() {
		return (
			<button className="circular ui basic icon button" onClick={(e) => this.handleClick(e)}>
				<i className={`${this.props.icon}  icon`} />
			</button>
		);
	}
}

export default Button;
