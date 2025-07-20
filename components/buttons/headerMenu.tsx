// components/HeaderMenu.tsx
import { Feather } from '@expo/vector-icons';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { Text, View, StyleSheet } from 'react-native';

interface HeaderMenuProps {
  onEdit?: () => void;
  onGeneratePDF?: () => void;
  onDelete?: () => void;
}

export default function HeaderMenu({ onEdit, onGeneratePDF, onDelete }: HeaderMenuProps) {
  return (
    <Menu>
      <MenuTrigger>
        <Feather name="more-vertical" size={24} color="black" />
      </MenuTrigger>
      <MenuOptions customStyles={{ optionsContainer: styles.menu }}>
        {onEdit && (
            <MenuOption onSelect={onEdit}>
            <View style={styles.option}>
                <Feather name="edit-2" size={16} color="black" />
                <Text style={styles.text}>Editar</Text>
            </View>
            </MenuOption>
        )}
        { onGeneratePDF && (
            <MenuOption onSelect={onGeneratePDF}>
            <View style={styles.option}>
                <Feather name="file-text" size={16} color="black" />
                <Text style={styles.text}>Gerar PDF</Text>
            </View>
            </MenuOption>
        )}
        { onDelete && (
            <MenuOption onSelect={onDelete}>
            <View style={styles.option}>
                <Feather name="trash" size={16} color="red" />
                <Text style={[styles.text, { color: 'red' }]}>Excluir</Text>
            </View>
            </MenuOption>
        )}
      </MenuOptions>
    </Menu>
  );
}

const styles = StyleSheet.create({
  menu: {
    padding: 5,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  text: {
    fontSize: 16,
  },
});
