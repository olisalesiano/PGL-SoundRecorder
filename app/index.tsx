import HeaderChat from "@/components/header-chat";
import RecordList from "@/components/record-list";
import { StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <HeaderChat />
      <RecordList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#373636",
  },
});
