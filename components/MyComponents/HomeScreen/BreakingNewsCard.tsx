import { Images } from '@/constants';
import { NewsArticle } from '@/types/NewsArticle';
import { formatDistanceToNow } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');

type BreakingNewsCardProps = {
    data: NewsArticle[];
};

const BreakingNewsCard: React.FC<BreakingNewsCardProps> = ({ data }) => {
    const router = useRouter();
    return (
        <View className="flex-1 items-center justify-center mt-2">
            <Carousel
                loop
                autoPlay
                width={width}
                height={220}
                scrollAnimationDuration={5000}
                data={data}
                mode="parallax" // enable spacing between items
                modeConfig={{
                    parallaxScrollingScale: 0.9,
                    parallaxScrollingOffset: 40, // space between items
                    parallaxAdjacentItemScale: 0.8,
                }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        className="w-full h-full mx-2 rounded-3xl overflow-hidden relative"
                        style={{
                            boxShadow: '0px 5px 6px rgba(0,0,0,0.2)',
                            elevation: 4,
                        }}
                        onPress={() => {
                            const id = item.id
                            router.push({
                                pathname: '/article/[id]/page',
                                params: { id },
                            });
                        }}
                    >
                        <Image
                            source={
                                item.fields?.thumbnail
                                    ? { uri: item.fields.thumbnail }
                                    : Images.placeholderImage
                            }
                            style={{ width: '100%', height: '100%' }}
                            resizeMode="cover"
                        />
                        <LinearGradient
                            colors={['transparent', 'rgba(0, 0, 0, 0.7)']}
                            style={{ position: 'absolute', bottom: 0, left: 0, right: 0, top: 0, justifyContent: 'flex-end', padding: 16 }}
                        >
                            <Text className=" absolute top-4 left-4 text-white text-base font-medium bg-blue-500 rounded-full shadow-black/30 shadow px-3 py-1" numberOfLines={1} ellipsizeMode="tail">
                                {item.sectionName}
                            </Text>

                            <Text className="text-neutral-200 text-base font-medium" numberOfLines={1} ellipsizeMode="tail">
                                {formatDistanceToNow(new Date(item.webPublicationDate), { addSuffix: true })}
                            </Text>

                            <Text
                                className="text-white text-xl font-bold"
                                numberOfLines={2}
                                ellipsizeMode="tail" >
                                {item.webTitle}
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default BreakingNewsCard;
