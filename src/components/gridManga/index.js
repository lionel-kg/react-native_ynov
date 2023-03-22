import React, {useEffect} from 'react';
import {View, StyleSheet, FlatList, ScrollView, Share} from 'react-native';
import styled from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import notifee, {AndroidImportance} from '@notifee/react-native';
import BackgroundTimer from 'react-native-background-timer';
import axios from 'axios';


const scheduleNotification = () => {
  const timing = 10 * 60 * 1000;
  
  BackgroundTimer.runBackgroundTimer(() => {
    axios.get("https://api.jikan.moe/v4/random/manga").then((res)=>{
      let manga = res.data.data;
      onDisplayNotification(manga.mal_id,manga.images.jpg.image_url, manga.title,manga.synopsis).then(()=> console.log("generate notif")).catch((err)=> console.log(err))
  })
  }, timing);
};

async function onDisplayNotification(id,icon, title, body) {
    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: id.toString(),
      name: 'Default Channel',
    });

    
    // Display a notification
    await notifee.displayNotification({
      title: title,
      body: body,
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  const shareManga = (title, url) => {
    Share.share({
      message: `Regardez ce manga: ${title}\n${url}`,
      url: url,
      title: title
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

const addMangaToWishlist = async (manga) => {
    try {
      const wishlist = await AsyncStorage.getItem('wishlist');
      let newWishlist = [];
  
      if (wishlist !== null) {
        newWishlist = JSON.parse(wishlist);
      }
  
      const mangaExists = newWishlist.find(item => item.mal_id === manga.mal_id);
  
      if (mangaExists) {
        console.log('Manga déjà présent dans la wishlist');
        return;
      }
  
      newWishlist.push(manga);
      await AsyncStorage.setItem('wishlist', JSON.stringify(newWishlist));
  
      console.log('Manga ajouté à la wishlist :', manga);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromWishlist = async (mangaId) => {
    try {
        const existingWishlist = await AsyncStorage.getItem("wishlist");
        if (existingWishlist !== null) {
            const wishlistArray = JSON.parse(existingWishlist);
            const updatedWishlistArray = wishlistArray.filter(manga => manga.mal_id !== mangaId);
            await AsyncStorage.setItem("wishlist", JSON.stringify(updatedWishlistArray));
        }
    } catch (error) {
        console.error(error);
    }
};

const Index = (props) => {
    const {mangas, setIsUpdate, navigation} = props;
    const router = useRoute();
    useEffect(() => {
      scheduleNotification();
    }, []);

    return (
        <Container>
        <FlatList
          data={mangas}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <MangaCard>
                <TouchableCard onPress={() => {navigation.navigate('detail', { id: item.mal_id })}}>
                    <MangaImage source={{ uri: item.images.jpg.image_url }} />
                    <MangaDetails>
                    <MangaTitle>{item.title}</MangaTitle>
                    <MangaAuthor>{item.authors[0]?.name}</MangaAuthor>
                    <MangaScore>{item.score}</MangaScore>
                    </MangaDetails>
                    <MangaActions>
                    {router.name === 'home' ? (
                        <ActionButton onPress={() => addMangaToWishlist(item)} color="#f57521">
                        <ActionText>Save</ActionText>
                        </ActionButton>
                    ) : (
                        <ActionButton onPress={() => {removeFromWishlist(item.mal_id); setIsUpdate(true);}} color="#f57521">
                        <ActionText>Remove</ActionText>
                        </ActionButton>
                    )}
                    <ActionButton color="#213944" onPress={() => {shareManga(item.title, item.url); onDisplayNotification(item.mal_id,item.images.jpg.image_url, item.title,item.synopsis).then(()=> console.log("generate notif")).catch((err)=> console.log(err))}}>
                        <ActionText>Share</ActionText>
                    </ActionButton>
                    </MangaActions>
                </TouchableCard>
            </MangaCard>
          )}
        />
      </Container>
    );
  };
  
  const Container = styled.View`
    flex: 1;
    background-color: #213944;
  `;
  
  const MangaCard = styled.View`
    margin: 10px;
    background-color: #FFFFFF;
    border-radius: 10px;
    overflow: hidden;
  `;
  
  const MangaImage = styled.Image`
    width: 100%;
    height: 250px;
  `;
  
  const MangaDetails = styled.View`
    padding: 10px;
  `;
  
  const MangaTitle = styled.Text`
    color: #141414;
    font-size: 20px;
    font-weight: bold;
  `;
  
  const MangaAuthor = styled.Text`
    color: #666666;
    font-size: 16px;
  `;
  
  const MangaScore = styled.Text`
    color: #E50914;
    font-size: 18px;
    font-weight: bold;
  `;
  
  const MangaActions = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 10px;
  `;
  
  const ActionButton = styled.TouchableOpacity`
    margin-left: 10px;
    background-color: ${props => props.color};
    padding: 10px;
    border-radius: 5px;
  `;

    const TouchableCard = styled.TouchableOpacity`

    `;

  
  const ActionText = styled.Text`
    color: #FFFFFF;
    font-size: 16px;
  `;

export default Index;
