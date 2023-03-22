import axios from 'axios';
import React,{useEffect,useState} from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import styled from 'styled-components';
import Header from "../../components/header";
import GridManga from "../../components/gridManga";
import { useFocusEffect } from '@react-navigation/native';


const Index = ({navigation, route}) => {
    const searchQuery = route.params.searchQuery;
    const [mangas, setMangas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [lastPage , setLastPage] = useState(null);

    useEffect(() => {
        let path = `page=${page}`;
        if (searchQuery !== "") {
          path = `&letter=${searchQuery}`;
        }
        
        axios
          .get(`https://api.jikan.moe/v4/manga?${path}`)
          .then((res) => {
            setMangas(res.data.data);
            setLastPage(res.data.pagination["last_visible_page"]);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false); 
          });
      }, [searchQuery, page]);


    return (
        <Container>
            {loading !== true ? 
            ( Object.keys(mangas).length !== 0 ? <GridManga mangas={mangas} loading={loading} navigation={navigation} /> : null) : (
                <View>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )}
                <ContainerButton>
                    <Button
                    onPress={() => setPage(page > 1 ?page - 1: lastPage)}>
                    <StyledText>Previous</StyledText>
                    </Button>
                    <Button
                    onPress={() => setPage(page < lastPage? page + 1 : 1)}
                    >
                    <StyledText>Next</StyledText>
                    </Button>
                </ContainerButton>
        </Container>
    );
}


const StyledText = styled.Text`
    color: white;
`
const Container = styled.View`
    flex: 1;
`

const Button = styled.TouchableOpacity`
    background-color: #213944;
    padding: 10px;
    border-radius: 5px;
    margin-right: 5px;
`

const ContainerButton = styled.View`
    background: transparent;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 5px;
`



export default Index;
