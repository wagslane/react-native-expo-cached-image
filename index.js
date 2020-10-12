import React, { Component } from 'react';
import { Image, ImageBackground, InteractionManager } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Crypto from 'expo-crypto';

export default class CachedImage extends Component {
  mounted = true;
  state = {
    imgURI: '',
  };

  async componentDidMount() {
    this._interaction = InteractionManager.runAfterInteractions(async () => {
      if (this.props.source.uri) {
        const filesystemURI = await this.getImageFilesystemKey(this.props.source.uri);
        await this.loadImage(filesystemURI, this.props.source.uri);
      }
    });
  }

  async componentDidUpdate() {
    if (this.props.source.uri) {
      const filesystemURI = await this.getImageFilesystemKey(this.props.source.uri);
      if (this.props.source.uri === this.state.imgURI || filesystemURI === this.state.imgURI) {
        return null;
      }
      await this.loadImage(filesystemURI, this.props.source.uri);
    }
  }

  async componentWillUnmount() {
    this._interaction && this._interaction.cancel();
    this.mounted = false;
    await this.checkClear();
  }

  async checkClear() {
    try {
      if (this.downloadResumable) {
        const t = await this.downloadResumable.pauseAsync();
        const filesystemURI = await this.getImageFilesystemKey(this.props.source.uri);
        const metadata = await FileSystem.getInfoAsync(filesystemURI);
        if (metadata.exists) {
          await FileSystem.deleteAsync(t.fileUri);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getImageFilesystemKey(remoteURI) {
    const hashed = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, remoteURI);
    return `${FileSystem.documentDirectory}${hashed}`;
  }

  async loadImage(filesystemURI, remoteURI) {
    if (this.downloadResumable && this.downloadResumable._removeSubscription) {
      this.downloadResumable._removeSubscription();
    }
    try {
      // Use the cached image if it exists
      const metadata = await FileSystem.getInfoAsync(filesystemURI);
      if (metadata.exists) {
        this.setState({
          imgURI: filesystemURI,
        });
        return;
      }

      // otherwise download to cache
      this.downloadResumable = FileSystem.createDownloadResumable(
        remoteURI,
        filesystemURI,
        {},
        (dp) => this.onDownloadUpdate(dp)
      );

      const imageObject = await this.downloadResumable.downloadAsync();
      if (this.mounted) {
        if (imageObject && imageObject.status == '200') {
          this.setState({
            imgURI: imageObject.uri,
          });
        }
      }
    } catch (err) {
      console.log('Image download error:', err);
      if (this.mounted) {
        this.setState({ imgURI: null });
      }
      const metadata = await FileSystem.getInfoAsync(filesystemURI);
      if (metadata.exists) {
        await FileSystem.deleteAsync(filesystemURI);
      }
    }
  }

  onDownloadUpdate(downloadProgress) {
    if (downloadProgress.totalBytesWritten >= downloadProgress.totalBytesExpectedToWrite) {
      if (this.downloadResumable && this.downloadResumable._removeSubscription) {
        this.downloadResumable._removeSubscription();
      }
      this.downloadResumable = null;
    }
  }

  render() {
    let source = this.state.imgURI ? { uri: this.state.imgURI } : null;
    if (!source && this.props.source) {
      source = { ...this.props.source, cache: 'force-cache' };
    }
    if (this.props.isBackground) {
      return (
        <ImageBackground {...this.props} source={source}>
          {this.props.children}
        </ImageBackground>
      );
    } else {
      return <Image {...this.props} source={source} />;
    }
  }
}
