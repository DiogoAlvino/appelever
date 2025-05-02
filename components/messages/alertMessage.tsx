/* exemplo de uso:

<AlertMessage
  type="info"
  message="Itens a serem verificados quanto à conformidade com a ABNT NBR 16858-1"
  onClose={() => setVisible(false)}
/>
*/

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSize, border, width, heigth, margin, padding, gap, shadow } from '~/theme';


interface AlertMessageProps {
  type: 'info' | 'success' | 'error' | 'warning';
  message: string;
  icon?: React.ReactNode;
}

export default function AlertMessage({ type, message, icon }: AlertMessageProps) {
  const { backgroundColor, defaultIcon } = getStyleByType(type);
  const [visible, setVisible] = useState(true);

  if (!visible){
    return null;
  }

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        {icon || defaultIcon}
        <Text style={styles.message}>{message}</Text>
      </View>
      <TouchableOpacity onPress={handleClose}>
        <Feather name="x" size={22} color="#173A64" />
      </TouchableOpacity>
    </View>
  );
}

function getStyleByType(type: AlertMessageProps['type']) {

    if (type === 'success') {
        return {
            backgroundColor: '#E3F5E1',
            defaultIcon: <Feather name="check-circle" size={22} color="#168821" />,
        }
    }

    if (type === 'error') {
        return {
            backgroundColor: '#FDE0DB',
            defaultIcon: <Feather name="x-circle" size={22} color="#E52207" />,
        };
    }

    if (type === 'warning') {
        return {
            backgroundColor: '#FFF5C2',
            defaultIcon: <Feather name="alert-triangle" size={22} color="#333333" />,
        };
    }

    if (type === 'info') {
        return {
            backgroundColor: '#D4E5FF',
            defaultIcon: <Feather name="info" size={22} color="#155BCB" />,
        };
    }

    return {
        backgroundColor: '#D4E5FF',
        defaultIcon: <Feather name="info" size={22} color="#155BCB" />,
    };
}

const styles = StyleSheet.create({
  container: {
    borderRadius: border.radius,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: colors.primaryDark,
    shadowOpacity: shadow.opacity,
    shadowRadius: shadow.radius,
    shadowOffset: { width: 0, height: 3 },
    elevation: shadow.elevation,
    width: "100%",
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    gap: 8,
  },
  message: {
    fontSize: fontSize.placeholder,
    color: colors.primaryDark,
    flexShrink: 1,
  },
});
