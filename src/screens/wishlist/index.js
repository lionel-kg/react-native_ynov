import React,{useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import GridManga from "../../components/gridManga";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components';

const Index = ({navigation}) => {
    const [mangasWish, setMangasWish] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem("wishlist").then((mangas) => {
            if (mangas) {
                setMangasWish(JSON.parse(mangas));
                setIsUpdate(false);
                setLoading(false);
            }  
        }) 
    }, [isUpdate]);

    return (
        <Container>
            {loading !== true ? 
            ( Object.keys(mangasWish).length !== 0 ?  
                <GridManga 
                    mangas={mangasWish} 
                    setIsUpdate={setIsUpdate} 
                    loading={loading} 
                    navigation={navigation}/> : null) 
                    : (<Text>loading</Text>
            )}
        </Container>
    );
}

const Container = styled.View`
    flex: 1;
`

const Text = styled.Text`
    color: black;
`

export default Index;
