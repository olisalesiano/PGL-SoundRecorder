import React from "react";
import { StyleSheet, Text, View } from "react-native";

const RecordList = () => {
  return (
    <View style={styles.content}>
      <Text style={styles.title}>Chat</Text>
      <Text style={styles.subtitle}>interfaz chat</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
  },
});

export default RecordList;
