import { useEffect } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

type Options = {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
};

export function useConfirmOnLeave(options?: Options) {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();

      Alert.alert(
        options?.title ?? "Are you sure?",
        options?.message ?? "Do you really want to leave this screen?",
        [
          {
            text: options?.cancelText ?? "Stay",
            style: "cancel",
            onPress: () => {},
          },
          {
            text: options?.confirmText ?? "Leave",
            style: "destructive",
            onPress: () => navigation.dispatch(e.data.action),
          },
        ]
      );
    });

    return unsubscribe;
  }, [navigation, options]);
}
