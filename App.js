import React,{ Component } from 'react'
import { View,Platform,StatusBar } from 'react-native'
import Decks from './components/Decks'
import NewDeck from './components/NewDeck'
import Deck from './components/Deck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import { createBottomTabNavigator,createMaterialTopTabNavigator,createStackNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import {createStore} from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import {white,black,grey} from './utils/colors'
import { Constants } from 'expo'
import { setLocalNotification,clearLocalNotification } from './utils/helpers'

function CustomStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}


const TabCreator = Platform.OS === 'ios' ? createBottomTabNavigator : createMaterialTopTabNavigator

const Tabs = TabCreator({
   Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'DECKS',
      tabBarIcon: ({ tintColor }) => <Ionicons name={Platform.OS === 'ios' ? 'ios-reorder' : 'md-reorder'} size={30} color={tintColor} />
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'NEW DECK',
      tabBarIcon: ({ tintColor }) => <Ionicons name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'} size={30} color={tintColor} />
    },
  }
},
{
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? black : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : black,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const stackNavigationOptions={
  headerTintColor:Platform.OS === 'ios' ? black : white,
  headerStyle:{
    backgroundColor:Platform.OS === 'ios' ? white : black
  }
}

const MainNavigator=createStackNavigator({
  Home:{
    screen:Tabs,
    navigationOptions: {
    header: null
    }
  },
  Deck:{
    screen:Deck,
    navigationOptions:stackNavigationOptions
  },
  AddCard:{
    screen:AddCard,
    navigationOptions:stackNavigationOptions
  },
  Quiz:{
    screen:Quiz,
    navigationOptions:stackNavigationOptions
  }
})



export default class App extends Component {
  componentDidMount(){
    clearLocalNotification()
        .then(setLocalNotification)
  }

  render() {

    return (
    <Provider store={createStore(reducer)}>
    <View style={{flex:1}}>
      <CustomStatusBar backgroundColor={black} barStyle="light-content"/>
      <MainNavigator/>
    </View>
    </Provider>
          )
  }
}

