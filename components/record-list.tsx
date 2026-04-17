import { useAudioPlayer } from "expo-audio";
import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";

type Recording = {
  id: string;
  title: string;
  date: string;
  duration: string;
  uri: string;
};

const RecordItem = ({
  title,
  date,
  duration,
  uri,
  onDelete,
}: Omit<Recording, "id"> & { onDelete: () => void }) => {
  const player = useAudioPlayer(uri);
  const [estaReproduciendo, setEstaReproduciendo] = useState(false);

  const manejarReproduccion = () => {
    if (estaReproduciendo) {
      player.pause();
      setEstaReproduciendo(false);
    } else {
      player.play();
      setEstaReproduciendo(true);
    }
  };

  const eliminarAudio = () => {
    onDelete();
  };

  const renderBotonEliminar = () => {
    return (
      <Pressable style={styles.botonEliminar} onPress={eliminarAudio}>
        <Text style={styles.textoEliminar}>Eliminar</Text>
      </Pressable>
    );
  };

  return (
    <ReanimatedSwipeable
      renderRightActions={renderBotonEliminar}
      overshootRight={false}
      rightThreshold={40}
    >
      <View style={styles.item}>
        <Text style={styles.itemTitle}>{title}</Text>
        <View style={styles.itemMeta}>
          <Text style={styles.itemDate}>{date}</Text>
          <Text style={styles.itemDuration}>{duration}</Text>
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.playBtn,
            pressed && styles.playBtnPressed,
          ]}
          onPress={manejarReproduccion}
        >
          <Text style={styles.playIcon}>{estaReproduciendo ? "⏸" : "▶"}</Text>
        </Pressable>
      </View>
    </ReanimatedSwipeable>
  );
};

const RecordList = ({
  recordings,
  onDeleteRecording,
}: {
  recordings: Recording[];
  onDeleteRecording: (id: string) => void;
}) => (
  <GestureHandlerRootView style={styles.container}>
    <FlatList
      data={recordings}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <RecordItem
          title={item.title}
          date={item.date}
          duration={item.duration}
          uri={item.uri}
          onDelete={() => onDeleteRecording(item.id)}
        />
      )}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    />
  </GestureHandlerRootView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4a4949",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  itemTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#ffffff",
  },
  itemMeta: {
    alignItems: "flex-end",
    marginRight: 14,
  },
  itemDate: {
    fontSize: 13,
    color: "#c0bfbf",
  },
  itemDuration: {
    fontSize: 12,
    color: "#9a9999",
    marginTop: 2,
  },
  playBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#5e5d5d",
    alignItems: "center",
    justifyContent: "center",
  },
  playBtnPressed: {
    backgroundColor: "#6e6d6d",
  },
  playIcon: {
    fontSize: 12,
    color: "#ffffff",
    marginLeft: 2,
  },
  botonEliminar: {
    backgroundColor: "#DE2525",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    marginLeft: 10,
    borderRadius: 10,
  },
  textoEliminar: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default RecordList;
