import React, { useState } from 'react';
import styled from 'styled-components/native';
import axios from 'axios';

const Index = ({ navigation, setMangas }) => {
  const [query, setQuery] = useState('');
  
  const handleSearch = () => {
    navigation.navigate('home', { searchQuery: query });
  };

  return (
    <SearchContainer>
      <SearchInput
        placeholder="search"
        value={query}
        onChangeText={(text) => setQuery(text)}
        onSubmitEditing={handleSearch}
      />
      <SearchButton onPress={handleSearch}>
        <ButtonText>search</ButtonText>
      </SearchButton>
    </SearchContainer>
  );
};

const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 10px;
  width: 80%;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  color: black;
`;

const SearchButton = styled.TouchableOpacity`
  background-color: #213944;
  border-radius: 10px;
  padding: 10px;
  margin-left: 10px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export default Index;
