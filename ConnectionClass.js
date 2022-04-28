import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import { documentDirectory } from "expo-file-system";

export const downloadDB = async () => {
  await FileSystem.deleteAsync(`${FileSystem.documentDirectory}SQLite`, {
    idempotent: true,
  });
  await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`, {
    intermediates: true,
  });

  return await FileSystem.downloadAsync(
    Asset.fromModule(require("./assets/db/active.db")).uri,
    documentDirectory + "SQLite/active.db"
  )
    .then(({ status }) => {
      if (status === 200) {
        return true;
      }
      return false;
    })
    .catch((error) => {
      console.log("Err\n" + error);
      return false;
    });
};
