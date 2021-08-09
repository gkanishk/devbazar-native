import React, { useState, useEffect } from "react";
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
import { useAppDispatch, useAppSelector } from "../app/hook";
import { 
    getFilters, 
    setBrandFilter, 
    setDiscountFilter, 
    setSortByFilter, 
    setIdealForFilter, 
    setSizeFilter, 
    setIncludeOutOfStock, 
    clearFilter, 
    clearSortByFilter, 
    filterProducts 
} from "../features/Products/products.slice";

export default function ProductFooter() {
    const [showSortBy, setShowSortBy] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const dispatch = useAppDispatch();
    const filters = useAppSelector(getFilters);

    useEffect(() => {
        dispatch(filterProducts());
    }, [filters])
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
                                checked={filters.sortBy === value}
                                onPress={() => dispatch(setSortByFilter(value))}
                            ></CheckBox>
                        ))
                    }
                    <CheckBox
                        title='Include Out of Stock'
                        checked={filters.includeOutOfStock}
                        onPress={() => dispatch(setIncludeOutOfStock())}
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
                        onPress={()=>dispatch(clearSortByFilter())} 
                    >
                        <FAIcon
                            name="close"
                            size={15}
                        />
                        <Text style={tw`ml-2`}>
                            Clear Sort By
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
                    }}
                    onPress={() => setShowSortBy(false)}
                    >
                        <FAIcon
                            name="save"
                            size={15}
                        />
                        <Text style={tw`ml-2`}>
                            Close
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
                            key={value+label}
                                title={label}
                                checked={filters.idealFor.includes(value)}
                                onPress={()=>dispatch(setIdealForFilter(value))}
                            />
                        ))
                    }
                    <Text style={tw`px-2 text-base font-semibold`}>
                        Brands
                    </Text>
                    {
                        brandFilterOption.map((brand,index)=>(
                            <CheckBox
                                title={brand}
                                key={index+brand}
                                checked={filters.brand.includes(brand)}
                                onPress={()=>dispatch(setBrandFilter(brand))}
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
                                key={value+label}
                                checked={filters.discount.includes(value)}
                                onPress={()=>dispatch(setDiscountFilter(value))}
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
                                key={value+label}
                                checked={filters.size.includes(value)}
                                onPress={()=>dispatch(setSizeFilter(value))}
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
                        onPress={()=>dispatch(clearFilter())} 
                    >
                        <FAIcon
                            name="close"
                            size={15}
                        />
                        <Text style={tw`ml-2`}>
                            Clear Filter
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
                    }}
                    onPress={() => setShowFilters(false)}
                    >
                        <FAIcon
                            name="save"
                            size={15}
                        />
                        <Text style={tw`ml-2`}>
                            Close
                        </Text>
                    </TouchableOpacity>
                </View>
            </BottomSheet>
        </View>
    )
}