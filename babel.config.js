module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        safe: false,
        allowUndefined: true,
        allowlist: [
          'TMDB_BASE_URL',
          'TMDB_IMAGE_BASE_URL',
          'TMDB_ACCESS_TOKEN',
        ],
      },
    ],
  ],
};
