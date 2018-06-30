import { ADD_DECK,GET_DECKS,ADD_CARD } from '../actions'
import update from 'immutability-helper'

export default function decks(state={},action){

	const {key,title,payload,card} = action

	switch(action.type){


		case GET_DECKS:
			return update(payload,{$merge:{...state}})

		case ADD_DECK:
			return update(state,{$merge:{[key]:{title,questions:[]}}})

		case ADD_CARD:
			return update(state,{
				[key]:{
					questions: {$push: [card]}
				}})
					
		default:
			return state

	}

}