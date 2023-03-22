import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import styled from 'styled-components';
import notifee from '@notifee/react-native';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const {height} = Dimensions.get("screen")

const Index = ({ route }) => {
  const { id } = route.params;
  const [manga, setManga] = useState({});
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();


  useEffect(() => {
    axios.get("https://api.jikan.moe/v4/manga/" + id)
      .then((res) => {
        setManga(res.data.data);
        setLoading(false);
      })
  }, []);

  return (
    <StyledScrollView 
      contentContainerStyle={
        {minHeight:height,
        paddingBottom: 20
    }}
    >
    {loading !== true ?
      <Container>
          <StyledCenterContainer>
            <StyledTitleText>{manga.title}</StyledTitleText>
          </StyledCenterContainer>
          <StyledImageContainer>
            <StyledImage source={{ uri: manga.images.jpg.image_url }} />
          </StyledImageContainer>
            {manga.titles.length !== 0 ?
              <SimpleContainer>
                <StyledContainerSection>
                  <StyledTitleSection>
                    Alternative Titles
                  </StyledTitleSection>
                </StyledContainerSection>
                {manga.titles.map((title, index) => {
                  return (
                    title.type === "Default" || title.type === "Synonym" ? null :
                      <StyledRowContainer key={index}>
                        <StyledTitleInformation>
                          {title.type}:
                        </StyledTitleInformation>
                        <StyledText>
                          {title.title}
                        </StyledText>
                      </StyledRowContainer>
                  )
              })}
            </SimpleContainer>
            : null}
            <StyledContainerSection>
              <StyledTitleSection>
                Informations
              </StyledTitleSection>
            </StyledContainerSection>
            <StyledContainerSynopsis>
              <StyledRowContainer>
                <StyledTitleInformation>
                  Type: 
                </StyledTitleInformation>
                  <StyledText>
                  { manga.type}
                  </StyledText>
              </StyledRowContainer>
              <StyledRowContainer>
                <StyledTitleInformation>
                  Status: 
                </StyledTitleInformation>
                  <StyledText>
                  {manga.status}
                  </StyledText>
              </StyledRowContainer>
              {manga.status === "Finished" ? 
              <SimpleContainer>
                <StyledRowContainer>
                  <StyledTitleInformation>
                    Chapters: 
                  </StyledTitleInformation>
                    <StyledText>
                    {manga.chapters}
                    </StyledText>
                </StyledRowContainer>
                <StyledRowContainer>
                  <StyledTitleInformation>
                    Volumes: 
                  </StyledTitleInformation>
                    <StyledText>
                    {manga.volumes}
                    </StyledText>
                </StyledRowContainer>
              </SimpleContainer>
              : null
              }
            </StyledContainerSynopsis>
            <StyledContainerSection>
              <StyledTitleSection>
                Synopsis
              </StyledTitleSection>
            </StyledContainerSection>
            <StyledContainerSynopsis>
              <StyledText>
                {manga.synopsis}
              </StyledText>
            </StyledContainerSynopsis>
          </Container>:
        <View>
        <ActivityIndicator size="large" color="#0000ff" />
        </View>
      }
      </StyledScrollView>
  );
}

const Container = styled.View`
`
const StyledScrollView = styled.ScrollView`
  padding: 10px;
`

const SimpleContainer = styled.View`
  margin-bottom: 10px;
`
const StyledRowContainer = styled.View`
  flex-direction: row;
`

const StyledCenterContainer = styled.View`
  justify-content: center;
  align-items: center;
`
const StyledImageContainer = styled.View`
  width: 100%;
  height: 400px;
  padding: 10%;
`

const StyledImage = styled.Image`
  width: 100%;
  height: 100%;
  margin-bottom: 0px;
`

const StyledTitleText = styled.Text`
  font-size: 40px;
  color: black;
  font-weight: bold;
`
const StyledContainerSection = styled.View`
  flex-wrap: wrap;
  border-bottom-width: 1px;
  border-bottom-color: gray;
  margin-bottom: 8px;
`
const StyledTitleSection = styled.Text`
  font-size: 25px;
  color: black;
`
const StyledTitleInformation = styled.Text`
  font-size: 18px;
  font-weight: semibold;
  margin-right: 10px;
  color: black;
`

const StyledText = styled.Text`
  color: black;
  align-items: center;
  vertical-align: middle;
`
const StyledContainerSynopsis = styled.View`
  padding: 2%;
`




export default Index;
