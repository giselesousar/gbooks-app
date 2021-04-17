import React, { useState } from 'react';
import { RootState } from '../../redux'
import { searchByName } from '../../redux/actions/books.actions';
import { shallowEqual, useSelector, useDispatch, connect } from 'react-redux';
import { Text, ActivityIndicator } from 'react-native';
import SearchBar from './components/SearchBar'

interface Pagination {
    skip: number
    take: number
}

const Home = () => {

    const dispatch = useDispatch();
    
    const [pagination, setPagination] = useState<Pagination>({ skip: 0,  take: 20 });
    const [query, setQuery] = useState<string>('');

    const books: RootState = useSelector(
        (state: RootState) => state,
        shallowEqual
    )


    return (
        <>
        <SearchBar
            query={query}
            setQuery={setQuery}
            onSubmit={() => {dispatch(searchByName(pagination, query)); setPagination({skip: pagination.skip + 1, take: pagination.take})}}
        />
        {
            books.books.items.map(book => {
                return <Text key={book.id}>{book.volumeInfo.title}</Text>
            })
        }
        </>
    )
}

export default connect()(Home);