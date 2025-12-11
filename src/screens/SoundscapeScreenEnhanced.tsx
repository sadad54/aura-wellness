// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform, Animated, Dimensions } from 'react-native';
// import { Play, Pause, Volume2, Timer, RotateCcw } from 'lucide-react-native';
// import { GlassCard } from '../components/GlassCard';
// import { theme } from '../theme';

// interface Soundscape {
//   id: string;
//   name: string;
//   description: string;
//   color: string;
//   gradient: [string, string];
//   icon: string;
// }

// export const SoundscapeScreenEnhanced: React.FC = () => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [selectedScene, setSelectedScene] = useState('rainforest');
//   const [volume, setVolume] = useState(0.7);
//   const [duration, setDuration] = useState(30);
//   const [timeLeft, setTimeLeft] = useState(30);

//   const rotateAnim = useRef(new Animated.Value(0)).current;
//   const waveformBars = Array(12).fill(0);

//   const soundscapes: Soundscape[] = [
//     {
//       id: 'rainforest',
//       name: 'Rainforest',
//       description: 'Tropical ambience with birds',
//       color: '#10B981',
//       gradient: ['#10B981', '#059669'],
//       icon: '🌿',
//     },
//     {
//       id: 'ocean',
//       name: 'Ocean Waves',
//       description: 'Calming ocean soundscape',
//       color: '#06B6D4',
//       gradient: ['#06B6D4', '#0891B2'],
//       icon: '🌊',
//     },
//     {
//       id: 'space',
//       name: 'Deep Space',
//       description: 'Cosmic meditation',
//       color: '#8B5CF6',
//       gradient: ['#8B5CF6', '#7C3AED'],
//       icon: '🚀',
//     },
//     {
//       id: 'fireplace',
//       name: 'Fireplace',
//       description: 'Cozy crackling fire',
//       color: '#F59E0B',
//       gradient: ['#F59E0B', '#D97706'],
//       icon: '🔥',
//     },
//     {
//       id: 'forest',
//       name: 'Forest Rain',
//       description: 'Rain in the woods',
//       color: '#059669',
//       gradient: ['#059669', '#047857'],
//       icon: '🌧️',
//     },
//     {
//       id: 'meditation',
//       name: 'Meditation Bell',
//       description: 'Zen ambience',
//       color: '#EC4899',
//       gradient: ['#EC4899', '#DB2777'],
//       icon: '🔔',
//     },
//   ];

//   const currentScene = soundscapes.find((s) => s.id === selectedScene);

//   useEffect(() => {
//     let interval: NodeJS.Timeout;

//     if (isPlaying && timeLeft > 0) {
//       interval = setInterval(() => {
//         setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
//       }, 1000);
//     } else if (timeLeft === 0 && isPlaying) {
//       setIsPlaying(false);
//     }

//     return () => clearInterval(interval);
//   }, [isPlaying, timeLeft]);

//   useEffect(() => {
//     if (isPlaying) {
//       Animated.loop(
//         Animated.timing(rotateAnim, {
//           toValue: 1,
//           duration: 8000,
//           useNativeDriver: true,
//         })
//       ).start();
//     } else {
//       rotateAnim.setValue(0);
//     }
//   }, [isPlaying, rotateAnim]);

//   const rotation = rotateAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: ['0deg', '360deg'],
//   });

//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   const handlePlayPause = () => {
//     setIsPlaying(!isPlaying);
//   };

//   const handleReset = () => {
//     setTimeLeft(duration);
//     setIsPlaying(false);
//   };

//   const getWaveformHeight = (index: number) => {
//     if (!isPlaying) return 0.2;
//     return Math.random() * 0.8 + 0.2;
//   };

//   return (
//     <ScrollView
//       style={[
//         styles.container,
//         { backgroundColor: `${currentScene?.color}05` },
//       ]}
//       showsVerticalScrollIndicator={false}
//     >
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.title}>Soundscapes</Text>
//         <Text style={styles.subtitle}>Find your perfect ambient atmosphere</Text>
//       </View>

