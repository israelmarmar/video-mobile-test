import RNFS from "react-native-fs";
import { FFmpegKit } from "ffmpeg-kit-react-native";
import uuid from "react-native-uuid";
import { Alert, PermissionsAndroid } from "react-native";

const permission_reqused_fn = async () => {
  try {
    const granted_read = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: "Storage Read Permisison: ",
        message: "This app requires storage permission for importing app data.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    const granted_write = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: "Storage Write Permisison: ",
        message:
          "This app requires storage permission in order to store data on device.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    if (
      (granted_write === PermissionsAndroid.RESULTS.GRANTED &&
        granted_read === PermissionsAndroid.RESULTS.GRANTED) ||
      Number(Platform.Version) >= 33
    ) {
    } else {
      Alert.alert("Storage Permission is not granted.");
    }
  } catch (err) {
    Alert.alert("Storage Permission is not granted.");
  }
};

export const convertHlsToMp4 = async (hlsUrl, videoId) => {
  try {
    //await permission_reqused_fn();
    let file = videoId?.replaceAll("-", "") + ".mp4";
    const outputFilePath = `${RNFS.DocumentDirectoryPath}/${file}`;

    let mp4Exists = await RNFS.exists(outputFilePath);

    if (mp4Exists) {
      console.log("Arquivo existe");
      return outputFilePath;
    } 

    await FFmpegKit.execute(
      `-i ${hlsUrl} -c copy -bsf:a aac_adtstoasc ${outputFilePath}`
    );
    console.log("down", outputFilePath);

    mp4Exists = await RNFS.exists(outputFilePath);

    if (mp4Exists) {
      console.log("Conversão concluída com sucesso!");
    } else {
      console.log("Falha na conversão do arquivo HLS para MP4.");
    }

    return outputFilePath;
  } catch (error) {
    console.error("Erro durante a conversão:", error);
  }
};
