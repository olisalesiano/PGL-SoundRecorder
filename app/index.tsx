import HeaderChat from "@/components/header-chat";
import Record from "@/components/record";
import RecordList from "@/components/record-list";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

type Recording = {
  id: string;
  title: string;
  date: string;
  duration: string;
  uri: string;
};

  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Cargar grabaciones al iniciar
  useEffect(() => {
    const cargarGrabaciones = async () => {
      try {
        const guardadas = await AsyncStorage.getItem(STORAGE_KEY);
        if (guardadas) {
          setRecordings(JSON.parse(guardadas));
        }
      } catch (error) {
        console.log("Error al cargar:", error);
      }
    };
    cargarGrabaciones();
  }, []);

  // Guardar cuando cambien las grabaciones
  useEffect(() => {
    const guardarGrabaciones = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(recordings));
      } catch (error) {
        console.log("Error al guardar:", error);
      }
    };
    guardarGrabaciones();
  }, [recordings]);

  const encontrarNumeroLibre = () => {
    const numerosUsados = recordings.map((r) => {
      return match ? parseInt(match[1]) : 0;
    });
<<<<<<< HEAD

    let numero = 1;
    while (numerosUsados.includes(numero)) {
      numero++;
    }
    return numero;
  };

      title:
        nombre && nombre.length > 0 ? nombre : `Grabación nº${numeroLibre}`,
      date: new Date().toLocaleDateString(),
      duration: Math.round(durationMs / 1000) + " seg",
      uri,
    };
    setRecordings((prev) => [nuevaGrabacion, ...prev]);
  };

  const eliminarRecording = (id: string) => {
    setRecordings((prev) => prev.filter((r) => r.id !== id));
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const eliminarSeleccionados = () => {
    setRecordings((prev) => prev.filter((r) => !selectedIds.includes(r.id)));
    setSelectedIds([]);
    setSelectionMode(false);
  };

  const eliminarTodos = () => {
    setRecordings([]);
    setSelectedIds([]);
    setSelectionMode(false);
  };

  const cancelarSeleccion = () => {
    setSelectedIds([]);
    setSelectionMode(false);
>>>>>>> record
  };

  return (
    <View style={styles.container}>
      <HeaderChat
        selectionMode={selectionMode}
        selectedCount={selectedIds.length}
        onSelectMode={() => setSelectionMode(true)}
        onCancelSelect={cancelarSeleccion}
        onDeleteSelected={eliminarSeleccionados}
        onDeleteAll={eliminarTodos}
        totalCount={recordings.length}
      />
      <View style={styles.top}>
        <RecordList
          recordings={recordings}
          onDeleteRecording={eliminarRecording}
          selectionMode={selectionMode}
          selectedIds={selectedIds}
          onToggleSelect={toggleSelect}
        />
      </View>
      {!selectionMode && <Record onSave={addRecording} />}
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
