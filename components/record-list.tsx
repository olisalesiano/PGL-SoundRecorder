import Ionicons from "@expo/vector-icons/Ionicons";
import { AudioModule, useAudioPlayer } from "expo-audio";
import React, { useRef, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";

type Recording = {
  id: string;
  title: string;
  date: string;
  duration: string;
  uri: string;
};

const formatTiempo = (segundos: number) => {
  const m = Math.floor(segundos / 60);
  const s = Math.floor(segundos % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const RecordItem = ({
  title,
  date,
  duration,
  uri,
  onDelete,
  selectionMode,
  isSelected,
  onToggleSelect,
}: Omit<Recording, "id"> & {
  onDelete: () => void;
  selectionMode: boolean;
  isSelected: boolean;
  onToggleSelect: () => void;
}) => {
  const player = useAudioPlayer(uri);
  const [estaReproduciendo, setEstaReproduciendo] = useState(false);
  const [tiempoActual, setTiempoActual] = useState(0);
  const [duracionTotal, setDuracionTotal] = useState(0);
  const anchoBarraRef = useRef(0);

  React.useEffect(() => {
    AudioModule.setAudioModeAsync({
      allowsRecording: false,
      playsInSilentMode: true,
      shouldRouteThroughEarpiece: false,
    });
  }, []);

  // Actualizar tiempo actual y detectar fin
  React.useEffect(() => {
    const intervalo = setInterval(() => {
      const current = player.currentTime;
      const total = player.duration;
      setTiempoActual(current);
      if (total > 0) setDuracionTotal(total);

      if (current >= total && total > 0 && estaReproduciendo) {
        player.pause();
        player.seekTo(0);
        setEstaReproduciendo(false);
      }
    }, 200);
    return () => clearInterval(intervalo);
  }, [player, estaReproduciendo]);

  const manejarReproduccion = async () => {
    if (estaReproduciendo) {
      player.pause();
      setEstaReproduciendo(false);
    } else {
      if (player.currentTime >= player.duration && player.duration > 0) {
        player.seekTo(0);
      }
      await player.play();
      setEstaReproduciendo(true);
    }
  };

  const handleSeek = (e: any) => {
    if (duracionTotal <= 0 || anchoBarraRef.current <= 0) return;
    const x = e.nativeEvent.locationX;
    const ratio = Math.max(0, Math.min(1, x / anchoBarraRef.current));
    player.seekTo(ratio * duracionTotal);
  };

  const progreso =
    duracionTotal > 0 ? Math.min(tiempoActual / duracionTotal, 1) : 0;

  const contenidoItem = (
    <View style={styles.item}>
      {/* Fila superior */}
      <View style={styles.fila}>
        <Text style={styles.itemTitle} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.itemMeta}>
          <Text style={styles.itemDate}>{date}</Text>
          <Text style={styles.itemDuration}>{duration}</Text>
        </View>
        {selectionMode ? (
          <Ionicons
            name={isSelected ? "checkmark-circle" : "ellipse-outline"}
            size={26}
            color={isSelected ? "#DE2525" : "#777"}
          />
        ) : (
          <Pressable
            style={({ pressed }) => [
              styles.playBtn,
              pressed && styles.playBtnPressed,
            ]}
            onPress={manejarReproduccion}
          >
            <Ionicons
              name={estaReproduciendo ? "pause" : "play"}
              size={16}
              color="#ffffff"
            />
          </Pressable>
        )}
      </View>

      {/* Barra de progreso (solo visible si no estamos en modo selección) */}
      {!selectionMode && (
        <View style={styles.progressWrapper}>
          <View
            style={styles.progressTrack}
            onStartShouldSetResponder={() => true}
            onResponderGrant={handleSeek}
            onResponderMove={handleSeek}
            onLayout={(e) => {
              anchoBarraRef.current = e.nativeEvent.layout.width;
            }}
          >
            <View
              style={[styles.progressFill, { width: `${progreso * 100}%` }]}
            />
            <View
              style={[styles.progressThumb, { left: `${progreso * 100}%` }]}
            />
          </View>
          <View style={styles.tiempoRow}>
            <Text style={styles.tiempoTexto}>{formatTiempo(tiempoActual)}</Text>
            <Text style={styles.tiempoTexto}>
              {formatTiempo(duracionTotal)}
            </Text>
          </View>
        </View>
      )}
    </View>
  );

  if (selectionMode) {
    return (
      <TouchableOpacity onPress={onToggleSelect} activeOpacity={0.7}>
        {contenidoItem}
      </TouchableOpacity>
    );
  }

  return (
    <ReanimatedSwipeable
      renderRightActions={() => (
        <Pressable
          style={styles.botonEliminar}
          onPress={() => {
            player.pause();
            onDelete();
          }}
        >
          <Text style={styles.textoEliminar}>Eliminar</Text>
        </Pressable>
      )}
      overshootRight={false}
      rightThreshold={40}
    >
      {contenidoItem}
    </ReanimatedSwipeable>
  );
};

const RecordList = ({
  recordings,
  onDeleteRecording,
  selectionMode,
  selectedIds,
  onToggleSelect,
}: {
  recordings: Recording[];
  onDeleteRecording: (id: string) => void;
  selectionMode: boolean;
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
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
          selectionMode={selectionMode}
          isSelected={selectedIds.includes(item.id)}
          onToggleSelect={() => onToggleSelect(item.id)}
        />
      )}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    />
  </GestureHandlerRootView>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: {
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 10,
  },
  item: {
    backgroundColor: "#4a4949",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  fila: {
    flexDirection: "row",
    alignItems: "center",
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
    fontSize: 12,
    color: "#c0bfbf",
  },
  itemDuration: {
    fontSize: 11,
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
  // Barra de progreso
  progressWrapper: {
    marginTop: 10,
  },
  progressTrack: {
    height: 4,
    backgroundColor: "#666",
    borderRadius: 2,
    overflow: "visible",
    justifyContent: "center",
  },
  progressFill: {
    height: 4,
    backgroundColor: "#DE2525",
    borderRadius: 2,
  },
  progressThumb: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#DE2525",
    top: -4,
    marginLeft: -6,
  },
  tiempoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  tiempoTexto: {
    fontSize: 10,
    color: "#888",
  },
  // Swipe eliminar
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
  },
});

export default RecordList;
