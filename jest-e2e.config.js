
module.exports = {
    preset: 'jest-puppeteer-preset',
    "collectCoverageFrom": [
        "src/**/*.{js,jsx,mjs}"
    ],
    "setupFiles": [
        "<rootDir>/config/polyfills.js",
        "jest-localstorage-mock",
        "<rootDir>/config/setupTest.js"
    ],
    "testMatch": [
        "<rootDir>/src/**/?(*.)(e2etest).{js,jsx,mjs}"
    ],
    "testEnvironment": "node",
    "testURL": "http://localhost",
    "transform": {
        "^.+\\.(js|jsx|mjs)$": "<rootDir>/node_modules/babel-jest",
        "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
        "^(?!.*\\.(js|jsx|mjs|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
    },
    "transformIgnorePatterns": [
        "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$"
    ],
    "moduleNameMapper": {
        "^react-native$": "react-native-web",
        "^@src[/](.+)": "<rootDir>/src/$1",
        "^@less[/](.+)": "<rootDir>/src/less/$1",
        "^@components[/](.+)": "<rootDir>/src/components/$1",
        "^@container[/](.+)": "<rootDir>/src/container/$1"
    },
    "moduleFileExtensions": [
        "web.js",
        "js",
        "json",
        "web.jsx",
        "jsx",
        "node",
        "mjs"
    ]
}
