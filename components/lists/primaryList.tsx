import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import PrimaryHelper from '../helpers/primaryHelper';
import { colors, fontSize, border, width, heigth, margin, padding, gap, shadow } from '~/theme';

interface PrimaryListProps {
    title: string;
    children: React.ReactNode;
    helperEnabled?: boolean;
    helperTitle?: string;
    helperImage?: any;
    helperDescription?: string;
}

export default function PrimaryList({
    title,
    children,
    helperEnabled = false,
    helperTitle = '',
    helperImage,
    helperDescription = '',
}: PrimaryListProps) {
    const [expanded, setExpanded] = useState(false);
    const [showHelper, setShowHelper] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{title}</Text>
                    {helperEnabled && (
                        <TouchableOpacity onPress={() => setShowHelper(true)}>
                            <Feather name="help-circle" size={20} color="#173A64" style={{ marginLeft: 6 }} />
                        </TouchableOpacity>
                    )}
                </View>

                <TouchableOpacity onPress={() => setExpanded(!expanded)}>
                    <Feather name={expanded ? 'x' : 'chevron-down'} size={25} color="#173A64" />
                </TouchableOpacity>
            </View>

            {expanded && (
                <View style={styles.content}>
                    {children}
                </View>
            )}
            
            <PrimaryHelper
                visible={showHelper}
                onClose={() => setShowHelper(false)}
                title={helperTitle}
                description={helperDescription}
                imageSource={helperImage}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primaryLight,
        borderRadius: border.radius,
        padding: 15,
        marginVertical: 8,
        elevation: 1,
        width: "100%",
        shadowColor: colors.primaryDark,
        shadowOpacity: shadow.opacity,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: shadow.radius,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flexShrink: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%"
    },
    title: {
        fontSize: fontSize.title,
        color: colors.mainColor,
        fontWeight: '500',
    },
    content: {
        marginTop: 12,
    },
});
