# react-native-expo-cached-image

Cached image component for Expo's managed workflow

## Installation

`expo install react-native-expo-cached-image`

or

`yarn add react-native-expo-cached-image`

or

`npm install react-native-expo-cached-image`

## Quick Start

```javascript
import CachedImage from 'react-native-expo-cached-image';

// In render()
<CachedImage source={{ uri: 'https://qvault.io/wp-content/uploads/2019/05/QVault-app.png' }}/>

```

The component will download the image to the user's local filesystem using a deterministic hash
of the URI as the path key. If the image is already downloaded, it will be rendered without re-downloading.

### Props

CachedImage is a direct wrapper of [react-native Image](https://facebook.github.io/react-native/docs/image). As such, all of its props are available as props to CachedImage. Styles are also passed down.

#### ImageBackground

CachedImage can optionally be used as a wrapper of [react-native ImageBackground](https://facebook.github.io/react-native/docs/imagebackground). To do so, pass in the prop isBackground={true}.

```javascript
import CachedImage from 'react-native-expo-cached-image';

// In render()
<CachedImage isBackground source={{ uri: 'https://qvault.io/wp-content/uploads/2019/05/QVault-app.png' }}/>

```

## Contributing

Feel free to contribute! This package is open-source, just make sure that your pull request passes linting and tests:

```bash
yarn lint
```

```bash
yarn test
```
