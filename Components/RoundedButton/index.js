import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text } from 'react-native'
import styles from './styles'

// Note that this file (App/Components/RoundedButton) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

export default class RoundedButton extends Component {
/*--------------------------------------------------PROPTYPES-------------------------------------------------- */
static defaultProps = {
	style: {},
	textStyle: {},
	text: '',
	onPress: () => {},
	disable: false
}
static propTypes = {
	style: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object, PropTypes.array]),
	textStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object, PropTypes.array]),
	onPress: PropTypes.func,
	text: PropTypes.string,
	children: PropTypes.string,
	navigator: PropTypes.object,
	disabled: PropTypes.bool
}
/*--------------------------------------------------LOAD-------------------------------------------------- */
getText () {
	const buttonText = this.props.text || this.props.children || ''
	return buttonText.toUpperCase()
}
/*--------------------------------------------------RENDER-------------------------------------------------- */
render () {
	return (
		<TouchableOpacity disabled={this.props.disabled} style={[styles.button, this.props.style, this.props.disabled && {opacity: 0.5}]} onPress={this.props.onPress}>
			<Text style={[styles.buttonText, this.props.textStyle]}>{this.getText()}</Text>
		</TouchableOpacity>
	)
}
}