//       {/* Now Playing Section */}
//       {currentScene && (
//         <GlassCard style={[styles.nowPlayingCard, { borderColor: `${currentScene.color}40` }]}>
//           <View style={styles.nowPlayingContent}>
//             <Text style={styles.nowPlayingEmoji}>{currentScene.icon}</Text>
//             <View style={styles.nowPlayingInfo}>
//               <Text style={styles.nowPlayingTitle}>{currentScene.name}</Text>
//               <Text style={styles.nowPlayingDesc}>{currentScene.description}</Text>
//             </View>
//           </View>
//         </GlassCard>
//       )}

//       {/* Player Section */}
//       <GlassCard style={styles.playerCard} gradient>
//         {/* Visualizer */}
//         <View style={styles.visualizer}>
//           <Animated.View
//             style={[
//               styles.outerRing,
//               {
//                 transform: [{ rotate: rotation }],
//               },
//             ]}
//           >
//             <View style={styles.outerRingInner} />
//           </Animated.View>

//           <View style={styles.waveformContainer}>
//             {waveformBars.map((_, index) => (
//               <View
//                 key={index}
//                 style={[
//                   styles.waveformBar,
//                   {
//                     height: isPlaying ? `${getWaveformHeight(index) * 100}%` : '20%',
//                     backgroundColor: currentScene?.color || theme.colors.primary,
//                   },
//                 ]}
//               />
//             ))}
//           </View>

//           <View style={[styles.centerCircle, { backgroundColor: currentScene?.color }]} />
//         </View>

//         {/* Time Display */}
//         <Text style={styles.timeDisplay}>{formatTime(timeLeft)}</Text>

//         {/* Play Button */}
//         <TouchableOpacity
//           style={[
//             styles.playButton,
//             {
//               backgroundColor: currentScene?.color || theme.colors.primary,
//             },
//           ]}
//           onPress={handlePlayPause}
//           activeOpacity={0.7}
//         >
//           {isPlaying ? (
//             <Pause size={40} color="#FFFFFF" fill="#FFFFFF" />
//           ) : (
//             <Play size={40} color="#FFFFFF" fill="#FFFFFF" />
//           )}
//         </TouchableOpacity>

//         {/* Control Buttons */}
//         <View style={styles.controlButtons}>
//           <TouchableOpacity
//             style={[styles.controlButton, styles.controlButtonSecondary]}
//             onPress={handleReset}
//           >
//             <RotateCcw size={18} color={theme.colors.primary} />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.controlButton}>
//             <Timer size={18} color={theme.colors.primary} />
//             <Text style={styles.controlButtonText}>{duration}m</Text>
//           </TouchableOpacity>
//         </View>
//       </GlassCard>

//       {/* Volume Control */}
//       <GlassCard style={styles.controlCard}>
//         <View style={styles.volumeHeader}>
//           <Volume2 size={20} color={theme.colors.primary} />
//           <Text style={styles.controlLabel}>Volume</Text>
//           <Text style={styles.volumeValue}>{Math.round(volume * 100)}%</Text>
//         </View>
//         <View style={styles.volumeSliderContainer}>
//           <View
//             style={[
//               styles.volumeSlider,
//               {
//                 width: `${volume * 100}%`,
//                 backgroundColor: currentScene?.color || theme.colors.primary,
//               },
//             ]}
//           />
//         </View>
//       </GlassCard>

