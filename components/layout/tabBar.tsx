import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { colors } from '~/theme';

interface TabItem {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  route: string;
}

interface TabBarProps {
  tabs: TabItem[];
}

export default function TabBar({ tabs }: TabBarProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        const isActive = pathname === tab.route;

        return (
          <TouchableOpacity
            key={index}
            style={[styles.tabItem, isActive && styles.activeTab]}
            onPress={() => router.push(tab.route as any)}
          >
            <Feather
              name={tab.icon}
              size={20}
              color={isActive ? colors.mainColor : colors.mainColor }
            />
            <Text style={[styles.label, isActive && { color: colors.mainColor }]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 50,
    backgroundColor: '#fff',
    paddingVertical: 8,
    justifyContent: 'space-around',
    marginHorizontal: 5,
    
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: 4,
  },
  label: {
    fontSize: 10,
    color: colors.mainColor,
    flexWrap: 'wrap',
  },
  activeTab: {
    borderTopWidth: 2,
    borderColor: colors.mainColor,
    paddingTop: 6,
  },
});
