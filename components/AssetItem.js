import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { db, doc, deleteDoc } from "../firebase/index";

const AssetItem = (props) => {
  const deleteShoppingItem = async () => {
    await deleteDoc(doc(db, "asset", props.id)).then(() => {
      console.log("delete");
    });
  };

  return (
    <View style={styles.container}>
      {/* checked icon */}
      <Pressable>
        <AntDesign name="checkcircleo" size={24} color="black" />
      </Pressable>
      {/* asset text */}
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.title}>{props.os}</Text>
      <Text style={styles.title}>{props.description}</Text>
      <Pressable>
        <AntDesign name="edit" size={24} color="black" />
      </Pressable>
      {/* delete buttom */}
      <Pressable>
        <AntDesign
          name="delete"
          onPress={deleteShoppingItem}
          size={24}
          color="black"
        />
      </Pressable>
    </View>
  );
};

export default AssetItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "gray",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    margin: 10,
  },
  title: {
    flex: 1,
    marginLeft: 10,
    fontSize: 17,
    fontWeight: "500",
  },
});
