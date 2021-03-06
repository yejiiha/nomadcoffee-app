import React, { useEffect, useState } from "react";
import { Image, useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { Text, useTheme } from "../../styles/styles";

interface ICoffeeShop {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  isMine: boolean;
  user: {
    id: number;
    username: string;
    avatarUrl: string;
    isFollowing: boolean;
    isMe: boolean;
  };
  photos: {
    id: number;
    url: string;
  }[];
  categories: {
    id: number;
    name: string;
  }[];
}

const Container = styled.View``;

const ShopName = styled(Text)`
  font-size: 23px;
  margin-bottom: 10px;
  font-weight: 600;
  text-align: center;
`;

const CategoryContainer = styled.View`
  background-color: ${(props) => props.theme.theme.orangeColor};
  margin-bottom: 10px;
  border-radius: 10px;
`;

const MapContainer = styled.View`
  margin-bottom: 10px;
`;

const Category = styled(Text)`
  text-align: center;
  padding: 10px 20px;
  font-weight: 600;
`;

const Photo = styled.Image``;

const UserContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 10px 30px 10px;
`;

const Column = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const Avatar = styled.Image`
  width: 30px;
  height: 30px;
  background-color: gray;
`;

const Username = styled(Text)`
  margin-left: 10px;
`;

function CoffeeShops({
  id,
  name,
  latitude,
  longitude,
  isMine,
  user: { username, avatarUrl, isFollowing },
  photos,
  categories,
}: ICoffeeShop) {
  const { width, height } = useWindowDimensions();
  const photo = photos[0]?.url;
  const theme = useTheme();
  const [star, setStar] = useState(false);
  const navigation = useNavigation();
  const [imageHeight, setImageHeight] = useState(height - 400);

  const LATITUDE = Number(latitude);
  const LONGITUDE = Number(longitude);
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.002;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const [region, setRegion] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  const [markers, setMarkers] = useState([
    {
      coordinate: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
      },
    },
  ]);

  useEffect(() => {
    if (photo) {
      Image.getSize(photo, (width, height) => {
        setImageHeight(height / 3);
      });
    }
  }, [photo]);

  return (
    <Container>
      <ShopName>{name}</ShopName>

      {categories[0]?.name && (
        <CategoryContainer>
          {categories.map((c) => (
            <Category key={c.id}>{c?.name}</Category>
          ))}
        </CategoryContainer>
      )}

      {latitude && longitude ? (
        <MapContainer>
          <MapView
            initialRegion={region}
            zoomTapEnabled={false}
            style={{ width, height: 300 }}
          >
            <Marker coordinate={markers[0].coordinate} />
          </MapView>
        </MapContainer>
      ) : null}

      {photo?.length > 0 && (
        <Photo
          source={{ uri: photo }}
          style={{ width, height: imageHeight, resizeMode: "cover" }}
        />
      )}

      <UserContainer>
        <Column onPress={() => navigation.navigate("Profile", { username })}>
          <Avatar source={{ uri: avatarUrl }} style={{ borderRadius: 15 }} />
          <Username>{username}</Username>
        </Column>
        <Column>
          <AntDesign
            name={isFollowing ? "star" : "staro"}
            size={24}
            color={
              isFollowing ? theme.theme.orangeColor : theme.theme.textColor
            }
          />
        </Column>
      </UserContainer>
    </Container>
  );
}

export default CoffeeShops;
