import Ionicons from "@expo/vector-icons/Ionicons";
import {
  AudioModule,
  RecordingPresets,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";
import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  onSave: (uri: string, durationMs: number, nombre?: string) => void;
};

const NUM_BARRAS = 32;

const Record = ({ onSave }: Props) => {
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const { isRecording, durationMillis } = useAudioRecorderState(audioRecorder);
  const insets = useSafeAreaInsets();

  const [alturas, setAlturas] = useState<number[]>(Array(NUM_BARRAS).fill(6));
  const [modalVisible, setModalVisible] = useState(false);
  const [nombreInput, setNombreInput] = useState("");
  const uriPendiente = useRef<string | null>(null);
  const duracionPendiente = useRef<number>(0);

  useEffect(() => {
    AudioModule.requestRecordingPermissionsAsync();
  }, []);

  // Animar las barras mientras se graba
  useEffect(() => {
    if (!isRecording) {
      setAlturas(Array(NUM_BARRAS).fill(6));
      return;
    }
    const interval = setInterval(() => {
      setAlturas(
        Array.from({ length: NUM_BARRAS }, () => Math.random() * 52 + 6),
      );
    }, 100);
    return () => clearInterval(interval);
  }, [isRecording]);

  const handlePress = async () => {
    if (isRecording) {
      await audioRecorder.stop();
      if (audioRecorder.uri) {
        uriPendiente.current = audioRecorder.uri;
        duracionPendiente.current = durationMillis ?? 0;
        setNombreInput("");
        setModalVisible(true);
      }
    } else {
      await AudioModule.setAudioModeAsync({
        allowsRecording: true,
        playsInSilentMode: true,
        shouldRouteThroughEarpiece: false,
      });
      await audioRecorder.prepareToRecordAsync();
      audioRecorder.record();
    }
  };

  const confirmar = () => {
    if (uriPendiente.current) {
      onSave(
        uriPendiente.current,
        duracionPendiente.current,
        nombreInput.trim(),
      );
    }
    setModalVisible(false);
  };

  const cancelar = () => {
    setModalVisible(false);
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 12 }]}>
      {/* Ondas de audio */}
      {isRecording && (
        <View style={styles.waveform}>
          {alturas.map((h, i) => (
            <View key={i} style={[styles.barra, { height: h }]} />
          ))}
        </View>
      )}

      <Pressable style={styles.button} onPress={handlePress}>
        <Text style={styles.record_text}>
          {isRecording ? "Detener" : "Iniciar grabación"}
        </Text>
        <Ionicons
          name={isRecording ? "stop" : "mic"}
          size={26}
          color="#DE2525"
        />
      </Pressable>

      {/* Modal para nombrar la grabación */}
      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={cancelar}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.modalBox}>
            <Text style={styles.modalTitulo}>Nueva grabación</Text>
            <TextInput
              style={styles.input}
              value={nombreInput}
              onChangeText={setNombreInput}
              placeholder="Nombre (opcional)"
              placeholderTextColor="#777"
              autoFocus
              returnKeyType="done"
              onSubmitEditing={confirmar}
            />
            <View style={styles.modalBotones}>
              <TouchableOpacity style={styles.modalBtn} onPress={cancelar}>
                <Text style={styles.modalBtnTexto}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalBtn} onPress={confirmar}>
                <Text style={[styles.modalBtnTexto, styles.modalBtnOk]}>
                  Aceptar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2B2B2B",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 16,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  record_text: {
    color: "#DE2525",
    fontWeight: "900",
    fontSize: 25,
    marginRight: 10,
  },
  waveform: {
    flexDirection: "row",
    alignItems: "center",
    height: 64,
    gap: 3,
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  barra: {
    flex: 1,
    backgroundColor: "#DE2525",
    borderRadius: 2,
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "center",
    alignItems: "center",
    padding: 28,
  },
  modalBox: {
    backgroundColor: "#3a3a3a",
    borderRadius: 16,
    padding: 22,
    width: "100%",
  },
  modalTitulo: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 14,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#2b2b2b",
    color: "#fff",
    borderRadius: 10,
    padding: 13,
    fontSize: 16,
    marginBottom: 18,
  },
  modalBotones: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
  modalBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  modalBtnTexto: {
    fontSize: 16,
    fontWeight: "600",
    color: "#888",
  },
  modalBtnOk: {
    color: "#DE2525",
  },
});

export default Record;
