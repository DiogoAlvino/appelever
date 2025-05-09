import { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fontSize, border, width, heigth, margin, padding, gap, shadow, weight } from '~/theme';

interface PrimarySectionProps {
  title: string;
  children: ReactNode;
}

export default function PrimarySection({ title, children }: PrimarySectionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.primaryLight,
    borderRadius: border.radius,
    padding: padding.fourty,
    shadowColor: colors.primaryDark,
    shadowOpacity: shadow.opacity,
    shadowRadius: shadow.radius,
    shadowOffset: { width: 0, height: 5 },
    elevation: shadow.elevation,
  },
  title: {
    fontSize: fontSize.label,
    fontWeight: '500',
    color: colors.mainColor,
    marginBottom: margin.sectionBottom,
  },
  content: {
    gap: gap.terty,
  },
});
