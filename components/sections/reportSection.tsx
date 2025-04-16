import { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fontSize, border, width, heigth, margin, padding, gap, shadow, weight } from '~/theme';

interface ReportSectionProps {
  title: string;
  children: ReactNode;
}

export default function ReportSection({ title, children }: ReportSectionProps) {
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
    marginVertical: 10,

  },
  title: {
    fontSize: fontSize.title,
    fontWeight: '500',
    color: colors.mainColor,
    paddingBottom: 6,
    marginBottom: margin.sectionBottom,
    borderBottomWidth: border.width,
    borderBottomColor: colors.mainColor,
  },
  content: {
    gap: gap.terty,
    fontSize: fontSize.placeholder,
  },
});
