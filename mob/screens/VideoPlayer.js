import { Video, ResizeMode } from "expo-av";
import { Button, Spinner, View } from "native-base";
import { useEffect, useRef, useState } from "react";
import { downloadFile } from "../utils/download";

const VideoPlayerScreen = ({ route }) => {
  const { videoId, videoUrlFile } = route.params;
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [asset, setAsset] = useState();

  console.log(videoId)

  useEffect(()=>{
    (async()=>{
        const uri = await downloadFile(videoUrlFile, videoId);
        //console.log()
        //const a = await Asset.loadAsync(videoUrl)
        setAsset(uri);
       
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
      /> : <Spinner color="blue" />}
    </View>
  );
};

export default VideoPlayerScreen;
