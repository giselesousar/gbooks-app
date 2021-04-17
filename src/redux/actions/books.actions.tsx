import { AnyAction } from 'redux';
import { AxiosResponse } from 'axios';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { GoogleAPI } from '../../services/GoogleAPI'
import { Book, GoogleAPIResponse } from '../types/books.types';

export const FETCH_ITEMS_SUCCESS = "FETCH_ITEMS_SUCCESS"
export const FETCH_ITEMS_ERROR = "FETCH_ITEMS_ERROR"
export const FETCH_ITEMS_STARTED = "FETCH_ITEMS_STARTED"
export const CLEAR_ITEMS = "CLEAR_ITEMS"

interface FetchItemsAction {
    type: typeof FETCH_ITEMS_SUCCESS
    payload: Book
}

interface FetchActionError {
    type: typeof FETCH_ITEMS_ERROR,
    errorMessage: string
}

interface FetchStartedAction {
    type: typeof FETCH_ITEMS_STARTED,
}

interface ClearItemsAction {
    type: typeof CLEAR_ITEMS,
}

export type BooksActionTypes = FetchActionError | FetchItemsAction | FetchStartedAction | ClearItemsAction;

const setFetchSuccess = (book: Book): FetchItemsAction => {
    return { type: FETCH_ITEMS_SUCCESS, payload: book };
}

const setFetchLoading = (): FetchStartedAction => {
    return { type: FETCH_ITEMS_STARTED };
}

const setFetchError = (errorMessage: string): FetchActionError => {
    return { type: FETCH_ITEMS_ERROR, errorMessage };
}

export const clearItems = (): ClearItemsAction => {
    return { type: CLEAR_ITEMS };
}

export const searchByName = (pagination: {skip: number, take: number}, searchQuery: string):
    ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>):
        Promise<void> => {
        return new Promise<void>((resolve) => {

            dispatch(setFetchLoading());

            const { skip, take } = pagination;

            GoogleAPI.get('/', {
                params: {
                    q: searchQuery,
                    startIndex: skip * take,
                    maxResults: take
                }
            })
            .then((resp: AxiosResponse<GoogleAPIResponse>) => {
                resp.data.items.map(item => {
                    const book = {
                        id: item.id,
                        volumeInfo: {
                            title: item.volumeInfo.title,
                            authors: item.volumeInfo.authors,
                            publisher: item.volumeInfo.publisher,
                            description: item.volumeInfo.description,
                            pageCount: item.volumeInfo.pageCount,
                            imageLinks: {
                                thumbnail: item.volumeInfo.imageLinks.thumbnail
                            },
                            language: item.volumeInfo.language
                        },
                        saleInfo: {
                            listPrice: {
                                amount: item.saleInfo?.listPrice?.amount,
                                currencyCode: item.saleInfo?.listPrice?.currencyCode
                            },
                            retailPrice: {
                                amount: item.saleInfo?.retailPrice?.amount,
                                currencyCode: item.saleInfo?.retailPrice?.currencyCode
                            },
                            buyLink: item.saleInfo?.buyLink
                        }
                    }
                    dispatch(setFetchSuccess(book));
                })
                resolve();
            })
            .catch((err: Error) => {
                dispatch(setFetchError(err.message))
            })
        })
    }

}