//       {/* Scene Selector */}
//       <Text style={styles.sceneTitle}>Choose Your Scene</Text>
//       <View style={styles.scenesGrid}>
//         {soundscapes.map((scene) => (
//           <TouchableOpacity
//             key={scene.id}
//             style={[
//               styles.sceneCard,
//               selectedScene === scene.id && {
//                 backgroundColor: `${scene.color}30`,
//                 borderColor: scene.color,
//               },
//             ]}
//             onPress={() => {
//               setSelectedScene(scene.id);
//               setIsPlaying(false);
//               setTimeLeft(duration);
//             }}
//             activeOpacity={0.6}
//           >
//             <Text style={styles.sceneEmoji}>{scene.icon}</Text>
//             <Text style={styles.sceneName}>{scene.name}</Text>
//             <Text style={styles.sceneDescription}>{scene.description}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Duration Selector */}
//       <Text style={styles.durationTitle}>Session Duration</Text>
//       <View style={styles.durationButtons}>
//         {[15, 30, 60, 120].map((min) => (
//           <TouchableOpacity
//             key={min}
//             style={[
//               styles.durationButton,
//               duration === min && {
//                 backgroundColor: currentScene?.color || theme.colors.primary,
//                 borderColor: currentScene?.color || theme.colors.primary,
//               },
//             ]}
//             onPress={() => {
//               setDuration(min);
//               setTimeLeft(min);
//               setIsPlaying(false);
//             }}
//           >
//             <Text
//               style={[
//                 styles.durationButtonText,
//                 duration === min && { color: '#FFFFFF' },
//               ]}
//             >
//               {min}m
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Info Card */}
//       <GlassCard style={styles.infoCard}>
//         <Text style={styles.infoTitle}>💡 Soundscape Tips</Text>
//         <Text style={styles.infoText}>
//           • Use soundscapes during work for better focus{'\n'}
//           • Before bed to help you fall asleep{'\n'}
//           • During meditation for deeper relaxation{'\n'}
//           • Background ambience while reading or studying
//         </Text>
//       </GlassCard>

