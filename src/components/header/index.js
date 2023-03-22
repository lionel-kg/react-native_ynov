import React from 'react';
import { useRoute } from '@react-navigation/native';
import styled from 'styled-components/native';
import SearchBar from "../../components/searchBar";

const MyCustomHeader = ({ navigation, setMangas, searchQuery,setSearchQuery }) => {
  const route = useRoute();
  
  return (
    <HeaderContainer>
      <HeaderButton onPress={() => { 
        const nextPage = route.name === 'home' ? 'wishlist' : 'home';
        navigation.navigate(nextPage);
      }}>
        <HeaderButtonText>
          {route.name !== 'home' ? 'Home' : 'My List'}
        </HeaderButtonText>
      </HeaderButton>
      <SearchBar navigation={navigation} setMangas={setMangas} setSearchQuery={setSearchQuery} searchQuery={searchQuery}/> 
      <HeaderButton />
    </HeaderContainer>
  );
};

const HeaderContainer = styled.View`
  background-color: #f57521;
  height: 64px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px;
`;

const HeaderButton = styled.TouchableOpacity`
  padding: 8px;
`;

const HeaderButtonText = styled.Text`
  font-size: 16px;
  color: white;
`;

export default MyCustomHeader;
