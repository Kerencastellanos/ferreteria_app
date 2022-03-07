import { Dimensions, Image, ScrollView, View } from "react-native";
import { useState, useRef } from "react";
import { FlatList } from "react-native-gesture-handler";
const size = Dimensions.get("screen");

export function MyImageSlider({ images = [{ url: "" }] }) {
  const [current, setCurrent] = useState(0);

  const itemsChanged = useRef(({ viewableItems }) => {
    setCurrent(viewableItems[0].index);
  }).current;

  return (
    <View>
      <FlatList
        onViewableItemsChanged={itemsChanged}
        horizontal={true}
        snapToInterval={size.width}
        data={images}
        onScroll={({}) => {}}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item: { url } }) => (
          <Image
            style={{ width: size.width, height: size.width }}
            source={{ uri: url }}
          />
        )}
      />
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {images.map((e, i) => (
          <View
            key={i.toString()}
            style={[
              {
                width: 7,
                height: 7,
                backgroundColor: "#bababa",
                margin: 10,
                borderRadius: 50,
              },
              current == i ? { backgroundColor: "#038cfc" } : {},
            ]}
          />
        ))}
      </View>
    </View>
  );
}
