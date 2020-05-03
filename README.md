# react-native-expo-cached-image

[![npm version](https://badge.fury.io/js/react-native-expo-cached-image.svg)](https://badge.fury.io/js/react-native-expo-cached-image)

Cached image component for Expo's managed workflow

## ⚙️ Installation

`yarn add react-native-expo-cached-image`

## 🚀 Quick Start

```javascript
import CachedImage from 'react-native-expo-cached-image';

// In render()
<CachedImage style={styles.imageStyle} source={{ uri: 'https://qvault.io/wp-content/uploads/2019/05/QVault-app.png' }}/>

```

The CachedImage component downloads the image to the user's local filesystem using a deterministic hash
of the URI as the path key. If the image is already downloaded, it will be rendered without re-downloading.

### Props

CachedImage is a direct wrapper of the standard [React Native Image](https://facebook.github.io/react-native/docs/image)
and matches it's API. As such, all of the standard props are available as props to CachedImage. Styles are also passed down.

#### ImageBackground

CachedImage can optionally be used as a wrapper of [React Native's ImageBackground](https://facebook.github.io/react-native/docs/imagebackground). To do so, pass in the prop isBackground={true}.

```javascript
import CachedImage from 'react-native-expo-cached-image';

// In render()
<CachedImage style={styles.imageStyle} isBackground={true} source={{ uri: 'https://qvault.io/wp-content/uploads/2019/05/QVault-app.png' }}/>

```

## 💬 Contact

[![Twitter Follow](https://img.shields.io/twitter/follow/wagslane.svg?label=Follow%20Wagslane&style=social)](https://twitter.com/intent/follow?screen_name=wagslane)

Submit an issue (above in the issues tab)

## 🙏🏻 Compatibility

CachedImage Has been tested with the react-native Expo managed workflow. If you have success with other workflows let us know!

## 👏 Contributing

We love help! Contribute by forking the repo and opening pull requests.

Please ensure that your code passes the existing tests and linting. Write tests to test your changes if applicable.

Don't make stylistic or whitespace changes without contacting maintainers - we probably won't approve unsolicited stylistic changes.

All pull requests should be submitted to the "master" branch.

```bash
yarn lint
```

```bash
yarn test
```
