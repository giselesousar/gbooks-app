import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { BooksState } from './types/books.types';
import { BooksReducer } from './reducers/book.reducer';

export interface RootState {
  books: BooksState
}

const rootReducer = combineReducers<RootState>({
    books: BooksReducer,
});

const middleware = applyMiddleware(thunk);
export const store = createStore(rootReducer, middleware);