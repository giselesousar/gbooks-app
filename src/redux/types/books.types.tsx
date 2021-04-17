export interface Book {
    id: string
    volumeInfo: {
        title: string
        authors: Array<string>
        publisher: string
        description: string
        pageCount: number
        imageLinks: {
            thumbnail: string
        }
        language: string
    }
    saleInfo: {
        listPrice: {
            amount: number,
            currencyCode: string
        },
        retailPrice: {
            amount: number,
            currencyCode: string
        },
        buyLink: string
    }
}

export interface GoogleAPIResponse {
    items: Array<Book>
}

export interface BooksState {
    items: Array<Book>
    loading: boolean
    errorMessage: string
}