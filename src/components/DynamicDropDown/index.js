import React from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import dropdown_icon from "../../assets/icon/dropdown_icon";
import { COLORS, SIZES, FONTS } from "../../constants";
import { Icons, Text } from "../index";
import { styles } from "./index.style";

const DynamicDropDown = ({
  onPressContainer,
  onPressChild,
  isOpen,
  value,
  sub_array,
  style,
  childStyle,
  rate,
}) => {
  return (
    <>
      <TouchableOpacity
        style={[styles.main_view, style]}
        onPress={onPressContainer}
      >
        <Text text={value ? value : ""} style={[styles.value, { flex: 1 }]} />
        <Text text={rate ? rate : ""} style={styles.value} />
        <Icons
          name={dropdown_icon}
          size={30}
          style={{ marginLeft: SIZES.padding2 }}
        />
      </TouchableOpacity>
      {isOpen ? (
        <View
          style={{
            borderBottomLeftRadius: SIZES.padding2,
            borderBottomRightRadius: SIZES.padding2,
          }}
        >
          <FlatList
            data={sub_array ? sub_array : []}
            renderItem={({ item, ind }) => (
              <TouchableOpacity
                key={ind}
                disabled={true}
                onPress={() => onPressChild(item)}
                activeOpacity={0.6}
                style={[
                  {
                    backgroundColor: COLORS.white,
                    borderColor: COLORS.primary,
                    borderWidth: 0.5,
                    borderTopWidth: ind === 0 ? 1 : 0,
                    borderBottomLeftRadius:
                      ind === sub_array.length - 1 ? SIZES.padding2 : 0,
                    borderBottomRightRadius:
                      ind === sub_array.length - 1 ? SIZES.padding2 : 0,
                    padding: SIZES.padding2,
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  },
                  childStyle,
                ]}
              >
                <Text
                  text={item?.GoldType}
                  style={{ ...FONTS.Regular14, color: COLORS.gray }}
                />
                <Text
                  text={item?.Dinar}
                  style={{ ...FONTS.Regular13, color: COLORS.text_gray }}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      ) : (
        <View></View>
      )}
    </>
  );
};

export default DynamicDropDown;
