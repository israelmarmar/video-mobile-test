import { Video, ResizeMode } from "expo-av";
import { Button, Spinner, View } from "native-base";
import { useEffect, useRef, useState } from "react";
import { downloadFile } from "../utils/download";

const VideoPlayerScreen = ({ route }) => {
  const { videoUrl, videoUrlFile } = route.params;
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [asset, setAsset] = useState();

  useEffect(()=>{
    (async()=>{
        const asset = await downloadFile(videoUrlFile);
        console.log(asset)
        setAsset(asset);
    })();
  },[])

  return (
    <View style={{justifyContent: 'center'}}>
      {asset ? <Video
        ref={video}
        source={{uri: asset}}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        style={{height: "100%"}}
      />: <Spinner color="blue" /> }
      <View>
        <Button
          title={status.isPlaying ? "Pause" : "Play"}
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        />
      </View>
    </View>
  );
};

export default VideoPlayerScreen;
