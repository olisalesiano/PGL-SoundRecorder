import Ionicons from "@expo/vector-icons/Ionicons";
import {
  AudioModule,
  RecordingPresets,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";
import React, { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = { onSave: (uri: string, durationMs: number) => void };

const Record = ({ onSave }: Props) => {
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const { isRecording, durationMillis } = useAudioRecorderState(audioRecorder);

  useEffect(() => {
    AudioModule.requestRecordingPermissionsAsync();
  }, []);

  const handlePress = async () => {
    if (isRecording) {
      await audioRecorder.stop();
      if (audioRecorder.uri) onSave(audioRecorder.uri, durationMillis ?? 0);
    } else {
      await audioRecorder.prepareToRecordAsync();
      audioRecorder.record();
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={handlePress}>
        <Text style={styles.record_text}>
          {isRecording ? "Detener" : "Iniciar grabación"}
        </Text>
        <Ionicons
          name={isRecording ? "stop" : "mic"}
          size={32}
          color="#DE2525"
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    backgroundColor: "#2B2B2B",
    justifyContent: "center",
    alignItems: "center",
  },
  button: { flexDirection: "row", alignItems: "center" },
  record_text: {
    color: "#DE2525",
    fontWeight: "900",
    fontSize: 30,
    marginRight: 10,
  },
});

export default Record;
