// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Platform } from 'react-native';
// import { Home, BookOpen, Music, TrendingUp, User, Target, PieChart, Smile } from 'lucide-react-native';
// import { OnboardingScreen } from './src/screens/OnboardingScreen';
// import { HomeScreenEnhanced } from './src/screens/HomeScreenEnhanced';
// import { JournalScreenEnhanced } from './src/screens/JournalScreenEnhanced';
// import { SoundscapeScreenEnhanced } from './src/screens/SoundscapeScreenEnhanced';
// import { AnalyticsScreenEnhanced } from './src/screens/AnalyticsScreenEnhanced';
// import { ProfileScreen } from './src/screens/ProfileScreen';
// import { theme } from './src/theme';
// import { HabitsScreen } from './src/screens/HabitsScreen';
// import { GroundingScreen } from './src/screens/GroundingScreen';
// import { WellnessToolsScreen } from './src/screens/WellnessToolsScreen';
// import { ReflectionScreen } from './src/screens/ReflectionScreen';
// import { MoreMenu } from './src/components/MoreMenu';


// // Wrapper for Wellness Tab to handle Grounding navigation
// const WellnessTabWrapper = () => {
//   const [currentView, setCurrentView] = useState<'tools' | 'grounding'>('tools');

//   if (currentView === 'grounding') {
//     return <GroundingScreen onClose={() => setCurrentView('tools')} />;
//   }
//   return <WellnessToolsScreen onNavigate={(screen) => setCurrentView(screen === 'Grounding' ? 'grounding' : 'tools')} />;
// };



// export default function App() {
//   const [isOnboarded, setIsOnboarded] = useState(false);
//   const [userData, setUserData] = useState<{ name: string; mood: string } | null>(null);
//   const [activeTab, setActiveTab] = useState('home');

//   const handleOnboardingComplete = (data: { name: string; mood: string }) => {
//     setUserData(data);
//     setIsOnboarded(true);
//   };

//   if (!isOnboarded) {
//     return <OnboardingScreen onComplete={handleOnboardingComplete} />;
//   }

//   const tabs = [
//     { id: 'home', icon: Home, label: 'Home', component: HomeScreenEnhanced },
//     { id: 'journal', icon: BookOpen, label: 'Journal', component: JournalScreenEnhanced },
//     { id: 'sound', icon: Music, label: 'Sound', component: SoundscapeScreenEnhanced },
//     { id: 'analytics', icon: TrendingUp, label: 'Analytics', component: AnalyticsScreenEnhanced },
//     { id: 'habits', icon: Target, label: 'Habits', component: HabitsScreen },
//     { id: 'wellness', icon: Smile, label: 'Wellness', component: WellnessTabWrapper }, // New Wellness Tab
//     { id: 'reflection', icon: PieChart, label: 'Reflection', component: ReflectionScreen }, // New Reflection Tab
//     { id: 'profile', icon: User, label: 'Profile', component: ProfileScreen },
//   ];

//   const ActiveComponent = tabs.find(t => t.id === activeTab)?.component;

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" />
      
//       <View style={styles.content}>
//         {ActiveComponent && <ActiveComponent userData={userData || undefined} />}
//       </View>

//       <View style={styles.tabBar}>
//         {tabs.map((tab) => (
//           <TouchableOpacity
//             key={tab.id}
//             style={styles.tab}
//             onPress={() => setActiveTab(tab.id)}
//           >
//             <tab.icon 
//               size={24} 
//               color={activeTab === tab.id ? theme.colors.primary : theme.colors.textTertiary} 
//             />
//             <Text style={[
//               styles.tabLabel,
//               activeTab === tab.id && styles.tabLabelActive
//             ]}>
//               {tab.label}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: theme.colors.background,
//   },
//   content: {
//     flex: 1,
//   },
//   tabBar: {
//     flexDirection: 'row',
//     backgroundColor: theme.colors.surface,
//     borderTopWidth: 1,
//     borderTopColor: theme.colors.border,
//     paddingBottom: Platform.OS === 'ios' ? 20 : 0,
//   },
//   tab: {
//     flex: 1,
//     alignItems: 'center',
//     paddingVertical: 12,
//   },
//   tabLabel: {
//     fontSize: 11,
//     color: theme.colors.textTertiary,
//     marginTop: 4,
//   },
//   tabLabelActive: {
//     color: theme.colors.primary,
//     fontWeight: '600',
//   },
// });
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

