export const API_URL = 'https://aaron.greider.org/Digital-Weekly-Ad/json/231002-3_ad.json';

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