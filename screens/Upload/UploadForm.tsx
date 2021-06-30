import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { NavigationProp, RouteProp } from "@react-navigation/core";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Alert, TextInput as FormInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ReactNativeFile } from "apollo-upload-client";
import { TextInput } from "../../components/auth/AuthInput";
import { DismissKeyboard } from "../../components/DismissKeyboard";
import { LoggedInNavParamList } from "../../navigators/LoggedInNav";
import { useMutation } from "@apollo/client";
import {
  CREATE_COFFEE_SHOP_MUTATION,
  SEE_COFFEE_SHOPS,
} from "../../components/Queries";
import {
  createCoffeeShop,
  createCoffeeShopVariables,
} from "../../src/__generated__/createCoffeeShop";

interface IUploadForm {
  navigation: NavigationProp<LoggedInNavParamList, "UploadForm">;
  route: RouteProp<LoggedInNavParamList, "UploadForm">;
}

const UploadFormContainer = styled.ScrollView`
  padding: 30px 10px;
  background-color: ${(props) => props.theme.theme.bgColor};
`;

const LocationContainer = styled.View`
  flex-direction: row;
`;

const Input = styled(TextInput)`
  width: 100%;
  justify-content: space-between;
`;

const LocationInput = styled(TextInput)`
  width: 49%;
`;

const ChoosenPhotoContainer = styled.View`
  min-height: 70%;
`;

const ChoosenPhoto = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;

const ChoosenPhotoDelete = styled.TouchableOpacity`
  position: absolute;
  top: -7px;
  right: -7px;
  width: 17px;
  height: 17px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.theme.closeBtnColor};
`;

const HeaderRightContainer = styled.TouchableOpacity`
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;

const HeaderRightText = styled.Text`
  color: ${(props) => props.theme.theme.orangeColor};
  font-size: 17px;
  margin-right: 15px;
`;

function UploadForm({ navigation, route }: IUploadForm) {
  const { file } = route.params ?? "";
  const [photo, setPhoto] = useState("");
  const { register, handleSubmit, setValue, watch } = useForm();

  const nameRef = useRef<FormInput>(null);
  const categoryRef = useRef<FormInput>(null);
  const latitudeRef = useRef<FormInput>(null);
  const longitudeRef = useRef<FormInput>(null);

  const updateCoffeeShop = (cache: any, result: any) => {
    const {
      data: { createCoffeeShop },
    } = result;

    if (createCoffeeShop.ok) {
      cache.modify({
        id: "ROOT_QUERY",
        fields: {
          seeCoffeeShops(prev: any) {
            return [createCoffeeShop, ...prev];
          },
        },
      });
      navigation.navigate("LoggedInTabNav");
    }
  };

  const [createCoffeeShopMutation, { loading }] = useMutation<
    createCoffeeShop,
    createCoffeeShopVariables
  >(CREATE_COFFEE_SHOP_MUTATION, {
    update: updateCoffeeShop,
  });

  const onNext = (nextOne: any) => {
    nextOne?.current?.focus();
  };

  const onPress = () => {
    if (photo) {
      setPhoto("");
    }
  };

  const onValid = (data: any) => {
    const { category, latitude, longitude, name } = data;

    const photos = new ReactNativeFile({
      uri: file,
      name: "1.jpg",
      type: "image/jpeg",
    });

    createCoffeeShopMutation({
      variables: {
        name,
        categories: category,
        latitude,
        longitude,
        photos,
      },
    });
  };

  const headerRightLoading = () => (
    <ActivityIndicator size="small" style={{ marginRight: 10 }} />
  );

  const headerRight = () => (
    <HeaderRightContainer onPress={handleSubmit(onValid)}>
      <HeaderRightText>완료</HeaderRightText>
    </HeaderRightContainer>
  );

  useEffect(() => {
    register("name", { required: true });
    register("category");
    register("latitude");
    register("longitude");
  }, [register]);

  useEffect(() => {
    if (file) {
      setPhoto(file);
    }
  }, [file]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? headerRightLoading : headerRight,
      ...(loading && { headerLeft: () => null }),
    });
  }, [loading]);

  return (
    <DismissKeyboard>
      <UploadFormContainer>
        <Input
          placeholder="CoffeeShop Name"
          value={watch("name")}
          ref={nameRef}
          onSubmitEditing={() => onNext(categoryRef)}
          returnKeyType="next"
          onChangeText={(text) => setValue("name", text)}
        />
        <Input
          placeholder="Category"
          value={watch("category")}
          ref={categoryRef}
          onSubmitEditing={() => onNext(latitudeRef)}
          onChangeText={(text) => setValue("category", text)}
        />
        <LocationContainer>
          <LocationInput
            placeholder="Latitude"
            style={{ marginRight: 10 }}
            value={watch("latitude")}
            ref={latitudeRef}
            onChangeText={(text) => setValue("latitude", text)}
            keyboardType="numeric"
          />
          <LocationInput
            placeholder="Longitude"
            value={watch("longitude")}
            ref={longitudeRef}
            onChangeText={(text) => setValue("longitude", text)}
            keyboardType="numeric"
          />
        </LocationContainer>
        {photo !== "" && (
          <ChoosenPhotoContainer>
            <ChoosenPhoto source={{ uri: photo }} />
            <ChoosenPhotoDelete onPress={onPress}>
              <Ionicons
                name="close"
                size={15}
                color="white"
                style={{
                  padding: 0,
                  left: 1,
                  position: "absolute",
                }}
              />
            </ChoosenPhotoDelete>
          </ChoosenPhotoContainer>
        )}
      </UploadFormContainer>
    </DismissKeyboard>
  );
}

export default UploadForm;
