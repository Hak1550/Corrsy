import React, { useState } from "react";
import { Accordian, Container, Icons, Text } from "../index";
import {
  FlatList,
  Image,
  LayoutAnimation,
  Platform,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import { styles } from "./index.style";
import { SIZES, images } from "../../constants";
import { drawerContent } from "../../config";
import IconComponent from "../Icons";
import { navigate } from "../../navigation/NavigationRef";
import { useSelector } from "react-redux";
import { IMAGEURL } from "../../api-services/http-provider";

export default function CustomDrawer() {
  const [expanded, setExpanded] = useState(false);

  const { user } = useSelector((state) => state.AuthReducer);

  const renderAccordians = (item) => {
    const items = [];
    for (i = 0; i < item.option.length; i++) {
      items.push(
        <Accordian
          expanded={expanded}
          icon={item?.icon2}
          // icon={expanded ? item?.icon2 : item.rightIcon}
          data={item?.option[i]}
          key={[i].toString()}
        />
      );
    }
    return items;
  };

  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.touchableBtn}
        activeOpacity={0.8}
        onPress={() => {
          if (item?.rightIcon) {
            toggleExpand();
          } else {
            item.route();
          }
        }}
      >
        <View style={styles.accordian_view}>
          <IconComponent name={item.icon} style={styles.icon} />
          <Text text={item.name} style={styles.listNames} />
          {item?.rightIcon && (
            <TouchableOpacity onPress={() => toggleExpand()}>
              <Icons
                name={expanded ? item?.icon2 : item?.rightIcon}
                style={styles.iconComponent}
              />
            </TouchableOpacity>
          )}
        </View>
        {item?.rightIcon && renderAccordians(item)}
      </TouchableOpacity>
    );
  };
  const renderFooter = () => <View style={styles.footer} />;
  return (
    <Container>
      <TouchableOpacity
        style={styles.profileView}
        onPress={() => navigate("Profile")}
      >
        <Image
          style={styles.image}
          source={
            user?.image ? { uri: IMAGEURL + user?.image } : images.no_image
          }
        />
        <View>
          <Text
            text={user?.first_name + " " + user?.last_name}
            style={styles.name}
          />
          <Text text={user?.email} style={styles.email} />
        </View>
      </TouchableOpacity>

      <View style={styles.flatListView}>
        <FlatList
          keyExtractor={(item) => item.id}
          ListFooterComponent={renderFooter}
          data={drawerContent}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Container>
  );
}
