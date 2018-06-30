import React,{ Component } from 'react'
import { View,Text,StyleSheet,TouchableOpacity,Platform } from 'react-native'
import { connect } from 'react-redux'
import { grey,black,white,red } from '../utils/colors'

class Deck extends Component {

	static navigationOptions = ({ navigation }) => {

			const { title } = navigation.state.params

		    return {
		    	title
		    	}
    }

    state={
    	noQuestions:false
    }

    startQuizBtn(){
    	const {Deck} = this.props

    	if(Deck.questions.length === 0)
    		this.setState({noQuestions:true})

    	// Navigatie to QUIZ
    }

    addCardBtn(id){

    		const {navigation} = this.props

    		navigation.navigate('AddCard',{id})
    		
    }
	
	render(){

		const {Deck,id} = this.props
		const {noQuestions} = this.state

		return(
			<View style={styles.container}>
				<Text style={styles.titleText}>{Deck.title}</Text>
				<Text style={styles.countsText}>{Deck.questions.length} cards</Text>
				<TouchableOpacity
			      style={[styles.AddBtn,{borderRadius:Platform.OS === 'ios' ? 7 : 2}]}
			      onPress={() => this.addCardBtn(id)}>
			        <Text style={[styles.BtnText,{color:black}]}>Add Card</Text>
			    </TouchableOpacity>
				<TouchableOpacity
			      style={[styles.Btn,{borderRadius:Platform.OS === 'ios' ? 7 : 2}]}
			      onPress={() => this.startQuizBtn()}>
			        <Text style={styles.BtnText}>Start Quiz</Text>
			    </TouchableOpacity>
			    {noQuestions && <Text style={{color:red,textAlign:'center'}}>Please add cards to the deck before you start the quiz</Text>}

			</View>
		)
	}
}

const styles=StyleSheet.create({
	container:{
		flex:1,
		alignItems:'center',
		padding:30,
		paddingTop:100
	},
	titleText:{
		fontSize:55,
		textAlign:'center',
		marginBottom:20
	},
	countsText:{
		fontSize:20,
		textAlign:'center',
		color:grey,
		marginBottom:100
	},
	Btn: {
    backgroundColor: black,
    padding: 20,
    height: 60,
    width:250,
    marginTop:5,
    marginLeft: 40,
    marginRight: 40,
    marginBottom:40,
    alignItems:'center',
    justifyContent:'center'
  	},
  	AddBtn:{
  	backgroundColor: white,
  	borderColor:black,
  	borderWidth:2,
    padding: 20,
    height: 60,
    width:250,
    marginTop:75,
    marginLeft: 40,
    marginRight: 40,
    marginBottom:5,
    alignItems:'center',
    justifyContent:'center'
  	},
   	BtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  }

})



const mapState = (state,{navigation}) => {

	const { key } = navigation.state.params

	return {
		Deck:state[key],
		id:key
	}
}

export default connect(mapState)(Deck)