//       <View style={styles.spacer} />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: theme.colors.background,
//     paddingTop: Platform.OS === 'ios' ? 50 : 30,
//   },
//   spacer: {
//     height: 40,
//   },
//   header: {
//     paddingHorizontal: theme.spacing.lg,
//     marginBottom: theme.spacing.xl,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: theme.colors.text,
//     marginBottom: theme.spacing.sm,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: theme.colors.textSecondary,
//   },
//   nowPlayingCard: {
//     marginHorizontal: theme.spacing.lg,
//     marginBottom: theme.spacing.lg,
//   },
//   nowPlayingContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: theme.spacing.md,
//   },
//   nowPlayingEmoji: {
//     fontSize: 40,
//   },
//   nowPlayingInfo: {
//     flex: 1,
//   },
//   nowPlayingTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: theme.colors.text,
//     marginBottom: 2,
//   },
//   nowPlayingDesc: {
//     fontSize: 12,
//     color: theme.colors.textSecondary,
//   },
//   playerCard: {
//     marginHorizontal: theme.spacing.lg,
//     marginBottom: theme.spacing.xl,
//     paddingVertical: theme.spacing.xl,
//   },
//   visualizer: {
//     width: 200,
//     height: 200,
//     alignSelf: 'center',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: theme.spacing.lg,
//     position: 'relative',
//   },
//   outerRing: {
//     position: 'absolute',
//     width: 200,
//     height: 200,
//     borderRadius: 100,
//   },
//   outerRingInner: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 100,
//     borderWidth: 2,
//     borderColor: 'rgba(124, 58, 237, 0.3)',
//   },
//   waveformContainer: {
//     position: 'absolute',
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//     flexDirection: 'row',
//     alignItems: 'flex-end',
//     justifyContent: 'space-around',
//     paddingHorizontal: theme.spacing.md,
//   },
//   waveformBar: {
//     width: '6%',
//     borderRadius: 2,
//     minHeight: '20%',
//   },
//   centerCircle: {
//     position: 'absolute',
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     shadowColor: '#7C3AED',
//     shadowOffset: { width: 0, height: 0 },
//     shadowOpacity: 0.5,
//     shadowRadius: 15,
//     elevation: 8,
//   },
//   timeDisplay: {
//     fontSize: 32,
//     fontWeight: '700',
//     color: theme.colors.text,
//     textAlign: 'center',
//     marginBottom: theme.spacing.lg,
//     fontFamily: 'monospace',
//   },
//   playButton: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignSelf: 'center',
//     marginBottom: theme.spacing.lg,
//     shadowColor: '#7C3AED',
//     shadowOffset: { width: 0, height: 8 },
//     shadowOpacity: 0.3,
//     shadowRadius: 16,
//     elevation: 10,
//   },
//   controlButtons: {
//     flexDirection: 'row',
//     gap: theme.spacing.md,
//     justifyContent: 'center',
//   },
//   controlButton: {
//     paddingHorizontal: theme.spacing.lg,
//     paddingVertical: theme.spacing.md,
//     borderRadius: theme.borderRadius.md,
//     backgroundColor: theme.colors.surface,
//     borderWidth: 1,
//     borderColor: theme.colors.border,
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: theme.spacing.sm,
//   },
//   controlButtonSecondary: {
//     paddingHorizontal: theme.spacing.md,
//   },
//   controlButtonText: {
//     color: theme.colors.text,
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   controlCard: {
//     marginHorizontal: theme.spacing.lg,
//     marginBottom: theme.spacing.lg,
//   },
//   volumeHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: theme.spacing.sm,
//     marginBottom: theme.spacing.md,
//   },
//   controlLabel: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: theme.colors.text,
//     flex: 1,
//   },
//   volumeValue: {
//     fontSize: 14,
//     color: theme.colors.primary,
//     fontWeight: '700',
//   },
//   volumeSliderContainer: {
//     height: 6,
//     backgroundColor: theme.colors.surface,
//     borderRadius: 3,
//     overflow: 'hidden',
//   },
//   volumeSlider: {
//     height: '100%',
//     borderRadius: 3,
//   },
//   sceneTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: theme.colors.text,
//     paddingHorizontal: theme.spacing.lg,
//     marginTop: theme.spacing.lg,
//     marginBottom: theme.spacing.md,
//   },
//   scenesGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     paddingHorizontal: theme.spacing.lg,
//     gap: theme.spacing.md,
//     marginBottom: theme.spacing.lg,
//   },
//   sceneCard: {
//     width: '47%',
//     backgroundColor: theme.colors.surface,
//     borderRadius: theme.borderRadius.md,
//     padding: theme.spacing.md,
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: 'transparent',
//   },
//   sceneEmoji: {
//     fontSize: 32,
//     marginBottom: theme.spacing.sm,
//   },
//   sceneName: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: theme.colors.text,
//     marginBottom: 2,
//   },
//   sceneDescription: {
//     fontSize: 11,
//     color: theme.colors.textSecondary,
//     textAlign: 'center',
//   },
//   durationTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: theme.colors.text,
//     paddingHorizontal: theme.spacing.lg,
//     marginBottom: theme.spacing.md,
//   },
//   durationButtons: {
//     flexDirection: 'row',
//     gap: theme.spacing.md,
//     paddingHorizontal: theme.spacing.lg,
//     marginBottom: theme.spacing.lg,
//   },
//   durationButton: {
//     flex: 1,
//     paddingVertical: theme.spacing.md,
//     borderRadius: theme.borderRadius.md,
//     borderWidth: 2,
//     borderColor: theme.colors.border,
//     backgroundColor: theme.colors.surface,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   durationButtonText: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: theme.colors.text,
//   },
//   infoCard: {
//     marginHorizontal: theme.spacing.lg,
//     marginBottom: theme.spacing.lg,
//     backgroundColor: 'rgba(167, 139, 250, 0.1)',
//     borderColor: 'rgba(167, 139, 250, 0.3)',
//   },
//   infoTitle: {
//     fontSize: 14,
//     fontWeight: '700',
//     color: theme.colors.text,
//     marginBottom: theme.spacing.md,
//   },
//   infoText: {
//     fontSize: 12,
//     color: theme.colors.textSecondary,
//     lineHeight: 18,
//   },
// });
import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Animated,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { Play, Pause, Volume2, Timer, RotateCcw, ChevronDown } from 'lucide-react-native';
import { GlassCard } from '../components/GlassCard';
import { theme } from '../theme';
import { useWellness } from '../context/WellnessContext';

interface Soundscape {
  id: string;
  name: string;
  description: string;
  color: string;
  gradient: [string, string];
  icon: string;
  veoPrompt: string; // For generating video assets
}

const { width, height } = Dimensions.get('window');
const { data } = useWellness(); // Get user's last mood

export const SoundscapeScreenEnhanced: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedScene, setSelectedScene] = useState('rainforest');
  const [volume, setVolume] = useState(0.7);
  const [duration, setDuration] = useState(30);
  const [timeLeft, setTimeLeft] = useState(30);
  const [expandedInfo, setExpandedInfo] = useState(false);

  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const slideUpAnim = useRef(new Animated.Value(0)).current;
