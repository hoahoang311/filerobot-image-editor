/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Layer } from 'react-konva';

/** Internal Dependencies */
import { useStore } from 'hooks';
import { TOOLS_IDS, TRANSFORMERS_LAYER_ID } from 'utils/constants';
import CropTransformer from './CropTransformer';
import NodesTransformer from './NodesTransformer';

const TransformersLayer = ({ setFaceBox, faceBox, setTopToChin }) => {
  const { toolId, shownImageDimensions } = useStore();

  return (
    <Layer
      id={TRANSFORMERS_LAYER_ID}
      x={shownImageDimensions.abstractX || 0}
      y={shownImageDimensions.abstractY || 0}
    >
      <NodesTransformer />
      {toolId === TOOLS_IDS.CROP && (
        <CropTransformer
          setFaceBox={setFaceBox}
          faceBox={faceBox}
          setTopToChin={setTopToChin}
        />
      )}
    </Layer>
  );
};
TransformersLayer.propTypes = {
  setFaceBox: PropTypes.func.isRequired,
  faceBox: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  }).isRequired,
  setTopToChin: PropTypes.func.isRequired,
};

export default TransformersLayer;
