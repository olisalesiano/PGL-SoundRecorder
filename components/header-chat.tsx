import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  selectionMode: boolean;
  selectedCount: number;
  onSelectMode: () => void;
  onCancelSelect: () => void;
  onDeleteSelected: () => void;
  onDeleteAll: () => void;
  totalCount: number;
};

const HeaderChat = ({
  selectionMode,
  selectedCount,
  onSelectMode,
  onCancelSelect,
  onDeleteSelected,
  onDeleteAll,
  totalCount,
}: Props) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const insets = useSafeAreaInsets();

  const abrirInformacion = () => {
    setMenuVisible(false);
    Alert.alert(
      "Grabadora de audio",
      "Graba audio fácilmente, ponle un nombre a cada grabación, reprodúcela cuando quieras y elimínala deslizando hacia la izquierda.",
    );
  };

  const confirmarBorrarTodo = () => {
    setMenuVisible(false);
    Alert.alert(
      "Eliminar todas las grabaciones",
      "¿Desea borrar todas las grabaciones?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Borrar todo", style: "destructive", onPress: onDeleteAll },
      ],
    );
  };

  const containerStyle = [styles.container, { paddingTop: insets.top + 12 }];

  if (selectionMode) {
    return (
      <View style={containerStyle}>
        <TouchableOpacity style={styles.button} onPress={onCancelSelect}>
          <Text style={styles.accionText}>Cancelar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>
          {selectedCount > 0 ? `${selectedCount} seleccionados` : "Seleccionar"}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={selectedCount > 0 ? onDeleteSelected : undefined}
        >
          <Text
            style={[
              styles.accionText,
              selectedCount === 0 && styles.desactivado,
            ]}
          >
            Eliminar
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={containerStyle}>
      <Text style={styles.title}>Lista de grabaciones</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setMenuVisible(true)}
      >
        <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
      </TouchableOpacity>

      <Modal
        transparent
        visible={menuVisible}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setMenuVisible(false)}>
          <View style={styles.menu}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={abrirInformacion}
            >
              <Text style={styles.menuText}>Información</Text>
            </TouchableOpacity>
            <View style={styles.menuSeparador} />
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                onSelectMode();
              }}
            >
              <Text style={styles.menuText}>Seleccionar...</Text>
            </TouchableOpacity>
            <View style={styles.menuSeparador} />
            <TouchableOpacity
              style={[styles.menuItem, totalCount === 0 && styles.desactivado]}
              onPress={totalCount > 0 ? confirmarBorrarTodo : undefined}
              disabled={totalCount === 0}
            >
              <View style={styles.menuItemConIcono}>
                <Ionicons name="trash-outline" size={18} color="#DE2525" />
                <Text style={[styles.menuText, styles.textoBorrar]}>
                  Borrar todo
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 14,
    backgroundColor: "#2b2b2b",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 22,
    padding: 8,
  accionText: {
    color: "#DE2525",
    fontSize: 16,
    fontWeight: "600",
  },
  desactivado: {
    opacity: 0.35,
  },
  overlay: {
    flex: 1,
  },
  menu: {
    position: "absolute",
    top: 70,
    right: 16,
    backgroundColor: "#3c3c3c",
    borderRadius: 12,
    overflow: "hidden",
    minWidth: 170,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  menuItem: {
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  menuText: {
    color: "#fff",
    fontSize: 16,
  },
  menuSeparador: {
    height: 1,
    backgroundColor: "#555",
  },
  menuItemConIcono: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  textoBorrar: {
    color: "#DE2525",
  },
});

export default HeaderChat;
