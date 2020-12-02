import { StyleSheet } from 'react-native'
// import { ApplicationStyles, Metrics, Fonts, Colors, scale } from '../../../Themes/'
import { white } from 'ansi-colors'
import { snakeCase } from 'lodash'

export default StyleSheet.create({
    //   ...ApplicationStyles.screen,
    mainContainer: {

        flex: 1,
        marginTop: 30
    },

    centered: {
        alignItems: 'center'
    },
    inputContainer: {


    },
    input: {
        borderColor: 'grey', borderWidth: 1,
        borderRadius: 5,
        marginLeft: 20,
        height: 50,
        width: '80%',
        marginTop: 10,
        padding: 10,
    },
    countryHeading: {

        fontSize: 16,
        fontWeight: 'bold',
        
        marginLeft: 20
    },
    actionBtn: {

        height: 50,
        width: 80,
        marginTop: 10,
        marginLeft: 20,
        backgroundColor: '#4FA6FC'
    },
    seprator: {
        height: 1,
        width: '90%',
        alignSelf: 'center',
        opacity: 0.5,
        backgroundColor: '#888888'
    },
    detailsContainer: {


        marginTop: 10,
        marginBottom:30
    },
    horizontalContainer: {

        flexDirection: 'row'
    },
    rightContainer: {

        height:70,
        textAlign:'center',
        justifyContent:'center'
    },
    leftContainer: {
        width: '70%',
        height:70,
        textAlign:'center',
        justifyContent:'center'

    }

})
