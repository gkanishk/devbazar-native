export const getDiscounterPrice = (price:number, disc:number) => {
    return Math.round(price - ((disc / 100) * price));
}