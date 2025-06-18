// src/entities/product/types.ts
export interface ICountry {
    code: string;
    name: string;
    emoji: string;
    // + цена каждого товара (в долларах)
    price: number;
}
