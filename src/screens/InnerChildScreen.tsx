import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Platform, TouchableOpacity, Image } from 'react-native';
import { X, Send, User } from 'lucide-react-native';
import { theme } from '../theme';
import { GlassCard } from '../components/GlassCard';

export const InnerChildScreen: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<{id: number, text: string, sender: 'me' | 'child'}[]>([
    { id: 1, text: "Hi there. How are you feeling today?", sender: 'child' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = { id: Date.now(), text: input, sender: 'me' as const };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    
    // Simulate gentle response
    setTimeout(() => {
      const responses = ["I hear you.", "That makes sense.", "I'm glad you told me.", "We are safe now."];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { id: Date.now() + 1, text: randomResponse, sender: 'child' }]);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <View style={styles.avatar}><User size={20} color="#FFF" /></View>
          <View>
            <Text style={styles.headerTitle}>Inner Child</Text>
            <Text style={styles.headerSub}>Safe Space</Text>
          </View>
        </View>
        <TouchableOpacity onPress={onClose}><X size={24} color={theme.colors.textSecondary} /></TouchableOpacity>
      </View>

      <ScrollView style={styles.chatArea} contentContainerStyle={{ paddingBottom: 20 }}>
        {messages.map(msg => (
          <View key={msg.id} style={[styles.msgRow, msg.sender === 'me' ? styles.msgRight : styles.msgLeft]}>
            <View style={[styles.bubble, msg.sender === 'me' ? styles.bubbleMe : styles.bubbleChild]}>
              <Text style={styles.msgText}>{msg.text}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputArea}>
        <GlassCard style={styles.inputCard} gradient={true}>
          <TextInput 
            style={styles.input} 
            placeholder="Type a message..." 
            placeholderTextColor={theme.colors.textTertiary}
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity onPress={handleSend} style={styles.sendBtn}>
            <Send size={20} color="#FFF" />
          </TouchableOpacity>
        </GlassCard>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, paddingTop: Platform.OS === 'ios' ? 50 : 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  headerInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: theme.colors.success, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 16, fontWeight: 'bold', color: theme.colors.text },
  headerSub: { fontSize: 12, color: theme.colors.success },
  chatArea: { flex: 1, padding: 20 },
  msgRow: { flexDirection: 'row', marginBottom: 12 },
  msgLeft: { justifyContent: 'flex-start' },
  msgRight: { justifyContent: 'flex-end' },
  bubble: { padding: 12, borderRadius: 16, maxWidth: '80%' },
  bubbleChild: { backgroundColor: theme.colors.surface, borderBottomLeftRadius: 4 },
  bubbleMe: { backgroundColor: theme.colors.primary, borderBottomRightRadius: 4 },
  msgText: { color: theme.colors.text, fontSize: 15 },
  inputArea: { padding: 20, paddingBottom: Platform.OS === 'ios' ? 40 : 20 },
  inputCard: { flexDirection: 'row', alignItems: 'center', padding: 8, paddingHorizontal: 16, marginBottom: 0 },
  input: { flex: 1, color: theme.colors.text, fontSize: 16, height: 40 },
  sendBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: theme.colors.primary, alignItems: 'center', justifyContent: 'center', marginLeft: 8 },
});