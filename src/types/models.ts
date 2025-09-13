export interface Product {
    id: number,
    category: string,
    imageUrl: string,
    price: string,
    period: string,
    title: string,
    title_ar?: string,
    brand: string,
    condition: string,
    location: string,
    date: string,
    beds: string,
    baths: string,
    area: string,
    mileage: string,
    fuel: string,
    transmission: string,
    currency: string,
    sellerAvatar?: string;
    description?: string;
    sellerName?: string;
    floor?: string;
    rooms?: string;
    bathrooms?: string;
    furnished?: boolean;
    parking?: string;
    year?: string;
    color?: string;
    storage?: string;
    warranty?: string;
    long?: number;
    lat?: number;
}
export interface Category {
    id: number;
    name: string;
    images: Array<{
        thumb_plus_url: string;
    }>;
}