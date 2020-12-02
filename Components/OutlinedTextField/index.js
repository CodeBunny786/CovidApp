import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Image, Text, TouchableOpacity, Animated, NativeModules, findNodeHandle } from 'react-native'
import styles from './styles'
// import { Colors } from '../../Themes'
import { Popover } from 'react-native-modal-popover'
import { OutLine } from 'react-native-material-textfield'
import { TextField } from 'react-native-material-textfield'
export default class OutLinedTextInput extends Component {
	/*  --------------------------------------------------STATE-------------------------------------------------- */
	state = {
		focused: false,
		expand: true,
		isVisible: false,
		fromRect: {},
		value: '',
		placeholder: '',
		label: ''
	}
	/*  --------------------------------------------------PROPS-------------------------------------------------- */
	static defaultProps = {
		maxLength: 200,
		clearButton: true,
		label: '',
		secure: false,
		keyboardType: 'default',
		message: '',
		ref: ref => { },
		icon: null,
		info: 'none',
		// tintColor: Colors.theme_blue,
		style: {},
		labelStyle: {},
		inputStyle: {},
		placeholderStyle:{},
		placeholder: '',
		initialValue: '',
		// placeholderTextColor: Colors.pinkishGrey,
		// borderColorLabel: Colors.theme_blue,
		onInputChanged: () => { },
		onInputSubmitted: () => { }
	}
	static propTypes = {
		maxLength: PropTypes.number,
		clearButton: PropTypes.bool,
		label: PropTypes.string,
		secure: PropTypes.bool,
		keyboardType: PropTypes.string,
		message: PropTypes.string,
		ref: PropTypes.func,
		icon: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		info: PropTypes.oneOf(['none', 'error', 'valid']),
		placeholder: PropTypes.string,
		tintColor: PropTypes.string,
		placeholderTextColor: PropTypes.string,
		borderColorContainer: PropTypes.string,
		borderColorLabel: PropTypes.string,
		style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
		labelStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
		placeholderStyle:PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
		inputStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
		initialValue: PropTypes.string,
		onInputChanged: PropTypes.func,
		onInputSubmitted: PropTypes.func,
		value: PropTypes.string
	}
	/*  --------------------------------------------------INIT-------------------------------------------------- */
	constructor(props) {
		super(props)
		this.state = {
			focused: false,
			expand: true,
			isVisible: false,
			fromRect: {},
			value: props.value,
			placeholder: props.label ? '' : props.placeholder,
			label: props.label
		}
		this.inputOpacityValue = new Animated.Value(props.label ? 0 : 1.0)
		this.labelScaleValue = new Animated.Value(1.0)
		this.labelTranslateValue = new Animated.Value(5)
	}
	/*  --------------------------------------------------EVENTS-------------------------------------------------- */
	toggle(expand) {
		// On focus shrink label
		// On blur unshrink if empty
		if (expand === this.state.expand) return
		let hasLabel = this.props.label.length > 0
		this.setState({ expand }, () => {
			if (hasLabel) {
				this.inputOpacityValue.setValue(expand ? 1 : 0)
				this.labelScaleValue.setValue(expand ? 0.7 : 1.0)
				this.labelTranslateValue.setValue(expand ? -7 : 5)
				Animated.parallel([
					Animated.spring(
						this.inputOpacityValue,
						{
							toValue: expand ? 0 : 1,
							speed: 20
						}
					),
					Animated.spring(
						this.labelScaleValue,
						{
							toValue: expand ? 1.0 : 0.7,
							speed: 20
						}
					),
					Animated.spring(
						this.labelTranslateValue,
						{
							toValue: expand ? 5 : -7,
							speed: 20
						}
					)
				]).start()
			}
		})
	}
	onBlur = () => {
		this.setState({ focused: false, placeholder: this.props.placeholder, label: '' }, () => {
			let { value } = this.state
			this.toggle((!value || value.length === 0))
		})
		// if (this.props.onInputSubmitted) {
		//   this.props.onInputSubmitted(this.state.value)
		// }
	}
	onFocus = () => {
		this.setState({ focused: true, placeholder: '', label: this.props.label }, () => {
			this.toggle(false)
		})
	}
	handleTextChanged = (text) => {
		this.setState({ value: text }, () => {
			if (this.props.onInputChanged) {
				this.props.onInputChanged(this.state.value)
			}
		})
	}
	handleTextSubmitted = (event) => {
		this.setState({ value: event.nativeEvent.text }, () => {
			if (this.props.onInputSubmitted) {
				this.props.onInputSubmitted(this.state.value)
			}
		})
	}
	/*  --------------------------------------------------ACTIONS-------------------------------------------------- */
	onTap = () => {
		this.setState({ focused: true }, () => {
			this.toggle(false)
			this.inputRef.focus()
		})
	}
	onLayout = () => {
		const handle = findNodeHandle(this.infoRef)
		if (handle) {
			NativeModules.UIManager.measure(handle, (x0, y0, width, height, x, y) => {
				this.setState({ fromRect: { x, y, width, height } })
			})
		}
	}
	showPopover = () => {
		this.setState({ isVisible: true })
	}
	hidePopover = () => {
		this.setState({ isVisible: false })
	}
	/*  --------------------------------------------------LIFECYCLE-------------------------------------------------- */
	componentDidUpdate(prevProps, prevState, snapshot) {
		// let comp = this
		// if (this.props.info !== 'none' && this.props.message) {
		//   this.showPopover()
		// }
		// let {value} = this.props
		// if (prevProps.value !== value) {
		//   this.setState({value}, () => {
		//     let {value} = comp.state
		//     this.toggle(!((value && value.length > 0) || comp.state.focused))
		//   })
		// }
	}
	componentDidMount() {
		let { value } = this.props
		this.toggle(!((value && value.length > 0)))
	}
	/*  --------------------------------------------------RENDER-------------------------------------------------- */
	render() {
		let infoContent = ''
		let infoStyle = {}
		let { info } = this.props
		if (info === 'error') {
			infoContent = '!'
		} else if (info === 'valid') {
			infoContent = '✓'
			// infoStyle = { backgroundColor: Colors.green }
		} else {
			infoStyle = { height: 0, width: 0, overflow: 'hidden' }
		}
		return (

			<View style={[styles.container, this.props.style]}>
				<View style={styles.controlsContainer}>
					<TextField
						maxLength={this.props.maxLength}
						secureTextEntry={this.props.secure}
						keyboardType={this.props.keyboardType}
						ref={ref => { this.props.ref && this.props.ref(ref); this.inputRef = ref }}
						clearButtonMode={this.props.clearButton ? 'while-editing' : 'never'}
						placeholder={this.state.placeholder}
						enabled={!(this.props.value && this.props.value)}
						placeholderTextColor={this.props.placeholderTextColor}
						value={(this.props.value && this.props.value.length >= 0) ? this.props.value + '' : this.state.value}
						onChangeText={this.handleTextChanged}
						returnKeyType='done'
						autoCorrect={false}
						activeLineWidth={0}
						lineWidth={0}
						style={[ this.state.focused ? styles.inputRegistrationDark: styles.inputRegistration, this.props.inputStyle]}
						placeholderStyle={this.props.placeholderStyle}
						titleTextStyle={{ marginLeft:30 }}
						labelTextStyle ={{ marginLeft :30 }}
						// baseColor={ Colors.light_ blue}
						onFocus={this.onFocus}
						onBlur={this.onBlur}
						onSubmitEditing={this.handleTextSubmitted} />

				</View>
				<Popover
					// visible
					contentStyle={styles.popoverContent}
					arrowStyle={styles.popoverArrow}
					backgroundStyle={styles.popoverBackground}
					visible={this.state.isVisible}
					fromRect={this.state.fromRect}
					onClose={this.hidePopover}>
					<Text style={styles.popoverText}>{this.props.message}</Text>
				</Popover>
				<TouchableOpacity ref={ref => { this.infoRef = ref }} onLayout={this.onLayout} onPress={this.showPopover}>
					<Text style={[styles.info, infoStyle]}>{infoContent}</Text>
				</TouchableOpacity>

			</View>
		)
	}
}
