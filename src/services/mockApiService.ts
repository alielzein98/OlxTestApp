import { allProducts, categories, fakeApartments, fakeCars, fakeMobiles } from "@data/mockData";
import { Product } from "@types";
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchProducts = (): Promise<Product[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(allProducts);
        }, 200);
    });
};

export const fetchCategories = async () => {
    await delay(200);
    return categories;
}
export const fetchApartments = async () => {
    await delay(200);
    return fakeApartments;
};

export const fetchCars = async () => {
    await delay(200);
    return fakeCars;
};

export const fetchMobiles = async () => {
    await delay(200);
    return fakeMobiles;
};