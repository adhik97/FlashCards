import { ADD_DECK,GET_DECKS } from '../actions'
import update from 'immutability-helper'

export default function decks(state={},action){

	const {key,title,payload} = action

	switch(action.type){


		case GET_DECKS:
			return update(payload,{$merge:{...state}})

		case ADD_DECK:

			return update(state,{$merge:{[key]:{title,questions:[]}}})

					
		default:
			return state

	}

}