import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Alert } from "react-native";
import { downloadDB } from "./ConnectionClass";
import React, { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import { openDatabase } from "expo-sqlite";
import {
  documentDirectory,
  downloadAsync,
  getInfoAsync,
  makeDirectoryAsync,
} from "expo-file-system";
import { Asset } from "expo-asset";

const openingDatabase = async () => {
  if (!(await getInfoAsync(documentDirectory + "SQLite")).exists) {
    await makeDirectoryAsync(documentDirectory + "SQLite");
  }
  await downloadAsync(
    Asset.fromModule(require("./assets/db/active.db")).uri,
    documentDirectory + "SQLite/active.db"
  );
  return openDatabase("active.db");
};

export default function App() {
  const [dbLoaded, setDbLoaded] = useState(false);
  const [activity, setactivity] = useState("");

  useEffect(() => {
    openingDatabase().then((res) => {
      const db = openDatabase({ name: res._db._name });
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM users`,
          [],
          (tx, results) => {
            setDataList(results.rows._array);
          },
          (tx, err) => {
            Alert.alert("warning", "Terjadi kesalahan disisi server" + err);
          }
        );
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

// useEffect(() => {
//   db.transaction((tx) => {
//     tx.executeSql(
//       `SELECT * FROM users where location like '%${activity}%'`,
//       [],
//       (tx, results) => {
//         console.log(results);
//         // setDataList(results.rows._array);
//       },
//       (tx, err) => {
//         Alert.alert("warning", "Terjadi kesalahan disisi server" + err);
//       }
//     );
//   });
// }, [activity]);

// if (!dbLoaded) {
//   downloadDB().then((value) => setDbLoaded(value));
//   return <></>;
// } else {
//   downloadDB().then((res) => {
//     console.log(res);
//   });
