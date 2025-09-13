module.exports = {
    presets: ['babel-preset-expo'],
    plugins: [
        [
            'module-resolver',
            {
                root: ['./'],
                extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
                alias: {
                    '@types': './src/types',
                    '@components': './src/components',
                    '@navigation': './src/navigation',
                    '@screens': './src/screens',
                    '@redux': './src/redux',
                    '@assets': './src/assets',
                    '@constants': './src/constants',
                    '@contexts': './src/contexts',
                    '@api': './src/api',
                    '@hooks': './src/hooks',
                    '@services': './src/services',
                    '@helpers': './src/helpers',
                    '@data' : './src/data',
                },
            },
        ],
        'react-native-reanimated/plugin',
    ],
};