import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import * as Permissions from 'expo-permissions';
import { convertHlsToMp4 } from "./hls2Mp4";

export const downloadFile = async (url, videoId) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(url)
      //const asset = await saveFile(uri);

      const uri = await convertHlsToMp4(url, videoId)

      console.log(uri)

      resolve(uri);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};
