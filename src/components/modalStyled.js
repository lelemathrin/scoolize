// ModalStyled.js
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, StyleSheet, Text, Keyboard } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";

const ModalStyled = ({ children, title, externalControl }) => {
  const bottomSheetRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const snapPoints = useMemo(() => ["91%"], []);

  // Function to close the modal and dismiss the keyboard
  const closeModal = () => {
    setIsVisible(false);
    Keyboard.dismiss(); // Dismiss the keyboard
  };

  const handleSheetChanges = useCallback(
    (index) => {
      if (index === -1) {
        closeModal();
      }
    },
    []
  );

  useEffect(() => {
    // Assign the open and close methods to the externalControl object
    if (externalControl) {
      externalControl.open = () => setIsVisible(true);
      externalControl.close = closeModal;
    }
  }, [externalControl]);

  useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
      Keyboard.dismiss();
    }
  }, [isVisible]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={isVisible ? 0 : -1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges} // Handling sheet changes
      enablePanDownToClose={true} // Added prop to enable pan down to close
    >
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.contentContainer}>{children}</View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  contentContainer: {},
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },
});

export default ModalStyled;