// Components
import { MoreMenu } from './src/components/MoreMenu';
import { theme } from './src/theme';

// Wrapper to handle Grounding navigation within Wellness tab
const WellnessTabWrapper = () => {
  const [currentView, setCurrentView] = useState<'tools' | 'grounding'>('tools');
  if (currentView === 'grounding') {
    return <GroundingScreen onClose={() => setCurrentView('tools')} />;
  }
  return <WellnessToolsScreen onNavigate={(screen) => setCurrentView(screen === 'Grounding' ? 'grounding' : 'tools')} />;
};

export default function App() {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [userData, setUserData] = useState<{ name: string; mood: string } | null>(null);
  
  // Navigation State
  const [activeTab, setActiveTab] = useState('Home');
  const [isMoreMenuVisible, setIsMoreMenuVisible] = useState(false);

  const handleOnboardingComplete = (data: { name: string; mood: string }) => {
    setUserData(data);
    setIsOnboarded(true);
  };

  if (!isOnboarded) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  // Define the Main Bottom Tabs
  const mainTabs = [
    { id: 'Home', label: 'Home', icon: Home },
    { id: 'Journal', label: 'Journal', icon: BookOpen },
    { id: 'Sounds', label: 'Sounds', icon: Waves },
    { id: 'Insights', label: 'Insights', icon: BarChart2 },
    { id: 'Profile', label: 'Profile', icon: User },
    { id: 'More', label: 'More', icon: Menu },
  ];

  // Render the active screen
  const renderScreen = () => {
    switch (activeTab) {
      case 'Home': return <HomeScreenEnhanced userData={userData || undefined} onNavigate={setActiveTab} />;
      case 'Journal': return <JournalScreenEnhanced />;
      case 'Sounds': return <SoundscapeScreenEnhanced />;
      case 'Insights': return <AnalyticsScreenEnhanced />;
      case 'Profile': return <ProfileScreen userData={userData || undefined} />;
      
      // Hidden screens accessed via "More"
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

  // Determine if a "More" sub-item is currently active to highlight the More tab
  const isMoreTabActive = ['Habits', 'Wellness', 'Reflection'].includes(activeTab);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      {/* Main Content Area */}
      <View style={styles.content}>
        {renderScreen()}
      </View>

      {/* More Features Overlay */}
      <MoreMenu 
        visible={isMoreMenuVisible} 
        onClose={() => setIsMoreMenuVisible(false)}
        onNavigate={handleMoreNavigation}
      />

      {/* Bottom Navigation Bar */}
      <View style={styles.tabBarContainer}>
        <View style={styles.tabBar}>
          {mainTabs.map((tab) => {
            const isActive = activeTab === tab.id || (tab.id === 'More' && isMoreTabActive);
            const color = isActive ? '#C084FC' : theme.colors.textTertiary; // Light purple for active
            
            return (
              <TouchableOpacity
                key={tab.id}
                style={styles.tab}
                onPress={() => handleTabPress(tab.id)}
                activeOpacity={0.7}
              >
                <tab.icon 
                  size={24} 
                  color={color} 
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <Text style={[styles.tabLabel, { color }]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
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
  tabBarContainer: {
    backgroundColor: '#0F0F16', // Very dark background matching video
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  tabBar: {
    flexDirection: 'row',
    height: 65,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    gap: 4,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '500',
  },
});