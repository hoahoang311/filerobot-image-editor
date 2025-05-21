/** External Dependencies */
import React, { useCallback, useEffect, useRef } from 'react';

/** Internal Dependencies */
import { DesignLayer, TransformersLayer } from 'components/Layers';
import PropTypes from 'prop-types';
import { AppProviderOverridenValue } from 'context';
import { SET_CANVAS_SIZE } from 'actions';
import { useResizeObserver, useStore } from 'hooks';
import NodeControls from 'components/NodeControls';
import CanvasNode from './CanvasNode';
import { CanvasContainer, StyledOrignalImage } from './MainCanvas.styled';

const MainCanvas = ({ setFaceBox, faceBox, setTopToChin }) => {
  const [observeResize] = useResizeObserver();
  const providedAppContext = useStore();
  const canvasContainerRef = useRef(null);

  const setNewCanvasSize = useCallback(
    ({ width: containerWidth, height: containerHeight }) => {
      providedAppContext.dispatch({
        type: SET_CANVAS_SIZE,
        payload: {
          canvasWidth: containerWidth,
          canvasHeight: containerHeight,
        },
      });
    },
    [],
  );

  useEffect(() => {
    observeResize(canvasContainerRef.current, setNewCanvasSize);
  }, []);

  return (
    <CanvasContainer className="FIE_canvas-container" ref={canvasContainerRef}>
      {!providedAppContext.textIdOfEditableContent && <NodeControls />}
      {providedAppContext.isShowOriginalImage && (
        <StyledOrignalImage
          className="FIE_original-image-compare"
          src={providedAppContext.originalImage.src}
        />
      )}
      <CanvasNode>
        <AppProviderOverridenValue overridingValue={providedAppContext}>
          <DesignLayer />
          <TransformersLayer
            setFaceBox={setFaceBox}
            faceBox={faceBox}
            setTopToChin={setTopToChin}
          />
        </AppProviderOverridenValue>
      </CanvasNode>
    </CanvasContainer>
  );
};

MainCanvas.propTypes = {
  setFaceBox: PropTypes.func.isRequired,
  faceBox: PropTypes.shape({}),
  setTopToChin: PropTypes.func.isRequired,
};

MainCanvas.defaultProps = {
  faceBox: {},
};

export default MainCanvas;
