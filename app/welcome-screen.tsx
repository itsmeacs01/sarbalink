import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { FlatList, useWindowDimensions, ViewToken } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Button,
  H2,
  Image,
  Paragraph,
  Text,
  View,
  XStack,
  YStack,
} from 'tamagui';

// 1. Your data for the onboarding screens
//    Make sure the image paths are correct in your project's assets folder.
const welcomeList = [
  {
    title: 'Discover SarbaLink',
    description:
      'SarbaLink is a fast 24/7 delivery app for food and groceries in Nepal.',
    image: require('../assets/images/bulb.jpg'),
  },
  {
    title: 'Fast Delivery, Anytime',
    description:
      'Get groceries, meals, and essentials delivered to your door 24/7, in under 30 minutes.',
    image: require('../assets/images/robot.jpg'),
  },
  {
    title: 'All You Need, One App',
    description:
      'From fresh food to daily must-haves, SarbaLink brings everything to you—quickly and reliably.',
    image: require('../assets/images/agi.jpg'),
  },
];

// Define the type for a single welcome item for type safety
type WelcomeItem = (typeof welcomeList)[0];

export default function WelcomeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width, height } = useWindowDimensions();
  const flatListRef = useRef<FlatList<WelcomeItem>>(null);

  // This function is called when the user swipes the list
  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems[0]?.index !== null) {
        setCurrentIndex(viewableItems[0]?.index ?? 0);
      }
    }
  ).current;

  // Handles the "Next" button press
  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < welcomeList.length) {
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    } else {
      // You are on the last screen, handle navigation to the main app
      console.log('Navigate to Home Screen');
      // For example: ;
      router.replace('/(tabs)');
    }
  };

  // Handles the "Skip" button press
  const handleSkip = () => {
    const lastIndex = welcomeList.length - 1;
    flatListRef.current?.scrollToIndex({ index: lastIndex, animated: true });
  };

  return (
    <YStack flex={1} items="flex-end" justify={'flex-end'}>
      <XStack flex={1} borderColor={'green'}>
        <FlatList
          ref={flatListRef}
          data={welcomeList}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.title}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
          renderItem={({ item }) => (
            <YStack
              height={height}
              width={width}
              justify="flex-start"
              items="flex-start"
              z={1}
            >
              <Image
                source={item.image}
                width={width}
                height={'75%'}
                t={'$0'}
              />
            </YStack>
          )}
        />
      </XStack>
      <XStack
        bg={'$background'}
        items="center"
        position="absolute"
        z={'$2'}
        borderTopLeftRadius="$12"
        borderTopRightRadius="$12"
      >
        <XStack justify="space-between" bg={'$background0'} height={'$20'}>
          <YStack px={'$4'} pt={'$4'} pb={'$6'} justify={'flex-end'} gap={'$6'}>
            <YStack gap={'$6'}>
              <Text fontSize={'$8'} text={'center'} fontWeight={'bold'}>
                {welcomeList[currentIndex].title}
              </Text>
              <Paragraph text="center" size="$6" color="$accent1">
                {welcomeList[currentIndex].description}
              </Paragraph>
            </YStack>
            <XStack gap={'$4'}>
              {currentIndex < welcomeList.length - 1 ? (
                <>
                  <Button
                    rounded="$12"
                    flex={1}
                    size="$5"
                    onPress={handleSkip}
                    theme={'light'}
                  >
                    Skip
                  </Button>
                  <Button
                    flex={1}
                    size="$5"
                    rounded="$12"
                    onPress={handleNext}
                    theme="accent"
                  >
                    Next
                  </Button>
                </>
              ) : (
                <Button
                  flex={1}
                  width={'$12'}
                  rounded="$12"
                  onPress={handleNext}
                  theme="accent"
                  size="$5"
                >
                  Get Started
                </Button>
              )}
            </XStack>
          </YStack>
        </XStack>
      </XStack>
    </YStack>
  );
}
