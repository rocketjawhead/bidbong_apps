import {
  React,
  useState,
  Image as RNImage,
  Animated,
  PropTypes,
  ImageBackground as RNImageBackground,
} from 'libraries';
import images from 'images';
import icons from 'icons';

const getDefaultImage = source => {
  if (source !== null) return source;
  return images['ic-home'];
};

const getImage = source => {
  if (source && source !== null) return source;
  return images['ic-home'];
};

const Image = ({
  style,
  source,
  onError,
  animated,
  imgWidth,
  children,
  imgHeight,
  resizeMode,
  imageStyle,
  contentIcon,
  imageBackground,
  ...props
}) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const imgSource =
    typeof source === 'string'
      ? getImage(images[source])
      : getDefaultImage(source);
  const iconSource =
    typeof source === 'string'
      ? getImage(icons[source])
      : getDefaultImage(source);
  const baseStyle = width > 0 || height > 0 ? {width, height} : {};

  if (animated)
    return (
      <Animated.Image
        style={style}
        source={contentIcon ? iconSource : imgSource}
        {...props}
      />
    );

  if (imageBackground) {
    return (
      <RNImageBackground
        resizeMode={resizeMode}
        style={style}
        imageStyle={imageStyle}
        source={imgSource}>
        {children}
      </RNImageBackground>
    );
  }

  return (
    <RNImage
      style={{...baseStyle, ...style}}
      source={contentIcon ? iconSource : imgSource}
      onError={onError}
      onLoad={e => {
        const value = e.nativeEvent.source;
        if (imgWidth && !imgHeight) {
          setWidth(imgWidth);
          setHeight(value.height * (imgWidth / value.width));
        } else if (!imgWidth && imgHeight) {
          setWidth(value.width * (imgHeight / value.height));
          setHeight(imgHeight);
        }
      }}
      {...props}
    />
  );
};

Image.propTypes = {
  style: PropTypes.object,
  source: PropTypes.any,
  onError: PropTypes.func,
  animated: PropTypes.bool,
  children: PropTypes.any,
  imgWidth: PropTypes.number,
  imgHeight: PropTypes.number,
  resizeMode: PropTypes.string,
  imageStyle: PropTypes.any,
  contentIcon: PropTypes.bool,
  imageBackground: PropTypes.bool,
};

Image.defaultProps = {
  style: {},
  onError: () => {},
  source: {
    uri: 'https://i.ibb.co/kcCYz7z/ic-telkomsel.png',
  },
  animated: false,
  resizeMode: 'cover',
  contentIcon: false,
};

export default React.memo(Image);
