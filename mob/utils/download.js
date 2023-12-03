import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

const saveFile = async (fileUri) => {
    const asset = await MediaLibrary.createAssetAsync(fileUri)
    //await MediaLibrary.createAlbumAsync("Down", asset, false)

    return asset;
}

export const downloadFile = async (url) => {
    return new Promise(async (resolve, reject) => {
      try {
        let path = url.split('/');
        const file_name = path[path.length - 1];
  
        const { uri } = await FileSystem.downloadAsync(
          url,
          FileSystem.documentDirectory + file_name
        );

        await saveFile(uri);

        resolve(uri);
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  };