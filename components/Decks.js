import React,{ Component } from 'react'
import { View,Text,StyleSheet,Platform,TouchableOpacity } from 'react-native'
import { black,grey } from '../utils/colors'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { getDecksAction } from '../actions'

//import { AsyncStorage } from 'react-native'

//const DECKS_STORAGE_KEY = 'FlashCards:decks'


function NoDecks(){
	return <View style={styles.noDecks}>
					<Ionicons name={Platform.OS === 'ios' ? 'ios-alert' : 'md-alert'} size={40}/>
					<Text style={{fontSize:20}}>No Decks found</Text>
			</View>
}





function DeckCard({id,title,numberOfCards,navigation}){
	return <TouchableOpacity onPress={() => navigation.navigate('Deck',{key:id,title})} style={styles.cardView}>
				<Text style={styles.cardText}>{title}</Text>
				<Text style={[styles.cardText],{color:grey,fontSize:13}}>{`${numberOfCards} cards`}</Text>
			</TouchableOpacity>
}



class Decks extends Component{

	componentDidMount(){
		getDecks()
		.then(payload => this.props.dispatch(getDecksAction(payload)))
	}

	render(){

		const {decks,navigation} = this.props
		const keys = Object.keys(decks)

		//getDecks().then(res => console.log("storage",res))
		//console.log("decks",decks)

		//AsyncStorage.clear()

		


		return(
			<View style={styles.container}>
				
				{keys.length === 0 && <NoDecks/>}
				{keys.length !== 0 && keys.map(key => <DeckCard key={key} id={key} title={decks[key].title} navigation={navigation} numberOfCards={decks[key].questions.length}/>)}
				
			</View>
			)

	}
}

const styles=StyleSheet.create({
	container:{
		flex:1,
	},
	cardView:{
		borderBottomWidth:1,
		borderBottomColor:black,
		alignItems:'center',
		justifyContent:'center',
		padding:45
	},
	cardText:{
		fontSize:25,
		textAlign:'center'
	},
	noDecks:{
		flex:1,
		alignItems:'center',
		justifyContent:'center'
	}
})


const mapState = (state) => {
	return {
		decks:state
	}
}

export default connect(mapState)(Decks)