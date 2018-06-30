import React,{ Component } from 'react'
import { View,Text,StyleSheet,TextInput,TouchableOpacity,Platform } from 'react-native'
import { connect } from 'react-redux'
import { black,white,grey,red } from '../utils/colors'
import { addCardToDeck } from '../utils/api'
import { addCardAction } from '../actions'

class AddCard extends Component {
	static navigationOptions = () => ({	title:'Add Card' })

	state={
		question:'',
		answer:'',
		isEmpty:false,
		questionfocus:false,
		answerFocus:false
	}

	onChangeQuestion=(question)=>this.setState({question})

	onChangeAnswer=(answer)=>this.setState({answer})

	onFocus(key){
		this.setState({
			[key]:true
		})
	}

	onBlur(key){
		this.setState({
			[key]:false
		})

	}

	onSubmitPressed(){

		const {question,answer} = this.state
		const {navigation,dispatch} = this.props
		const {id} = navigation.state.params

		if(question.trim().length === 0 || answer.trim().length === 0)
			this.setState({isEmpty:true})
		else
		{
			this.setState({isEmpty:false})
			addCardToDeck(id,{question,answer})

			dispatch(addCardAction(id,{question,answer}))

			navigation.goBack()


		}

	}




	render(){

		const {question,answer,isEmpty,questionfocus,answerFocus} = this.state

		return (
			<View style={styles.container}>
				<View style={[styles.inputView,questionfocus ? styles.Focus : styles.Blur]}>
					<TextInput
						value={question}
						style={styles.inputText}
						underlineColorAndroid="transparent"
						placeholder="Enter the question"
						onFocus={() => this.onFocus('questionfocus')}
						onBlur={() => this.onBlur('questionfocus')}
						onChangeText={this.onChangeQuestion}/>
				</View>
				<View style={[styles.inputView,answerFocus ? styles.Focus : styles.Blur]}>
					<TextInput
						value={answer}
						style={styles.inputText}
						underlineColorAndroid="transparent"
						placeholder="Enter the answer"
						onFocus={() => this.onFocus('answerFocus')}
						onBlur={() => this.onBlur('answerFocus')}
						onChangeText={this.onChangeAnswer}/>
				</View>
				<TouchableOpacity
			      style={[styles.submitBtn,{borderRadius:Platform.OS === 'ios' ? 7 : 2}]}
			      onPress={() => this.onSubmitPressed()}>
			        <Text style={styles.submitBtnText}>Submit</Text>
			    </TouchableOpacity>
			    {isEmpty && <Text style={{color:red}}>Fill all the fields</Text>}
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
	inputView:{
		marginTop:75,
		height: 50,
		minWidth:300, 
		borderWidth: 1,
		borderRadius:3,
		alignItems:'center',
		justifyContent:'center',
		borderColor:grey
	},
	inputText:{
		minWidth:300,
		fontSize:20,
		textAlign:'center'
	},
	submitBtn: {
    backgroundColor: black,
    padding: 20,
    height: 45,
    width:200,
    marginTop:75,
    marginLeft: 40,
    marginRight: 40,
    marginBottom:40,
    alignItems:'center',
    justifyContent:'center'
  	},
   submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  Focus:{
  	borderColor:black,
	borderWidth:3
  },
  Blur:{
  	borderColor:grey,
	borderWidth:1
  }
})



export default connect(null)(AddCard)
