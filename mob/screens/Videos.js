import { Container, List, Spinner, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { ScrollView, RefreshControl, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNetInfo } from "@react-native-community/netinfo";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import axios from "axios";

const Videos = ({ navigation }) => {
  const netInfo = useNetInfo();
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);

  const _pickDocument = async () => {
    try {
      console.log("pick");
      let result = await DocumentPicker.getDocumentAsync({});

      console.log(result);

      if (result && result.assets) {
        console.log(result.assets[0]);

        setData([]);
        const response = await FileSystem.uploadAsync(
          `${process.env.EXPO_PUBLIC_API_URL}/upload`,
          result.assets[0].uri,
          {
            fieldName: "file",
            httpMethod: "POST",
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          }
        );
        getVideos();
        console.log(JSON.stringify(response, null, 4));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getVideos = async () => {
    try {
      if (netInfo.isConnected) {
        console.log("conectado", netInfo.isConnected.toString());
        const resp = await axios.get(
          `${process.env.EXPO_PUBLIC_API_URL}/videos`
        );
        console.log(resp.data);
        await AsyncStorage.setItem("videos", JSON.stringify(resp.data));
        setData(resp.data);
      } else {
        console.log("não conectado");
        let videos = await AsyncStorage.getItem("videos");
        videos = JSON.parse(videos);
        setData(videos);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getVideos();
  }, [netInfo]);

  const pullToRefreshFunction = async () => {
    setRefreshing(true);
    await getVideos();
    setRefreshing(false);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={pullToRefreshFunction}
        />
      }
    >
      {data?.length === 0 ? (
        <Spinner color="blue" />
      ) : (
        <List>
          <Card heading="+ Novo Vídeo" onClick={_pickDocument} />
          {data?.map((item) => (
            <Card
              key={item.id}
              heading={item.title}
              subheading={item.status}
              description={item.description || " "}
              image={item.thumbnail}
              onClick={() =>
                navigation.push("VideoPlayer", {
                  videoId: item.id,
                  videoUrl: item.video_player,
                  videoUrlFile: item.video_hls,
                })
              }
            />
          ))}
        </List>
      )}
    </ScrollView>
  );
};

export default Videos;
