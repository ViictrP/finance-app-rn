module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      rules: {
        "no-undefined": "error",
        "no-var": "error",
        "no-useless-return": "error",
        "no-empty-function": "error",
        "no-unused-vars": "off",
        "init-declarations": "off",
      }
    }
  ]
};
