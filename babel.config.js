module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      '@babel/plugin-proposal-optional-chaining',
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            components: './src/components',
            context: './src/context',
            hooks: './src/hooks',
            screens: './src/screens',
            sources: './src/sources',
            utils: './src/utils',
          },
        },
      ],
    ],
  };
};
