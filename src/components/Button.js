import React from 'react'
import classnames from 'classnames'

class Button extends React.Component {

    constructor(props) {
        super(props);
        this.state = {active: false};
    }

    click() {
        this.setState({active: true})
    }

    render() {
		let classes = classnames('button', {active: this.state.active});
		return <button className={classes} onClick={this.click.bind(this)}>{this.props.children}</button>;
    }
}

export default Button
