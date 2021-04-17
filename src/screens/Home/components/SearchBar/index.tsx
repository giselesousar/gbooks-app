import React from 'react';
import { ActivityIndicator, TextInput, View } from 'react-native';
import { clearItems } from '../../../../redux/actions/books.actions';
import { useDispatch, connect, useSelector } from 'react-redux';
import { RootState } from '../../../../redux';

interface Props {
    query: string
    setQuery: Function
    onSubmit: Function
}

const SearchBar = (props: Props) => {

    const { query, setQuery, onSubmit } = props;

    const loading: Boolean = useSelector((state: RootState) => state.books.loading);

    const dispatch = useDispatch();

    return (
        <View>
            <TextInput
                value={query}
                onChangeText={(text) => setQuery(text)}
                onEndEditing={() => {
                    dispatch(clearItems());
                    onSubmit();
                }}
                returnKeyType="search"
            />
        {
            loading && <ActivityIndicator color="#000"/>
        }
        </View>
    )
}

export default connect()(SearchBar);