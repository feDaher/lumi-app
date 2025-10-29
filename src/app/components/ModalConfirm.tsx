import React, { useState, useEffect } from "react";
import { Modal, View, Text, Pressable, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type ConfirmOption = {
  id: string;
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  defaultChecked?: boolean;
  locked?: boolean;
};

type Props = {
  visible: boolean;
  title?: string;
  options: ConfirmOption[];
  cancelText?: string;
  confirmText?: string;
  onCancel?: () => void;
  onConfirm?: (selectedIds: string[]) => void;
};

export default function ModalConfirm({
  visible,
  title = "Confirmação de emergência!",
  options,
  cancelText = "Cancelar",
  confirmText = "Confirmar",
  onCancel,
  onConfirm,
}: Props) {
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (visible) {
      const initial: Record<string, boolean> = {};
      options.forEach((o) => {
        if (o.locked) {
          initial[o.id] = true;
        } else {
          initial[o.id] = !!o.defaultChecked;
        }
      });
      setSelected(initial);
    }
  }, [visible, options]);

  const toggle = (id: string) => {
    const opt = options.find((o) => o.id === id);
    if (opt?.locked) return;
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleConfirm = () => {
    const picked = Object.entries(selected)
      .filter(([, v]) => v)
      .map(([k]) => k);
    onConfirm?.(picked);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <View className="flex-1 bg-black/50 items-center justify-center px-4">
        <View className="w-full max-w-md rounded-2xl bg-white p-5">
          <Text className="text-center text-base font-bold mb-4">{title}</Text>

          <ScrollView className="max-h-80" showsVerticalScrollIndicator={false}>
            {options.map((o) => (
              <Pressable
                key={o.id}
                onPress={() => toggle(o.id)}
                className={`mb-3 rounded-xl border px-3 py-3 flex-row items-center 
                  ${o.locked ? "border-emerald-400 bg-emerald-50" : "border-neutral-200"}
                `}
              >
                <View className="w-6 items-center mr-2">
                  {o.icon ? <Ionicons name={o.icon} size={18} /> : null}
                </View>
                <Text
                  className={`flex-1 text-[15px] ${o.locked ? "text-emerald-700 font-medium" : ""}`}
                >
                  {o.label}
                </Text>
                <View
                  className={`h-5 w-5 rounded-md border items-center justify-center ${
                    selected[o.id]
                      ? "bg-emerald-500 border-emerald-500"
                      : "bg-white border-neutral-300"
                  }`}
                >
                  {selected[o.id] ? (
                    <Ionicons name="checkmark" size={14} color="white" />
                  ) : null}
                </View>
              </Pressable>
            ))}
          </ScrollView>

          <View className="mt-2 flex-row justify-between">
            <Pressable
              onPress={onCancel}
              className="flex-1 mr-2 h-11 rounded-full bg-rose-500 items-center justify-center"
            >
              <Text className="text-white font-medium">{cancelText}</Text>
            </Pressable>
            <Pressable
              onPress={handleConfirm}
              className="flex-1 ml-2 h-11 rounded-full bg-green-500 items-center justify-center"
            >
              <Text className="text-white font-medium">{confirmText}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
