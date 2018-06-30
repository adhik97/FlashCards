import React,{ Component } from 'react'
import { View,Text,StyleSheet,TouchableOpacity,Animated } from 'react-native'
import { red } from '../utils/colors'

export default class QuizCard extends Component {
	
	state={
		showAnswer:false,
		bounceValue:new Animated.Value(1)
	}

	componentWillReceiveProps(){
		this.setState({showAnswer:false})
	}

	toggle = () => {

		const { bounceValue } = this.state

		Animated.sequence([
          Animated.timing(bounceValue, { duration: 200, toValue: 1.04}),
          Animated.spring(bounceValue, { toValue: 1, friction: 4})
        ]).start()

		this.setState(preState => ({showAnswer:!preState.showAnswer}))


	}

	render(){

		const {question,answer} = this.props.data
		const {showAnswer,bounceValue} = this.state

		return (
				<View style={styles.container}>
					<Animated.Text style={[styles.titleText,{transform: [{scale: bounceValue}]}]}>
					{showAnswer ? answer : question}
					</Animated.Text>
					<TouchableOpacity onPress={this.toggle}>
					<Text style={styles.redText}>{showAnswer ? 'Question' : 'Answer'}</Text>
					</TouchableOpacity>
				</View>
				)
	}	
}

const styles = StyleSheet.create({
	container:{
		margin:10,
		alignItems:'center',
		justifyContent:'center',
		marginBottom:75
	},
	titleText:{
		textAlign:'center',
		fontSize:50
	},
	redText:{
		marginTop:20,
		color:red,
		textAlign:'center',
		fontSize:20
	}
})

