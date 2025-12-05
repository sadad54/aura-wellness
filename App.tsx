import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Platform } from 'react-native';
import { Home, BookOpen, Music, TrendingUp, User, Target } from 'lucide-react-native';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { HomeScreenEnhanced } from './src/screens/HomeScreenEnhanced';
import { JournalScreenEnhanced } from './src/screens/JournalScreenEnhanced';
import { SoundscapeScreenEnhanced } from './src/screens/SoundscapeScreenEnhanced';
import { AnalyticsScreenEnhanced } from './src/screens/AnalyticsScreenEnhanced';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { theme } from './src/theme';
import { HabitsScreen } from './src/screens/HabitsScreen';

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
    { id: 'home', icon: Home, label: 'Home', component: HomeScreenEnhanced },
    { id: 'journal', icon: BookOpen, label: 'Journal', component: JournalScreenEnhanced },
    { id: 'sound', icon: Music, label: 'Sound', component: SoundscapeScreenEnhanced },
    { id: 'analytics', icon: TrendingUp, label: 'Analytics', component: AnalyticsScreenEnhanced },
    { id: 'habits', icon: Target, label: 'Habits', component: HabitsScreen },
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