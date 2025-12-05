import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Platform } from 'react-native';
import { Home, BookOpen, Music, TrendingUp, User } from 'lucide-react-native';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { JournalScreen } from './src/screens/JournalScreen';
import { SoundscapeScreen } from './src/screens/SoundscapeScreen';
import { AnalyticsScreen } from './src/screens/AnalyticsScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { theme } from './src/theme';

export default function App() {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [userData, setUserData] = useState<{ name: string; mood: string } | null>(null);
  const [activeTab, setActiveTab] = useState('home');

  const handleOnboardingComplete = (data: { name: string; mood: string }) => {
    setUserData(data);
    setIsOnboarded(true);
  };

  if (!isOnboarded) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  const tabs = [
    { id: 'home', icon: Home, label: 'Home', component: HomeScreen },
    { id: 'journal', icon: BookOpen, label: 'Journal', component: JournalScreen },
    { id: 'sound', icon: Music, label: 'Sound', component: SoundscapeScreen },
    { id: 'analytics', icon: TrendingUp, label: 'Analytics', component: AnalyticsScreen },
    { id: 'profile', icon: User, label: 'Profile', component: ProfileScreen },
  ];

  const ActiveComponent = tabs.find(t => t.id === activeTab)?.component;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.content}>
        {ActiveComponent && <ActiveComponent userData={userData || undefined} />}
      </View>

      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={styles.tab}
            onPress={() => setActiveTab(tab.id)}
          >
            <tab.icon 
              size={24} 
              color={activeTab === tab.id ? theme.colors.primary : theme.colors.textTertiary} 
            />
            <Text style={[
              styles.tabLabel,
              activeTab === tab.id && styles.tabLabelActive
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  tabLabel: {
    fontSize: 11,
    color: theme.colors.textTertiary,
    marginTop: 4,
  },
  tabLabelActive: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
});