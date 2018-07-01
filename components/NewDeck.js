import React,{ Component } from 'react'
import { View,Text,StyleSheet,TextInput,TouchableOpacity,Platform,KeyboardAvoidingView } from 'react-native'
import { black,grey,white,red } from '../utils/colors'
import { saveDeckTitle } from '../utils/api'
import { removeSpace } from '../utils/helpers'
import { connect } from 'react-redux'
import { addDeckAction } from '../actions'


class NewCard extends Component {

	state={
		title:'',
		borderColor:grey,
		borderWidth:1,
		isEmpty:false
	}

	onFocus(){
		this.setState({
			borderColor:black,
			borderWidth:3
		})
	}

	onBlur(){
		this.setState({
			borderColor:grey,
			borderWidth:1
		})
	}

	onPress(){

		const {title} = this.state

		if(title.trim().length === 0)
			this.setState({isEmpty:true})
		else
		{
			this.props.dispatch(addDeckAction(removeSpace(title),title.trim()))

			saveDeckTitle(removeSpace(title),title.trim())
			this.setState({isEmpty:false,title:''})

			this.props.navigation.navigate('Deck',{
				key:removeSpace(title)
			})


		}




	}

	render(){

		const {title,borderColor,borderWidth,isEmpty} = this.state

		return (
			<KeyboardAvoidingView style={styles.container} behavior="padding">
				<View>
				<Text style={styles.titleText}>What is the title of your new deck?</Text>
				<View style={[styles.inputView,{borderColor,borderWidth}]}>
					<TextInput
						value={title}
						style={styles.inputText}
						underlineColorAndroid="transparent"
						onFocus={() => this.onFocus()}
						onChangeText={(text) => this.setState({title:text})}/>
				</View>
				</View>
				
				<TouchableOpacity
			      style={[styles.submitBtn,{borderRadius:Platform.OS === 'ios' ? 7 : 2}]}
			      onPress={() => this.onPress()}>
			        <Text style={styles.submitBtnText}>Submit</Text>
			    </TouchableOpacity>
			    {isEmpty && <Text style={{color:red}}>Please don't leave the field blank</Text>}

			</KeyboardAvoidingView>
		)
	}
}

const styles=StyleSheet.create({
	container:{
		flex:1,
		alignItems:'center',
		padding:30,
		justifyContent:'space-around'
	},
	titleText:{
		fontSize:55,
		textAlign:'center'
	},
	inputView:{
		marginTop:20,
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
    marginLeft: 40,
    marginRight: 40,
    alignItems:'center',
    justifyContent:'center'
  	},
   submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  }
})


export default connect(null)(NewCard)