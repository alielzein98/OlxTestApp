import { RouteProp } from '@react-navigation/native';
import { Product } from './models';

export type RootStackParamList = {
    AdDetails: { ad: Product , language: string};
};

export type AdDetailsRouteProp = RouteProp<
    RootStackParamList,
    'AdDetails'
>;
