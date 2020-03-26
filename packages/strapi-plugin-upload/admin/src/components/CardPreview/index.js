import React from 'react';
import PropTypes from 'prop-types';

import { getExtension, getType } from '../../utils';

import BrokenFile from '../../icons/BrokenFile';
import FileIcon from '../FileIcon';
import VideoPreview from '../VideoPreview';
import Wrapper from './Wrapper';
import Image from './Image';

const CardPreview = ({ hasError, hasIcon, url, previewUrl, type, withFileCaching }) => {
  const isFile = getType(type) === 'file';
  const isVideo = getType(type) === 'video';

  if (hasError) {
    return (
      <Wrapper isFile>
        <BrokenFile />
      </Wrapper>
    );
  }

  if (isFile) {
    return (
      <Wrapper isFile>
        <FileIcon ext={getExtension(type)} />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {isVideo ? (
        <VideoPreview src={url} previewUrl={previewUrl} hasIcon={hasIcon} />
      ) : (
        // Adding performance.now forces the browser no to cache the img
        // https://stackoverflow.com/questions/126772/how-to-force-a-web-browser-not-to-cache-images
        <Image src={`${url}${withFileCaching ? `?${performance.now()}` : ''}`} />
      )}
    </Wrapper>
  );
};

CardPreview.defaultProps = {
  hasError: false,
  hasIcon: false,
  previewUrl: null,
  url: null,
  type: '',
  withFileCaching: true,
};

CardPreview.propTypes = {
  hasError: PropTypes.bool,
  hasIcon: PropTypes.bool,
  previewUrl: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.string,
  withFileCaching: PropTypes.bool,
};

export default CardPreview;
