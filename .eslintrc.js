module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "globals": {
      "expect": false,
      "describe": false,
      "it": false
    },
    "rules": {
        "indent": [
            "error",
            2             // changed from default 4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double",
            { "avoidEscape": true }
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
