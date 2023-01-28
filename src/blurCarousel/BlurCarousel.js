import * as React from 'react';
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {re} from '@babel/core/lib/vendor/import-meta-resolve';
import {useCallback, useState} from 'react';
const {width, height} = Dimensions.get('screen');

const data = [
  'https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/13130602/media/592ccac0a949b39f058a297fd1faa38e.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/11205211/media/44c854b0a6e381340fbefe276e03e8e4.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/7003560/media/48d5ac3503d204751a2890ba82cc42ad.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/6727912/samji_illustrator.jpeg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=1200x1200',
];

const imageW = width * 0.7;
const imageH = imageW * 1.54;

export default function BlurCarousel() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const scrollDot = React.useRef(new Animated.Value(0)).current;
  const [curentIndex, setCurrentIndex] = useState(0);

  const onViewableItemsChanged = useCallback(({viewableItems, changed}) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}>
      <>
        <StatusBar hidden />
        <View style={[StyleSheet.absoluteFillObject]}>
          {data.map((image, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0, 1, 0],
            });
            return (
              <Animated.Image
                key={`image-${index}`}
                source={{uri: image}}
                style={[
                  StyleSheet.absoluteFillObject,
                  {
                    opacity,
                  },
                ]}
                blurRadius={20}
              />
            );
          })}
        </View>
        <Animated.FlatList
          data={data}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ],
            {useNativeDriver: false},
          )}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          pagingEnabled
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50,
          }}
          renderItem={({item, index}) => {
            return (
              <>
                <View
                  style={{
                    width,
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOpacity: 1,
                    shadowOffset: {
                      width: 0,
                      height: 0,
                    },
                    shadowRadius: 20,
                  }}>
                  <Image
                    source={{uri: item}}
                    style={{
                      width: imageW,
                      height: imageH,
                      borderRadius: 16,
                    }}
                    resizeMode={'cover'}
                  />
                </View>
              </>
            );
          }}
        />
      </>
      <View
        style={{
          // position: 'absolute',
          // zIndex: 1000,
          width: width,
          justifyContent: 'center',
          padding: 16,
          alignItems: 'flex-start',
          flexDirection: 'row',
        }}>
        {data.map((i, ind) => {
          const inputRange = [
            (ind - 1) * width,
            ind * width,
            (ind + 1) * width,
          ];
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [12, 30, 12],
            extrapolate: 'clamp',
          });
          return (
            <View key={`dot${ind}`} style={{}}>
              <Animated.View
                style={{
                  width: opacity,
                  height: 5,
                  margin: 5,
                  borderRadius: 50,
                  backgroundColor:'#378B91',
                }}
              />
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
