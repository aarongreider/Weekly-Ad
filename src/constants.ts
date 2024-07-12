//export const API_URL = 'https://aaron.greider.org/Digital-Weekly-Ad/json/231002-3_ad.json';
export const API_URL = 'https://gist.githubusercontent.com/aarongreider/80b5cecd58b2677ece06df4b3b40536f/raw/cbf7de85c64475b0d23a9d914b743a0663233169/weeklyadJSON';

export const AD_ITEM_KEYS = {
    page: "PAGE",
    block: "BLOCK",
    section: "SECTION",
    tagline: "TAGLINE",
    menu: "MENU",
    brand: "BRAND NAME",
    description: "PRODUCT DESCRIPTION",
    category: "PRODUCT CATEGORY",
    price: "PRICE",
    size: "SIZE",
    unit: "UNIT",
    priceDisplay: "DISPLAY PRICE",
    save: "SAVE",
    badges: "BADGES",
    additional: "ADDITIONAL TEXT",
    instructions: "INSTRUCTIONS",
    image: "IMG URL",
    id: "ID"
}

export type Product = {
    page: number,
    block: number,
    section: string,
    tagline: string,
    menu: string,
    brand: string,
    description: string,
    category: string,
    price: number,
    size: string,
    unit: string,
    priceDisplay: string,
    save: number,
    badges: string[],
    additional: string,
    instructions: string,
    image: string,
    id: number,
    quantity: number
}