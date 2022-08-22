import {
  SafeAreaView,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

// utils
import {ITEM_WIDTH, SPACING} from '../../utils/theme';
import {SharedElement} from 'react-navigation-shared-element';
import {FlatList} from 'react-native-gesture-handler';

type Props = {};

const {width} = Dimensions.get('screen');

const cardAnimation = {
  from: {
    scale: 0,
    transition: [{rotate: '-90deg'}],
  },
  to: {
    scale: 1,
    transition: [{rotate: '0deg'}],
  },
};

const Details = ({route}: any) => {
  const {location, image, key} = route.params;
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.imageContainer}>
        <SharedElement id={`item.${key}.photo`} style={styles.sharedElement}>
          <Image source={{uri: image}} style={styles.cardImage} />
        </SharedElement>
        <View style={styles.imageOverlay} />
      </View>
      <View style={styles.container}>
        <AntDesign
          name="arrowleft"
          size={24}
          color="#fff"
          onPress={() => navigation.goBack()}
        />

        <SharedElement
          id={`item.${key}.location`}
          style={styles.locationContainer}>
          <Animated.Text style={[styles.location]}>{location}</Animated.Text>
        </SharedElement>

        <View style={styles.activitiesContainer}>
          <Animatable.Text
            animation={'slideInRight'}
            duration={500}
            delay={300}
            style={styles.activities}>
            Activities
          </Animatable.Text>

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={[...Array(8).keys()]}
            keyExtractor={item => String(item)}
            renderItem={({item, index}) => {
              return (
                <Animatable.View
                  style={styles.activity}
                  duration={500}
                  animation={{
                    from: {
                      opacity: 0,
                      transform: [
                        {rotateZ: '30deg'},
                        {scale: 0},
                        {perspective: 100},
                        {translateX: -width * 0.33},
                        {translateY: -width * 0.33},
                      ],
                    },
                    to: {
                      opacity: 1,
                      transform: [
                        {rotateZ: '0deg'},
                        {scale: 1},
                        {perspective: 100},
                        {translateX: 0},
                        {translateY: 0},
                      ],
                    },
                  }}
                  delay={400 + index * 100}>
                  <Image
                    style={styles.activityImage}
                    source={{
                      uri: 'https://miro.medium.com/max/124/0*Su9dCp6Fh4eAXQAL.jpeg',
                    }}
                  />
                  <Text style={styles.actvitylabel}>{`Activity #${
                    index + 1
                  }`}</Text>
                </Animatable.View>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

Details.sharedElements = (route: any, otherRoute: any, showing: any) => {
  const {key} = route.params;

  return [
    {
      id: `item.${key}.photo`,
    },
    {
      id: `item.${key}.location`,
    },
  ];
};

export default Details;

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },
  container: {
    flex: 1,
    position: 'relative',
    padding: SPACING,
  },
  imageContainer: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    // backgroundColor: 'rgba(0,0,0,0.1)',
  },
  cardImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  sharedElement: {
    ...StyleSheet.absoluteFillObject,
  },
  location: {
    fontSize: 25,
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    width: ITEM_WIDTH * 0.8,
  },
  locationContainer: {
    position: 'absolute',
    top: '50%',
    left: SPACING,
  },
  activitiesContainer: {
    position: 'absolute',
    top: '60%',
    left: SPACING,
  },
  activities: {
    fontSize: 20,
    color: '#fff',
    marginRight: SPACING,
    width: ITEM_WIDTH * 0.8,
    marginBottom: SPACING,
    transform: [{perspective: 400}],
  },
  activity: {
    width: width * 0.33,
    height: width * 0.4,
    marginRight: SPACING,
    padding: SPACING / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  activityImage: {
    height: '80%',
    width: '100%',
    resizeMode: 'cover',
  },
  actvitylabel: {
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: SPACING / 2,
  },
});
