import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Platform } from 'react-native';
import { Home, BookOpen, Waves, BarChart2, User, Menu } from 'lucide-react-native';
// Screens
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { HomeScreenEnhanced } from './src/screens/HomeScreenEnhanced';
import { JournalScreenEnhanced } from './src/screens/JournalScreenEnhanced';
import { SoundscapeScreenEnhanced } from './src/screens/SoundscapeScreenEnhanced';
import { AnalyticsScreenEnhanced } from './src/screens/AnalyticsScreenEnhanced';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { HabitsScreen } from './src/screens/HabitsScreen';
import { ReflectionScreen } from './src/screens/ReflectionScreen';
import { WellnessToolsScreen } from './src/screens/WellnessToolsScreen';
import { GroundingScreen } from './src/screens/GroundingScreen';
import { BreathScreen } from './src/screens/BreathScreen';
import { EmotionWheelScreen } from './src/screens/EmotionWheelScreen';
import { ThoughtReframeScreen } from './src/screens/ThoughtReframeScreen';
import { AffirmationsScreen } from './src/screens/AffirmationsScreen';
import { InnerChildScreen } from './src/screens/InnerChildScreen';



// Components
import { MoreMenu } from './src/components/MoreMenu';
import { theme } from './src/theme';
import { WellnessProvider } from './src/context/WellnessContext';

// Wrapper for Wellness Tab
const WellnessTabWrapper = () => {
  const [currentView, setCurrentView] = useState<'tools' | 'grounding' | 'breath' | 'emotion' | 'cbt' | 'affirm' | 'inner'>('tools');

  // Map IDs from WellnessToolsScreen to internal states
  const handleNavigate = (screenId: string) => {
    switch(screenId) {
      case 'Grounding': setCurrentView('grounding'); break;
      case 'breath': setCurrentView('breath'); break;
      case 'emotion': setCurrentView('emotion'); break;
      case 'cbt': setCurrentView('cbt'); break;
      case 'affirm': setCurrentView('affirm'); break;
      case 'inner': setCurrentView('inner'); break;
      default: setCurrentView('tools');
    }
  };

  const close = () => setCurrentView('tools');

  switch (currentView) {
    case 'grounding': return <GroundingScreen onClose={close} />;
    case 'breath': return <BreathScreen onClose={close} />;
    case 'emotion': return <EmotionWheelScreen onClose={close} />;
    case 'cbt': return <ThoughtReframeScreen onClose={close} />;
    case 'affirm': return <AffirmationsScreen onClose={close} />;
    case 'inner': return <InnerChildScreen onClose={close} />;
    default: return <WellnessToolsScreen onNavigate={handleNavigate} />;
  }
};

export default function App() {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [userData, setUserData] = useState<{ name: string; mood: string } | null>(null);
  
  const [activeTab, setActiveTab] = useState('Home');
  const [isMoreMenuVisible, setIsMoreMenuVisible] = useState(false);

  const handleOnboardingComplete = (data: { name: string; mood: string }) => {
    setUserData(data);
    setIsOnboarded(true);
  };

  if (!isOnboarded) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  const mainTabs = [
    { id: 'Home', label: 'Home', icon: Home },
    { id: 'Journal', label: 'Journal', icon: BookOpen },
    { id: 'Sounds', label: 'Sounds', icon: Waves },
    { id: 'Insights', label: 'Insights', icon: BarChart2 },
    { id: 'Profile', label: 'Profile', icon: User },
    { id: 'More', label: 'More', icon: Menu },
  ];

  const renderScreen = () => {
    switch (activeTab) {
      case 'Home': return <HomeScreenEnhanced userData={userData || undefined} onNavigate={setActiveTab} />;
      case 'Journal': return <JournalScreenEnhanced />;
      case 'Sounds': return <SoundscapeScreenEnhanced />;
      case 'Insights': return <AnalyticsScreenEnhanced />;
      case 'Profile': return <ProfileScreen userData={userData || undefined} />;
      case 'Habits': return <HabitsScreen />;
      case 'Wellness': return <WellnessTabWrapper />;
      case 'Reflection': return <ReflectionScreen />;
      default: return <HomeScreenEnhanced userData={userData || undefined} />;
    }
  };

  const handleTabPress = (tabId: string) => {
    if (tabId === 'More') {
      setIsMoreMenuVisible(!isMoreMenuVisible);
    } else {
      setActiveTab(tabId);
      setIsMoreMenuVisible(false);
    }
  };

  const handleMoreNavigation = (screen: string) => {
    setActiveTab(screen);
    setIsMoreMenuVisible(false);
  };

  const isMoreTabActive = ['Habits', 'Wellness', 'Reflection'].includes(activeTab);

  return (
    <WellnessProvider>
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      <View style={styles.content}>
        {renderScreen()}
      </View>

      <MoreMenu 
        visible={isMoreMenuVisible} 
        onClose={() => setIsMoreMenuVisible(false)}
        onNavigate={handleMoreNavigation}
      />

      {/* Floating Bottom Navigation Bar */}
      <View style={styles.tabBarContainer}>
        <View style={styles.tabBar}>
            {mainTabs.map((tab) => {
              const isActive = activeTab === tab.id || (tab.id === 'More' && isMoreTabActive);
              // Active color is white when glowing, inactive is gray
              const color = isActive ? '#FFFFFF' : theme.colors.textTertiary;
              
              return (
                <TouchableOpacity
                  key={tab.id}
                  style={styles.tab}
                  onPress={() => handleTabPress(tab.id)}
                  activeOpacity={0.7}
                >
                  <View style={[
                    styles.iconWrapper, 
                    isActive && styles.activeIconWrapper // Apply glow style if active
                  ]}>
                    <tab.icon 
                      size={24} 
                      color={color} 
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                  </View>
                  <Text style={[styles.tabLabel, { color }]}>
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
      </View>
    </View>
    </WellnessProvider>
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
  tabBarContainer: {
    backgroundColor: 'rgba(10, 10, 15, 0.85)', 
    borderTopWidth: 0,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  tabBar: {
    flexDirection: 'row',
    height: 60,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  iconWrapper: {
    padding: 8,
    borderRadius: 20,
    marginBottom: 4,
  },
  activeIconWrapper: {
    // Purple background with low opacity
    backgroundColor: 'rgba(124, 58, 237, 0.75)', 
    // The "Glow" effect
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5, // Android glow
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
  },
});