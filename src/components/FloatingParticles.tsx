import React, { useEffect, useRef } from 'react';
import { View, Animated, Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const FloatingParticles: React.FC = () => {
  const particles = useRef([...Array(20)].map(() => ({
    x: useRef(new Animated.Value(Math.random() * width)).current,
    y: useRef(new Animated.Value(Math.random() * height)).current,
    opacity: useRef(new Animated.Value(Math.random() * 0.5 + 0.1)).current,
  }))).current;

  useEffect(() => {
    particles.forEach((particle, i) => {
      const animateParticle = () => {
        Animated.parallel([
          Animated.timing(particle.y, {
            toValue: -50,
            duration: 10000 + Math.random() * 10000,
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(particle.opacity, {
              toValue: 0.6,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(particle.opacity, {
              toValue: 0.1,
              duration: 2000,
              useNativeDriver: true,
            }),
          ]),
        ]).start(() => {
          particle.y.setValue(height + 50);
          particle.x.setValue(Math.random() * width);
          animateParticle();
        });
      };
      setTimeout(() => animateParticle(), i * 500);
    });
  }, []);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {particles.map((particle, i) => (
        <Animated.View
          key={i}
          style={{
            position: 'absolute',
            width: 4,
            height: 4,
            borderRadius: 2,
            backgroundColor: '#7C3AED',
            transform: [
              { translateX: particle.x },
              { translateY: particle.y },
            ],
            opacity: particle.opacity,
          }}
        />
      ))}
    </View>
  );
};