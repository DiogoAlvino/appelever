import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import PrimaryHelper from '../helpers/primaryHelper';

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
                            <Feather name="help-circle" size={16} color="#173A64" style={{ marginLeft: 6 }} />
                        </TouchableOpacity>
                    )}
                </View>

                <TouchableOpacity onPress={() => setExpanded(!expanded)}>
                    <Feather name={expanded ? 'x' : 'chevron-down'} size={20} color="#173A64" />
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
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        marginVertical: 8,
        elevation: 1,
        width: "100%",
        gap: 12,
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
    },
    title: {
        fontSize: 16,
        color: '#173A64',
        fontWeight: 'bold',
    },
    content: {
        marginTop: 12,
    },
});
