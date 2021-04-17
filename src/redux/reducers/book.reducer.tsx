import { BooksState } from '../types/books.types'
import { FETCH_ITEMS_ERROR, FETCH_ITEMS_STARTED, FETCH_ITEMS_SUCCESS, CLEAR_ITEMS, BooksActionTypes } from '../actions/books.actions';

const initial_state: BooksState = {
  items: [],
  loading: false,
  errorMessage: ''
};
  
  export function BooksReducer(state: BooksState = initial_state, action: BooksActionTypes): BooksState {
    switch (action.type) {
      case FETCH_ITEMS_SUCCESS: {
        return {
          ...state,
          loading: false,
          errorMessage: '',
          items: state.items.concat(action.payload)
        };
      }
      case FETCH_ITEMS_STARTED: {
        return {
          ...state,
          loading: true
        };
      }
      case FETCH_ITEMS_ERROR: {
        return {
          ...state,
          loading: false,
          errorMessage: action.errorMessage
        };
      }
      case CLEAR_ITEMS: {
        return {
          ...state,
          errorMessage: '',
          items: []
        };
      }
      default:
        return state
    }
  };