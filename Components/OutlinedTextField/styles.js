import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts,scale } from '../../Themes'

export default StyleSheet.create({
	container: {
		padding: 0,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	controlsContainer: {
		padding: 1,
		justifyContent: 'center',
		width: '100%',
		backgroundColor: Colors.white
	},
	icon: {
		resizeMode: 'contain',
		height: Metrics.images.small,
		width: Metrics.images.small,
		margin: Metrics.baseMargin
	},
	input: {
		...Fonts.style.medium,
		flex: 1,
		fontWeight: 'normal'
	},
	inputRegistration: {
		...Fonts.style.medium,
		borderWidth: 1,
		height: scale(48),
		fontWeight: '100',
		paddingLeft:scale(20),
		borderRadius:4,
		borderColor: Colors.darkSkyBlue20

	},
	inputRegistrationDark: {
		...Fonts.style.medium,
		borderWidth: 1,
		height: scale(48),
		paddingLeft:scale(20),
		borderRadius:4,
		fontWeight: '100',
		borderColor: Colors.darkSkyBlue
	},
	inputContainer: {
		flex: 1
	},
	labelContainer: {
		position: 'absolute',
		backgroundColor: Colors.grey,
		left: 0,
		top: Metrics.smallMargin
	},
	label: {
		...Fonts.style.medium,
		position: 'absolute',
		color: Colors.theme_blue,
		left: 0,
		top: 0
	},
	info: {
		right: 0,
		alignSelf: 'center',
		overflow: 'hidden',
		color: Colors.white,
		textAlign: 'center',
		backgroundColor: Colors.red,
		height: Metrics.images.small,
		width: Metrics.images.small,
		borderRadius: Metrics.images.small / 4

	},
	popoverContent: {
		backgroundColor: Colors.black,
		borderRightColor: Colors.red,
		borderBottomColor: Colors.red,
		borderRightWidth: 3,
		borderBottomWidth: 3
	},
	popoverText: {
		color: Colors.white
	},
	popoverBackground: {

	},
	popoverArrow: {
		borderTopColor: Colors.red
	},
	placeholderStyle:{
		
	}
})
