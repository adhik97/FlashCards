import { AsyncStorage } from 'react-native'

const DECKS_STORAGE_KEY = 'FlashCards:decksCheck'

export function getDecks(){

 //AsyncStorage.clear()

  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      console.log("storage",JSON.parse(results))
      return results === null
        ? {} : JSON.parse(results)
    })
    .catch(err => console.error("API getDecks",err))
}


export function saveDeckTitle(key,title){

  const newDeck = {
      [key]: {
        title,
        questions: []
      },
  };

  return AsyncStorage
    .mergeItem(DECKS_STORAGE_KEY, JSON.stringify(newDeck))
    .catch(err => console.error("API saveDeckTitle",err))
}

export function addCardToDeck(key,card){

	AsyncStorage.getItem(DECKS_STORAGE_KEY)
	.then(res => {
		const newDB = JSON.parse(res)
		newDB[key].questions.push(card)

		console.log("newDB",newDB)

		return AsyncStorage.setItem(DECKS_STORAGE_KEY,JSON.stringify(newDB))
				.catch(err => console.error("API addCardToDeck storing",err))
	})
	.catch(err => console.error("API addCardToDeck fetching",err))
}






