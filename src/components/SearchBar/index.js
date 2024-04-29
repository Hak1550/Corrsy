import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import search_icon from "../../assets/icons/search_icon";
import { COLORS, FONTS, SIZES } from "../../constants";
import { Icons } from "../index";

const SearchBar = ({
  style,
  onFocus,
  onBlur,
  onChangeText,
  value,
  defaultValue,
  placeholder,
  input_style,
  showRightIcon,
  placeholderColor,
  right_icon_One,
  right_icon_Two,
  showLeftIcon = true,
  editable,
}) => {
  return (
    <View style={[styles.searchBar, style]}>
      {showLeftIcon && (
        <Icons name={search_icon} size={22} fill={COLORS.primary} />
      )}
      <TextInput
        placeholder={placeholder ? placeholder : "Search"}
        style={[styles.input, input_style]}
        onFocus={onFocus}
        onBlur={onBlur}
        editable={editable}
        onChangeText={onChangeText}
        value={value}
        defaultValue={defaultValue}
        placeholderTextColor={placeholderColor || COLORS.text_gray_color}
      />
      {showRightIcon && (
        <>
          <TouchableOpacity
            style={[
              styles.right_icon_One,
              { right: right_icon_Two ? SIZES.padding * 1.2 : 0 },
            ]}
          >
            <Icons
              name={right_icon_One ? right_icon_One : null}
              size={22}
              fill={COLORS.primary}
            />
          </TouchableOpacity>
          {right_icon_Two && (
            <TouchableOpacity style={styles.right_icon_Two}>
              <Icons
                name={right_icon_Two ? right_icon_Two : null}
                size={22}
                fill={COLORS.primary}
              />
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    height: 44,
    alignSelf: "center",
    backgroundColor: COLORS.input_background,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
    paddingHorizontal: SIZES.padding * 1,
    borderRadius: SIZES.padding2 * 3,
  },

  input: {
    height: 50,
    paddingLeft: SIZES.padding,
    width: "90%",
    color: COLORS.black,
    ...FONTS.Regular14,
  },
  right_icon_One: {
    marginRight: SIZES.padding,
    paddingHorizontal: SIZES.padding2 * 0.5,
  },
  right_icon_Two: {
    paddingHorizontal: SIZES.padding2 * 0.5,
    right: SIZES.padding * 2.2,
  },
});
