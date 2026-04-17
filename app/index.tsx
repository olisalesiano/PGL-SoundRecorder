import HeaderChat from "@/components/header-chat";
import Record from "@/components/record";
import RecordList from "@/components/record-list";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

type Recording = {
  id: string;
  title: string;
  date: string;
  duration: string;
  uri: string;
};

export default function HomeScreen() {
  const [recordings, setRecordings] = useState<Recording[]>([]);

  const encontrarNumeroLibre = () => {
    const numerosUsados = recordings.map((r) => {
      const match = r.title.match(/Grabación nº(\d+)/);
      return match ? parseInt(match[1]) : 0;
    });

    let numero = 1;
    while (numerosUsados.includes(numero)) {
      numero++;
    }
    return numero;
  };

  const addRecording = (uri: string, durationMs: number) => {
    const numeroLibre = encontrarNumeroLibre();
    const nuevaGrabacion = {
      id: Date.now().toString(),
      title: `Grabación nº${numeroLibre}`,
      date: new Date().toLocaleDateString(),
      duration: Math.round(durationMs / 1000) + " segundos",
      uri: uri,
    };

    const nuevasGrabaciones = [nuevaGrabacion, ...recordings];
    setRecordings(nuevasGrabaciones);
  };

  const eliminarRecording = (id: string) => {
    const grabacionesFiltradas = recordings.filter((r) => r.id !== id);
    setRecordings(grabacionesFiltradas);
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <HeaderChat />
        <RecordList
          recordings={recordings}
          onDeleteRecording={eliminarRecording}
        />
      </View>

      <Record onSave={addRecording} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#373636",
    justifyContent: "space-between",
  },
  top: {
    flex: 1,
  },
});
