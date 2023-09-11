import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  FlatList,
  ActivityIndicator,
  Button,
} from "react-native";
import AssetItem from "./components/AssetItem";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  app,
  db,
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "./firebase/index";
export default function App() {
  const [title, setTitle] = useState("");
  const [os, setOs] = useState("");
  const [description, setDescription] = useState("");

  const [assetList, setAssetList] = useState([]);

  const addAssetItem = async () => {
    try {
      const docRef = await addDoc(collection(db, "asset"), {
        title: title,
        isChecked: false,
        os: os,
        description: description,
      });
      console.log("Document written with ID: ", docRef.id);
      setTitle("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    getAssetList();
  };
  const getAssetList = async () => {
    await getDocs(collection(db, "asset")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAssetList(newData);
      // console.log(assetList, newData);
    });
  };
  useEffect(() => {
    getAssetList();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/*heading  */}
        <Text style={styles.heading}>Asset List</Text>
        {/* no of shopping items */}
        <Text style={styles.numberOfItems}>0</Text>
        {/* delete all */}
        <Pressable>
          <AntDesign name="delete" size={30} color="black" />
        </Pressable>
      </View>
      {/* flat list */}
      <FlatList
        data={assetList}
        renderItem={({ item }) => (
          <AssetItem
            id={item.id}
            title={item.title}
            os={item.os}
            description={item.description}
            isChecked={item.isChecked}
            getAssetList={getAssetList()}
          />
        )}
        keyExtractor={(item) => item.id}
      />

      <View>
        <TextInput
          value={title}
          onChangeText={(Text) => setTitle(Text)}
          placeholder="enter asset item"
          style={styles.input}
          // onSubmitEditing={addAssetItem}
        />
        <TextInput
          value={os}
          onChangeText={(Text) => setOs(Text)}
          placeholder="enter asset os"
          style={styles.input}
        />
        <TextInput
          value={description}
          onChangeText={(Text) => setDescription(Text)}
          placeholder="enter asset description"
          style={styles.input}
        />
        <Button
          onPress={addAssetItem}
          title={"ADD ITEM"}
          style={{ fontSize: 30, padding: 10, margin: 10 }}
        ></Button>
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    backgroundColor: "red",
    width: "90%",
    alignSelf: "center",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  heading: {
    fontSize: 30,
    fontWeight: "500",
    flex: 1,
  },
  numberOfItems: {
    fontSize: 30,
    fontWeight: "500",
    marginRight: 20,
  },
  // input: {
  //   backgroundColor: "green",
  //   padding: 10,
  //   fontSize: 17,
  //   width: "90%",
  //   alignSelf: "center",
  //   borderRadius: 10,
  //   marginTop: "auto",
  //   marginBottom: 30,
  // },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    width: "70%",
  },
});
