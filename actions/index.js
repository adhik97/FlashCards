export const ADD_DECK = 'ADD_DECK'
export const GET_DECKS = 'GET_DECKS'


export function addDeckAction(key,title){
	return {
		type:ADD_DECK,
		key,
		title
	}
}

export function getDecksAction(payload){
	return {
		type:GET_DECKS,
		payload
	}
}