// Logic to sort sounds dynamically
const recommendedSound = useMemo(() => {
  const lastMood = data.moodHistory[0]?.mood; // e.g., 'anxious'
  
  if (lastMood === 'anxious') return soundscapes.find(s => s.id === 'forest'); // Calming
  if (lastMood === 'tired') return soundscapes.find(s => s.id === 'space'); // Deep rest
  if (lastMood === 'happy') return soundscapes.find(s => s.id === 'ocean'); // Flow
  
  return soundscapes[0]; // Default
}, [data.moodHistory]);
  const soundscapes: Soundscape[] = [
    {
      id: 'rainforest',
      name: 'Rainforest',
      description: 'Tropical ambience with birds and distant rain',
      color: '#10B981',
      gradient: ['#10B981', '#059669'],
      icon: '🌿',
      veoPrompt: 'Lush tropical rainforest at dawn. Dense green canopy with dappled sunlight filtering through layers of leaves. Gentle fog rolling between ancient trees. Vibrant tropical birds flying between branches. Water droplets falling from wet leaves creating a misty atmosphere. Soft bokeh background of green foliage. Cinematic, immersive, calming. 4K quality.',
    },
    {
      id: 'ocean',
      name: 'Ocean Waves',
      description: 'Calming ocean soundscape with rhythmic waves',
      color: '#06B6D4',
      gradient: ['#06B6D4', '#0891B2'],
      icon: '🌊',
      veoPrompt: 'Serene sandy beach during golden hour. Gentle waves rolling onto pristine white sand in slow motion. Crystal clear turquoise water. Soft ocean mist. Seagulls flying overhead. Warm sunlight reflecting off the water. Palm trees swaying gently in the breeze on the shore. Peaceful, meditative, tropical. 4K cinematic.',
    },
    {
      id: 'space',
      name: 'Deep Space',
      description: 'Cosmic meditation with ambient space sounds',
      color: '#8B5CF6',
      gradient: ['#8B5CF6', '#7C3AED'],
      icon: '🚀',
      veoPrompt: 'Infinite cosmic space with slowly rotating galaxy. Deep purple and blue nebulae with soft particle effects. Distant stars twinkling gently. Aurora-like energy waves flowing through space. Subtle light rays moving across the void. Meditation-focused, transcendent atmosphere. No planets, pure cosmic energy. 4K, smooth, immersive.',
    },
    {
      id: 'fireplace',
      name: 'Fireplace',
      description: 'Cozy crackling fire with warm ambient glow',
      color: '#F59E0B',
      gradient: ['#F59E0B', '#D97706'],
      icon: '🔥',
      veoPrompt: 'Close-up of crackling fireplace with dancing orange and golden flames. Warm amber light illuminating dark wooden interior. Glowing embers pulsing gently. Slow-motion fire movement. Cozy cabin aesthetic with warm color temperature. Wood logs visible beneath flames. Intimate, warm, peaceful. 4K high quality.',
    },
    {
      id: 'forest',
      name: 'Forest Rain',
      description: 'Rain in the woods with natural forest sounds',
      color: '#059669',
      gradient: ['#059669', '#047857'],
      icon: '🌧️',
      veoPrompt: 'Dense ancient forest during soft rainfall. Rain drops falling on green leaves and moss-covered ground. Misty atmosphere between tall trees. Water running down tree trunks. Wet foliage glistening. Soft diffused light filtering through clouds. Natural, serene, grounding. Cinematic depth. 4K quality.',
    },
    {
      id: 'meditation',
      name: 'Meditation Bell',
      description: 'Zen ambience with gentle bells and harmony',
      color: '#EC4899',
      gradient: ['#EC4899', '#DB2777'],
      icon: '🔔',
      veoPrompt: 'Minimalist zen garden with carefully raked sand patterns. Single meditation bell suspended in center. Soft golden hour light. Gentle mist rising from the ground. Cherry blossom petals floating slowly through air. Peaceful stone pathway. Serene, spiritual, calming. Warm color grade. 4K cinematic.',
    },
  ];

  const currentScene = soundscapes.find((s) => s.id === selectedScene);

  // Time countdown logic
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
    }

    return () => clearInterval(interval);
  }, [isPlaying, timeLeft]);

  // Rotation animation for center orb
  useEffect(() => {
    if (isPlaying) {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 20000,
          useNativeDriver: true,
        })
      ).start();
    } else {
      rotateAnim.setValue(0);
    }
  }, [isPlaying, rotateAnim]);

  // Pulse animation when playing
  useEffect(() => {
    if (isPlaying) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.08,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isPlaying, pulseAnim]);

  // Slide up animation for info panel
  useEffect(() => {
    Animated.timing(slideUpAnim, {
      toValue: expandedInfo ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [expandedInfo, slideUpAnim]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const slideTranslate = slideUpAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setTimeLeft(duration);
    setIsPlaying(false);
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      scrollEnabled={!expandedInfo} // Disable scroll when info panel is expanded
    >
      {/* IMMERSIVE BACKGROUND SECTION */}
      <View style={styles.heroSection}>
        {/* Gradient Background (Placeholder for Video Asset) */}
        <View
          style={[
            styles.backgroundGradient,
            { backgroundColor: currentScene?.color },
          ]}
        >
          {/* This is where your video asset would loop */}
          {/* Currently just showing gradient, but VideoView component will go here */}
          <View style={styles.backgroundOverlay} />

          {/* Header with Title */}
          <View style={styles.heroHeader}>
            <Text style={styles.heroTitle}>{currentScene?.icon}</Text>
            <Text style={styles.heroName}>{currentScene?.name}</Text>
            <Text style={styles.heroDescription}>
              {currentScene?.description}
            </Text>
            <Text style={styles.sectionTitle}>Selected for your mood ({data.moodHistory[0]?.mood})</Text>
{/* Render the recommendedSound card first and highlighted */}
          </View>
        </View>

        {/* PROFESSIONAL PLAYER CARD - Floating over background */}
        <View style={styles.playerCardContainer}>
          <GlassCard style={styles.playerCard} gradient={true}>
            {/* Visualizer Section */}
            <View style={styles.visualizerSection}>
              {/* Outer Rotating Ring */}
              <Animated.View
                style={[
                  styles.outerRing,
                  {
                    transform: [{ rotate: rotation }],
                  },
                ]}
              >
                <View style={styles.outerRingInner} />
              </Animated.View>

              {/* Pulsing Center Orb */}
              <Animated.View
                style={[
                  styles.centerOrb,
                  {
                    backgroundColor: currentScene?.color,
                    transform: [{ scale: pulseAnim }],
                  },
                ]}
              />

              {/* Play Icon in Center */}
              <View style={styles.playIconOverlay}>
                {isPlaying ? (
                  <Pause size={32} color="#FFFFFF" fill="#FFFFFF" />
                ) : (
                  <Play size={32} color="#FFFFFF" fill="#FFFFFF" />
                )}
              </View>
            </View>

            {/* Time Display - Large and Clear */}
            <Text style={styles.timeDisplay}>{formatTime(timeLeft)}</Text>

            {/* Play/Pause Button */}
            <TouchableOpacity
              style={[
                styles.playButton,
                {
                  backgroundColor: currentScene?.color,
                  shadowColor: currentScene?.color,
                },
              ]}
              onPress={handlePlayPause}
              activeOpacity={0.85}
            >
              {isPlaying ? (
                <Pause size={48} color="#FFFFFF" fill="#FFFFFF" />
              ) : (
                <Play size={48} color="#FFFFFF" fill="#FFFFFF" />
              )}
            </TouchableOpacity>

            {/* Control Buttons Row */}
            <View style={styles.controlsRow}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={handleReset}
                activeOpacity={0.6}
              >
                <RotateCcw size={20} color={theme.colors.text} />
                <Text style={styles.controlButtonText}>Reset</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.controlButton}
                activeOpacity={0.6}
              >
                <Timer size={20} color={theme.colors.text} />
                <Text style={styles.controlButtonText}>{duration}m</Text>
              </TouchableOpacity>
            </View>

            {/* Volume Control */}
            <View style={styles.volumeSection}>
              <Volume2 size={18} color={theme.colors.primary} />
              <View style={styles.volumeSliderContainer}>
                <View
                  style={[
                    styles.volumeSlider,
                    {
                      width: `${volume * 100}%`,
                      backgroundColor: currentScene?.color,
                    },
                  ]}
                />
              </View>
              <Text style={styles.volumePercent}>{Math.round(volume * 100)}%</Text>
            </View>
          </GlassCard>
        </View>
      </View>

      {/* SCENE SELECTOR - Premium Grid */}
      <View style={styles.sceneSelectorSection}>
        <Text style={styles.sectionTitle}>Choose Your Scene</Text>
        <View style={styles.scenesGrid}>
          {soundscapes.map((scene) => (
            <TouchableOpacity
              key={scene.id}
              style={styles.sceneCardWrapper}
              onPress={() => {
                setSelectedScene(scene.id);
                setIsPlaying(false);
                setTimeLeft(duration);
              }}
              activeOpacity={0.7}
            >
              <GlassCard
                style={[
                  styles.sceneCard,
                  ...(selectedScene === scene.id
                    ? [
                      {
                        backgroundColor: `${scene.color}30`,
                        borderColor: scene.color,
                        borderWidth: 2,
                      },
                    ]
                    : []),
                ]} gradient={true}              >
                <Text style={styles.sceneEmoji}>{scene.icon}</Text>
                <Text style={styles.sceneName}>{scene.name}</Text>
                <Text style={styles.sceneSubtext}>
                  {selectedScene === scene.id ? 'Current' : 'Switch'}
                </Text>
              </GlassCard>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* DURATION SELECTOR */}
      <View style={styles.durationSection}>
        <Text style={styles.sectionTitle}>Session Duration</Text>
        <View style={styles.durationButtons}>
          {[15, 30, 60, 120].map((min) => (
            <TouchableOpacity
              key={min}
              style={[
                styles.durationButton,
                duration === min && {
                  backgroundColor: currentScene?.color,
                  borderColor: currentScene?.color,
                },
              ]}
              onPress={() => {
                setDuration(min);
                setTimeLeft(min);
                setIsPlaying(false);
              }}
            >
              <Text
                style={[
                  styles.durationButtonText,
                  duration === min && { color: '#FFFFFF', fontWeight: '700' },
                ]}
              >
                {min}m
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* INFO PANEL */}
      <View style={styles.infoPanelSection}>
        <TouchableOpacity
          style={styles.infoPanelHeader}
          onPress={() => setExpandedInfo(!expandedInfo)}
          activeOpacity={0.6}
        >
          <View>
            <Text style={styles.infoPanelTitle}>💡 How to Use</Text>
            <Text style={styles.infoPanelSubtitle}>
              {expandedInfo ? 'Tap to collapse' : 'Tap to learn more'}
            </Text>
          </View>
          <Animated.View
            style={{
              transform: [
                {
                  rotate: expandedInfo ? '180deg' : '0deg',
                },
              ],
            }}
          >
            <ChevronDown size={20} color={theme.colors.primary} />
          </Animated.View>
        </TouchableOpacity>

        {expandedInfo && (
          <Animated.View
            style={[
              styles.infoPanelContent,
              {
                transform: [{ translateY: slideTranslate }],
                opacity: slideUpAnim,
              },
            ]}
          >
            <Text style={styles.infoText}>
              🎧 <Text style={styles.infoBold}>Before Sleep:</Text> Use 60-minute sessions to drift off peacefully.
            </Text>
            <Text style={styles.infoText}>
              🧠 <Text style={styles.infoBold}>During Work:</Text> 30-minute blocks for maximum focus without distraction.
            </Text>
            <Text style={styles.infoText}>
              🧘 <Text style={styles.infoBold}>Meditation:</Text> Combine with breathing exercises for deeper relaxation.
            </Text>
            <Text style={styles.infoText}>
              🌙 <Text style={styles.infoBold}>Sleep Hygiene:</Text> Lower volume gradually as you fall asleep.
            </Text>
          </Animated.View>
        )}
      </View>

      <View style={styles.spacer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  spacer: {
    height: 60,
  },

  // ========== HERO SECTION (Immersive Background) ==========
  heroSection: {
    position: 'relative',
    height: 500,
    marginBottom: 20,
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 320,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  heroHeader: {
    alignItems: 'center',
    zIndex: 1,
    paddingHorizontal: 24,
  },
  heroTitle: {
    fontSize: 80,
    marginBottom: 12,
  },
  heroName: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 280,
  },

  // ========== PLAYER CARD (Floating) ==========
  playerCardContainer: {
    paddingHorizontal: 24,
    marginTop: -80,
    marginBottom: 40,
    zIndex: 10,
  },
  playerCard: {
    paddingVertical: 32,
    paddingHorizontal: 20,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 20,
  },

  // VISUALIZER
  visualizerSection: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    position: 'relative',
  },
  outerRing: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  outerRingInner: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  centerOrb: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 15,
  },
  playIconOverlay: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },

  // TIME DISPLAY
  timeDisplay: {
    fontSize: 48,
    fontWeight: '800',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: 'monospace',
    letterSpacing: 2,
  },

  // PLAY BUTTON
  playButton: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 28,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 15,
  },

  // CONTROLS ROW
  controlsRow: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
    marginBottom: 24,
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  controlButtonText: {
    color: theme.colors.text,
    fontSize: 13,
    fontWeight: '600',
  },

  // VOLUME CONTROL
  volumeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  volumeSliderContainer: {
    flex: 1,
    height: 6,
    backgroundColor: theme.colors.surface,
    borderRadius: 3,
    overflow: 'hidden',
  },
  volumeSlider: {
    height: '100%',
    borderRadius: 3,
  },
  volumePercent: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.primary,
    minWidth: 35,
    textAlign: 'right',
  },

  // ========== SCENE SELECTOR ==========
  sceneSelectorSection: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 16,
  },
  scenesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  sceneCardWrapper: {
    width: '31%',
  },
  sceneCard: {
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: 8,
  },
  sceneEmoji: {
    fontSize: 32,
  },
  sceneName: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.text,
    textAlign: 'center',
  },
  sceneSubtext: {
    fontSize: 10,
    color: theme.colors.textTertiary,
  },

  // ========== DURATION SELECTOR ==========
  durationSection: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  durationButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  durationButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
  },

  // ========== INFO PANEL ==========
  infoPanelSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  infoPanelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: theme.colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  infoPanelTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 2,
  },
  infoPanelSubtitle: {
    fontSize: 11,
    color: theme.colors.textTertiary,
  },
  infoPanelContent: {
    marginTop: 16,
    gap: 12,
  },
  infoText: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  infoBold: {
    fontWeight: '700',
    color: theme.colors.text,
  },
});