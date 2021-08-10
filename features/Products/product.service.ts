import { FiltersType, ProductType } from "./products.slice";

export const getDiscounterPrice = (price: number, disc: number) => {
    return Math.round(price - ((disc / 100) * price));
}

export const getfilterProducts = (filters: FiltersType, products: ProductType[]):ProductType[] => {
    let tempArray = [...products];
    if (filters.brand.length > 0)
        tempArray = tempArray.filter(({ attributes }) => (filters.brand.includes(attributes.brand)))
    if (filters.idealFor.length > 0)
        tempArray = tempArray.filter(({ attributes }) => (filters.idealFor.includes(attributes.for)));
    if (filters.size.length > 0)
        tempArray = tempArray.filter(({ attributes }) => ((filters.size.filter(element => attributes.sizes.includes(element))).length > 0));
    if (filters.discount.length > 0)
        tempArray = tempArray.filter(({ discount }) => (filters.discount.includes(discount)));
    if (filters.sortBy === "low") {
        tempArray = tempArray.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "high") {
        tempArray = tempArray.sort((a, b) => b.price - a.price);
    }
    if (!filters.includeOutOfStock)
        tempArray = tempArray.filter(({ quantity }) => quantity > 0)
    return tempArray;
}