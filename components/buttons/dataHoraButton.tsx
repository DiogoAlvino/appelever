import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface DataHoraButtonProps {
  value?: Date | null;
  onChange?: (data: Date) => void;
}

export default function DataHoraButton({ value, onChange }: DataHoraButtonProps) {
  const [dataHora, setDataHora] = useState<Date | null>(value ?? null);

  useEffect(() => {
    if (value) setDataHora(value);
  }, [value]);

  const registrarDataHora = () => {
    if (!dataHora) {
      const agora = new Date();
      setDataHora(agora);
      onChange?.(agora);
    }
  };

  const formatarDataHora = (data: Date) =>
    data.toLocaleString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.botao} onPress={registrarDataHora}>
        <Feather name="clock" size={20  } color="#173A64" style={styles.icone} />
        <Text style={styles.texto}>Adicionar data/hora</Text>
      </TouchableOpacity>

      {dataHora && (
        <Text style={styles.dataHoraTexto}>Dada e hora: {formatarDataHora(dataHora)}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  botao: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#173A64',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  icone: {
    marginRight: 8,
  },
  texto: {
    color: '#173A64',
    fontWeight: '500',
    fontSize: 16,
  },
  dataHoraTexto: {
    marginTop: 8,
    fontSize: 16,
    color: '#333',
  },
});
