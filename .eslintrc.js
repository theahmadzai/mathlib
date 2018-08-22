module.exports = {
    "env": {
        "node": true,
        "commonjs": true,
        "es6": true
    },
    "extends": ["eslint:recommended", "eslint-config-immortal"],
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
      "semi": [
          "error",
          "never"
      ],
      "prefer-template": "off",
      "prefer-const": "off"
    }
};
