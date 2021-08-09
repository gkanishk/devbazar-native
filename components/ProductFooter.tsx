import React, { useState } from "react";
import { View, TouchableOpacity, Text, ScrollView, Dimensions } from "react-native";
import { BottomSheet, CheckBox } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import FAIcon from "react-native-vector-icons/FontAwesome";
import { styles } from "./styles";
import {
    sortByOption,
    brandFilterOption,
    idealForOption,
    sizesOption,
    discountOption
} from "../assets/filter";

export default function ProductFooter() {
    const [showSortBy, setShowSortBy] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState("");
    const [includeOutOfStock, setIncludeOutOfStock] = useState(false);
    return (
        <View
            style={styles.productFooter}
        >
            <TouchableOpacity
                style={tw`flex flex-row items-center`}
                onPress={() => setShowSortBy(true)}
            >
                <FAIcon
                    name="sort"
                    size={20}
                />
                <Text style={tw`ml-2`}>
                    Sort By
                </Text>
            </TouchableOpacity>
            <Text>|</Text>
            <TouchableOpacity
                style={tw`flex flex-row items-center`}
                onPress={() => setShowFilters(true)}
            >
                <FAIcon
                    name="filter"
                    size={20}
                />
                <Text style={tw`ml-2`}>
                    Filters
                </Text>
            </TouchableOpacity>
            {/* Sort By Filter */}
            <BottomSheet
                isVisible={showSortBy}
            >
                <View style={tw`bg-white p-2`}>
                    {
                        sortByOption.map(({value,label})=>(
                            <CheckBox
                                key={value+label}
                                title={label}
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={sortBy === value}
                                onPress={() => setSortBy(value)}
                            ></CheckBox>
                        ))
                    }
                    <CheckBox
                        title='Include Out of Stock'
                        checked={includeOutOfStock}
                        onPress={() => setIncludeOutOfStock(!includeOutOfStock)}
                    />
                </View>
                <View style={tw`flex flex-row justify-end bg-white p-2`}>
                    <TouchableOpacity
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            borderWidth: 1,
                            alignItems: "center",
                            padding: 4,
                            paddingHorizontal: 10,
                            margin: 4
                        }}
                        onPress={() => setShowSortBy(false)}
                    >
                        <FAIcon
                            name="close"
                            size={15}
                        />
                        <Text style={tw`ml-2`}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        display: "flex",
                        flexDirection: "row",
                        borderWidth: 1,
                        alignItems: "center",
                        padding: 2,
                        paddingHorizontal: 10,
                        margin: 4
                    }}>
                        <FAIcon
                            name="save"
                            size={15}
                        />
                        <Text style={tw`ml-2`}>
                            Apply
                        </Text>
                    </TouchableOpacity>
                </View>
            </BottomSheet>
            {/* Facet Filters */}
            <BottomSheet
                isVisible={showFilters}
            >
                <ScrollView style={{
                    backgroundColor: "#fff",
                    padding: 2,
                    maxHeight: Dimensions.get('window').height * 0.9
                }}>
                    <Text style={tw`px-2 text-base font-semibold`}>
                        Ideal For
                    </Text>
                    {
                        idealForOption.map(({label,value})=>(
                            <CheckBox
                                title={label}
                            />
                        ))
                    }
                    <Text style={tw`px-2 text-base font-semibold`}>
                        Brands
                    </Text>
                    {
                        brandFilterOption.map((brand)=>(
                            <CheckBox
                                title={brand}
                            />
                        ))
                    }
                    <Text style={tw`px-2 text-base font-semibold`}>
                        Discount
                    </Text>
                    {
                        discountOption.map(({label,value})=>(
                            <CheckBox
                                title={label}
                            />
                        ))
                    }
                    <Text style={tw`px-2 text-base font-semibold`}>
                        Sizes
                    </Text>
                    {
                        sizesOption.map(({label,value})=>(
                            <CheckBox
                                title={label}
                            />
                        ))
                    }
                </ScrollView>
                <View style={tw`flex flex-row justify-end bg-white p-2`}>
                    <TouchableOpacity
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            borderWidth: 1,
                            alignItems: "center",
                            padding: 4,
                            paddingHorizontal: 10,
                            margin: 4
                        }}
                        onPress={() => setShowFilters(false)}
                    >
                        <FAIcon
                            name="close"
                            size={15}
                        />
                        <Text style={tw`ml-2`}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        display: "flex",
                        flexDirection: "row",
                        borderWidth: 1,
                        alignItems: "center",
                        padding: 2,
                        paddingHorizontal: 10,
                        margin: 4
                    }}>
                        <FAIcon
                            name="save"
                            size={15}
                        />
                        <Text style={tw`ml-2`}>
                            Apply
                        </Text>
                    </TouchableOpacity>
                </View>
            </BottomSheet>
        </View>
    )
}