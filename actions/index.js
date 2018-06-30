export const ADD_DECK = 'ADD_DECK'
export const GET_DECKS = 'GET_DECKS'
export const ADD_CARD = 'ADD_CARD'


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

export function addCardAction(key,card){
	return {
		type:ADD_CARD,
		key,
		card
	}
}