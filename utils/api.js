import { AsyncStorage } from 'react-native'

const DECKS_STORAGE_KEY = 'FlashCards:decksCheck'

/*function setDummyData () {

  const dummyData =

    {
      React: {
        title: 'React',
        questions: [
          {
            question: 'What is React?',
            answer: 'A library for managing user interfaces'
          },
          {
            question: 'Where do you make Ajax requests in React?',
            answer: 'The componentDidMount lifecycle event'
          }
        ]
      },
      JavaScript: {
        title: 'JavaScript',
        questions: [
          {
            question: 'What is a closure?',
            answer: 'The combination of a function and the lexical environment within which that function was declared.'
          }
        ]
      }
    }

  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(dummyData))

  return dummyData
}*/

export function getDecks(){

  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      return results === null
        ? {} : JSON.parse(results)
    })
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
}






