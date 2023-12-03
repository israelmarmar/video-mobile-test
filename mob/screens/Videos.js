import { Container, List, Spinner, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";

const Videos = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const resp = await axios.get(
          `${process.env.EXPO_PUBLIC_API_URL}/videos`
        );
        console.log(resp.data);
        setData(resp.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <ScrollView>
      {data.length === 0 ? (
        <Spinner color="blue" />
      ) : (
        <List>
          <Card heading="+ Novo Vídeo" />
          {data.map((item) => (
            <Card
              key={item.id}
              heading={item.title}
              subheading={item.status}
              description={item.description || " "}
              image={item.thumbnail}
              onClick={() => navigation.push("VideoPlayer", { videoUrl: item.video_player, videoUrlFile: item.video_hls })}
            />
          ))}
        </List>
      )}
    </ScrollView>
  );
};

export default Videos;
