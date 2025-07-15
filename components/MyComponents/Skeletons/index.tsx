import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
// import { Skeleton } from 'moti/skeleton'; // Optional shimmer library if using Moti

const { width } = Dimensions.get('window');

export const BreakingNewsSkeleton = () => {
  const placeholderData = Array(3).fill(null); // show 3 skeleton items

  return (
    <View className="flex-1 items-center justify-center mt-4">
      <Carousel
        loop
        autoPlay
        width={width}
        height={220}
        scrollAnimationDuration={3000}
        data={placeholderData}
        mode="parallax" // enable spacing between items
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 40, // space between items
          parallaxAdjacentItemScale: 0.8,
        }}
        renderItem={() => (
          <View className="w-full h-full mx-2 rounded-lg overflow-hidden relative bg-neutral-100/20">
            <View className="absolute w-full h-full bg-neutral-200" />

            <View className="absolute bottom-0 left-0 right-0 p-4 h-full justify-end bg-gradient-to-b from-neutral-700/50 to-neutral-900/50 space-y-2">
              <View className="absolute top-4 left-4 bg-transparent rounded-full px-3 py-1">
                <View className="w-16 h-5 animate-pulse bg-neutral-400/40 rounded-full" />
              </View>

              <View className="w-24 h-5 animate-pulse bg-neutral-400/40 mb-1 rounded-full" />
              <View className="w-3/4 h-7 animate-pulse bg-neutral-400/60 mb-1 rounded-md" />
              <View className="w-2/3 h-5 animate-pulse bg-neutral-400/40 mb-1 rounded-md" />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export const TileNewsSkeleton = ({ count = 5 }: { count?: number }) => {
  return (
    <View className="w-full h-auto">
      {Array.from({ length: count }).map((_, index) => (
        <View
          key={index}
          className="flex-row animate-pulse bg-gradient-to-b p-2 from-slate-700/50 to-slate-900/50  rounded-lg items-center w-[95%] mx-auto mb-4"
        >
          {/* Image placeholder */}
          <View className="w-24 h-24 bg-gray-500/50 rounded-lg" />

          {/* Text placeholders */}
          <View className="flex-1 ml-3 justify-between py-1 space-y-2">
            <View className="w-24 h-4 rounded bg-gray-500/40" />
            <View className="w-[90%] h-5 rounded bg-gray-500/50" />
            <View className="w-16 h-4 rounded bg-gray-500/40" />
          </View>
        </View>
      ))}
    </View>
  );
};

export const ArticleSkeleton = () => {
  return (
    <View className="flex-1 bg-black relative">
      {/* Fake Header Image */}
      <View className="relative h-[60vh] py-auto pb-4 w-full bg-gray-700 animate-pulse">
        <LinearGradient
          colors={['rgba(0,0,0,0.5)', 'transparent', 'rgba(0,0,0,0.8)']}
          style={{ position: 'absolute', height: '100%', width: '100%', justifyContent: 'flex-end' }}
        >

          <View className="absolute top-4 flex flex-row justify-between w-full px-4">
            <View className="w-10 h-10 bg-gray-600 rounded-full mb-2" />
              <View className="w-10 h-10 bg-gray-600 rounded-full mb-2" />
            
          </View>
          <View className="absolute bottom-14 w-full px-4">
            <View className="w-24 h-5 bg-gray-600 rounded-full mb-2" />
            <View className="w-3/4 h-6 bg-gray-600 rounded mb-2" />
            <View className="w-1/3 h-4 bg-gray-600 rounded" />
          </View>
        </LinearGradient>
      </View>

      {/* Fake Content */}
      <View className="bg-white h-full rounded-t-3xl px-4 pt-6 pb-10 mt-[-40] z-20">
        <View className="w-full h-6 bg-gray-400 rounded mb-4 animate-pulse" />
        <View className="w-2/3 h-6 bg-gray-400 rounded mb-4 animate-pulse" />
        <View className="w-5/6 h-4 bg-gray-300 rounded mb-2 animate-pulse" />
        <View className="w-4/6 h-4 bg-gray-300 rounded mb-2 animate-pulse" />
        <View className="w-5/6 h-4 bg-gray-300 rounded mb-2 animate-pulse" />
        <View className="w-4/6 h-4 bg-gray-300 rounded mb-2 animate-pulse" />
        <View className="w-5/6 h-4 bg-gray-300 rounded mb-2 animate-pulse" />
        <View className="w-4/6 h-4 bg-gray-300 rounded mb-2 animate-pulse" />
        <View className="w-5/6 h-4 bg-gray-300 rounded mb-2 animate-pulse" />
      </View>
    </View>
  );
};

export const CategoryPageSkeleton = ({ count = 5 }: { count?: number }) => {
  return (
    <View className="w-full min-h-screen overflow-y-hidden radial-center-gradient-bg-dark">
      <View className="w-[90%] mt-4 mx-auto h-10 rounded-full animate-pulse bg-neutral-500/40 mb-4" />
      {Array.from({ length: count }).map((_, index) => (
        <View
          key={index}
          className="flex-col flex gap-2 animate-pulse p-2  rounded-lg items-start w-[95%] mx-auto mb-4"
        >
          {/* Image placeholder */}
          <View className="w-16 h-4  bg-neutral-500/30 rounded-lg mb-2" />

          {/* Text placeholders */}
          <View className="flex-1 flex-row items-center justify-between py-1 gap-2">
            <View className="w-24 h-5 rounded-full bg-neutral-500/40" />
            <View className="w-24 h-5 rounded-full bg-neutral-500/40" />
            <View className="w-24 h-5 rounded-full bg-neutral-500/40" />
          </View>
        </View>
      ))}
    </View>
  );
};

