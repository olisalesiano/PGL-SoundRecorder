import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const HeaderChat = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de grabaciones</Text>
      <TouchableOpacity style={styles.button}>
        <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 68,
    backgroundColor: "#2b2b2b",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "900",
  },
  button: {
    padding: 8,
  },
});

export default HeaderChat;
