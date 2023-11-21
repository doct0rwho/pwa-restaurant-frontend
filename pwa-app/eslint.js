module.exports = {
    // Specify the environments where your code is intended to run
    env: {
      browser: true,
      node: true,
      es6: true,
    },
    // Extend a set of recommended rules
    extends: ['eslint:recommended', 'plugin:vue/recommended'],
    // Add your own custom rules or override existing ones
    rules: {
      // Example: enforce two spaces for indentation
      'indent': ['error', 2],
      // Add more rules as needed
    },
    // Specify plugins
    plugins: [
      'vue',
      // Add more plugins as needed
    ],
    overrides: [
        {
          files: ['**/*.js'], // Adjust the pattern to match your project structure
          parserOptions: {
            requireConfigFile: false,
          },
        },
      ],
  };
  