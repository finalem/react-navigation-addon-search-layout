import React from 'react';
import { Animated, Dimensions, Platform, StyleSheet, View } from 'react-native';
import { withNavigation, HeaderBackButton } from 'react-navigation';

const X_HEIGHT = 812;
const isIPhoneXSize = ({ height, width }) => {
  return height === X_HEIGHT || width === X_HEIGHT;
};

const XR_HEIGHT = 896;
const isIPhoneXrSize = ({ height, width }) => {
  return height === XR_HEIGHT || width === XR_HEIGHT;
};

const dimensions = Dimensions.get('window');
const isIPhoneX =
  Platform.OS === 'ios' && (isIPhoneXSize(dimensions) || isIPhoneXrSize(dimensions));

const NOTCH_HEIGHT = isIPhoneX ? 20 : 0;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 50 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
const TITLE_OFFSET = Platform.OS === 'ios' ? 70 : 56;

@withNavigation
export default class Header extends React.PureComponent {
  static HEIGHT = APPBAR_HEIGHT + STATUSBAR_HEIGHT + NOTCH_HEIGHT;

  _navigateBack = () => {
    this.props.navigation.goBack(null);
  };

  _maybeRenderBackButton = () => {
    if (!this.props.backButton) {
      return;
    }

    return (
      <HeaderBackButton
        onPress={this._navigateBack}
        pressColorAndroid={this.props.tintColor || '#fff'}
        tintColor={this.props.tintColor}
        title={this.props.backButtonTitle || null}
        truncatedTitle={this.props.backButtonTruncatedTitle || null}
        titleStyle={this.props.backButtonTitleStyle || null}
      />
    );
  };

  render() {
    let headerStyle = {};

    if (this.props.backgroundColor) {
      headerStyle.backgroundColor = this.props.backgroundColor;
    }

    if (this.props.height) {
      headerStyle.height = this.props.height + STATUSBAR_HEIGHT + NOTCH_HEIGHT;
    }

    return (
      <Animated.View style={[styles.container, headerStyle]}>
        <View style={styles.appBar}>
          <View style={[StyleSheet.absoluteFill, styles.header]}>
            {this._maybeRenderBackButton()}
            {this.props.children}
          </View>
        </View>
      </Animated.View>
    );
  }
}

let platformContainerStyles;
if (Platform.OS === 'ios') {
  platformContainerStyles = {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, .3)',
  };
} else {
  platformContainerStyles = {
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: StyleSheet.hairlineWidth,
    shadowOffset: {
      height: StyleSheet.hairlineWidth,
    },
    elevation: 4,
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: STATUSBAR_HEIGHT + NOTCH_HEIGHT,
    height: STATUSBAR_HEIGHT + APPBAR_HEIGHT + NOTCH_HEIGHT,
    ...platformContainerStyles,
  },
  appBar: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    bottom: 0,
    left: TITLE_OFFSET,
    right: TITLE_OFFSET,
    top: 0,
    position: 'absolute',
    alignItems: Platform.OS === 'ios' ? 'center' : 'flex-start',
  },
  left: {
    left: 0,
    bottom: 0,
    top: 0,
    position: 'absolute',
  },
  right: {
    right: 0,
    bottom: 0,
    top: 0,
    position: 'absolute',
  },
});
