import React, { Component } from 'react'
import { View, TextInput, Text, SafeAreaView, Alert, ScrollView } from 'react-native'
import RoundButton from './Components/RoundedButton'
import styles from './styles'
import moment from 'moment'

export default class Main extends Component {
  static navigationOptions = {
    // To hide the ActionBar/NavigationBar
    header: null
  };
  /*--------------------------------------------------STATE------------ -------------------------------------- */
  state = {
    name: '',
    phone: '',
    firstName: '',
    firstNameInfo: 'none',
    firstNameMessage: 'first Name required',
    data: '',
    showProgress: false,
  }

  componentDidMount() {

  }
  /*--------------------------------------------------ACTIONS-------------------------------------------------- */
  _onNext = () => {
    this.search()
  }
  renderLine = () => {
    return <View
      style={styles.seprator}
    />
  }
  fetchDataApi() {
    this.setState({ refreshing: true, showProgress: true });
    fetch('https://www.claesvonh.dk/sem3back/api/destination/open/' + this.state.name)
      .then(res => res.json())
      .then(resJson => {
        let response = resJson
        if (response.code) {
          Alert.alert('not found')

        } else {
          this.setState({ data: response, showProgress: false,refreshing: false  });

        }

      }).catch(e => console.log(e));
  }

  renderItem(title, titleValue) {
    let { item } = this.props
    return <View style={styles.viewListItem} >
      {this.renderLine()}
      <View style={styles.horizontalContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.countryHeading}>{title}</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.countryValue}>{titleValue}</Text>
        </View>
      </View>
    </View>
  }
  search = () => {
    let { name } = this.state
    nameleght = name.length
    if (nameleght > 0) {
      this.fetchDataApi()
    } else {
      Alert.alert('Please enter name')



    }

  }
  /*--------------------------------------------------RENDER-------------------------------------------------- */
  render() {
  
    let { data } = this.state
    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.countryHeading}>{'Write country name:'}</Text>
          <TextInput style={styles.input}
            onChangeText={(text) => this.setState({ name: text })}
            placeholder={"Enter Search Term"} />
        </View>
        <RoundButton style={styles.actionBtn} text={'Submit'.toUpperCase()}
          onPress={this._onNext} />
        <ScrollView>
          {data ?
            <View style={styles.detailsContainer} >
              {this.renderItem('Country Name', data.name)}
              {this.renderItem('Capital', data.capital)}
              {this.renderItem('Population', data.population)}
              {this.renderItem('Currency ISO code:', data.currencies.code)}
              {this.renderItem('Curency vs USD', data.fxRate)}
              {this.renderItem('Covid-19 data last updated', moment(data.last_update).format('l'))}
              {this.renderItem('Total Covid 19 cases', data.cases)}
              {this.renderItem('Total Covid 19 deaths', data.deaths)}
              {this.renderItem('Total Covid 19 patients recovered', data.recovered)}
              {/* {this.renderItem('Infectionrate', 'Sweden')} */}
              {this.renderLine()}
            </View>
            : null}
        </ScrollView>
      </SafeAreaView >

    )
  }
}
