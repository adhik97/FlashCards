import React from 'react'
import { Platform } from 'react-native'
import Decks from './components/Decks'
import NewDeck from './components/NewDeck'
import { createBottomTabNavigator,createMaterialTopTabNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import {createStore} from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import {white,black,grey} from './utils/colors'



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
    activeTintColor: black,
    style: {
      height: 56,
      backgroundColor: grey,
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



export default class App extends React.Component {
  render() {

    return (
    <Provider store={createStore(reducer)}>
      <Tabs/>
    </Provider>
          )
  }
}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
}) */
