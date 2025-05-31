/** External Dependencies */
import React, { useEffect, useRef, useMemo, useState } from 'react';
import { Ellipse, Image, Line, Rect, Transformer } from 'react-konva';
import Konva from 'konva';
import * as faceapi from 'face-api.js';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { useStore } from 'hooks';
import { SET_CROP, SET_FEEDBACK } from 'actions';
import {
  CUSTOM_CROP,
  ELLIPSE_CROP,
  FEEDBACK_STATUSES,
  ORIGINAL_CROP,
  TOOLS_IDS,
} from 'utils/constants';
import { boundDragging, boundResizing } from './TransformersLayer.utils';
import TextNode from '../DesignLayer/AnnotationNodes/TextNode';

const noEffectTextDimensions = {
  width: 200,
  height: 100,
};

const CropTransformer = ({
  setFaceBox,
  faceBox,
  setTopToChin,
  topToChin,
  setTopMargin,
}) => {
  const {
    dispatch,
    theme,
    designLayer,
    originalImage,
    shownImageDimensions,
    adjustments: { crop = {}, isFlippedX, isFlippedY } = {},
    resize = {},
    config,
    t,
    isLoadingGlobally,
    showMeasure,
  } = useStore();
  const cropShapeRef = useRef();
  const cropTransformerRef = useRef();
  const tmpImgNodeRef = useRef();
  const shownImageDimensionsRef = useRef();
  const cropConfig = config[TOOLS_IDS.CROP];
  const cropSettings = useMemo(
    () => ({
      ...cropConfig,
      lockCropAreaAt: crop.lockCropAreaAt ?? cropConfig?.lockCropAreaAt,
    }),
    [crop.lockCropAreaAt, cropConfig],
  );
  const { lockCropAreaAt } = cropSettings;
  const cropRatio = crop.ratio || cropSettings.ratio;
  const isCustom = cropRatio === CUSTOM_CROP;
  const isEllipse = cropRatio === ELLIPSE_CROP;
  const [topHead, setTopHead] = useState(0);

  const getProperCropRatio = () =>
    cropRatio === ORIGINAL_CROP
      ? originalImage.width / originalImage.height
      : cropRatio;

  const saveCrop = ({ width, height, x, y }, noHistory) => {
    const newCrop = {
      x,
      y,
      width,
      height,
    };

    const isOldCropBiggerThanResize =
      crop.width >= resize.width && crop.height >= resize.height;
    if (
      resize.width &&
      resize.height &&
      (width < resize.width || height < resize.height) &&
      isOldCropBiggerThanResize
    ) {
      dispatch({
        type: SET_FEEDBACK,
        payload: {
          feedback: {
            message: t('cropSizeLowerThanResizedWarning'),
            status: FEEDBACK_STATUSES.WARNING,
          },
        },
      });
    }

    dispatch({
      type: SET_CROP,
      payload: {
        ...crop,
        ...newCrop,
        dismissHistory: noHistory,
      },
    });
  };

  const saveBoundedCropWithLatestConfig = (
    cropWidth,
    cropHeight,
    restrictions = { noScale: true },
  ) => {
    if (cropTransformerRef.current && cropShapeRef.current) {
      cropTransformerRef.current.nodes([cropShapeRef.current]);
    }

    const imageDimensions = shownImageDimensionsRef.current;

    const attrs = {
      width: cropWidth,
      height: cropHeight,
      x: crop.x ?? 0,
      y: crop.y ?? 0,
    };

    saveCrop(
      boundResizing(
        attrs,
        attrs,
        { ...imageDimensions, abstractX: 0, abstractY: 0 },
        isCustom || isEllipse ? false : getProperCropRatio(),
        { ...cropSettings, ...restrictions },
      ),
      true,
    );
  };

  useEffect(() => {
    if (designLayer && cropTransformerRef.current && cropShapeRef.current) {
      if (tmpImgNodeRef.current) {
        tmpImgNodeRef.current.cache();
      }
      cropTransformerRef.current.nodes([cropShapeRef.current]);
    }

    return () => {
      if (tmpImgNodeRef.current) {
        tmpImgNodeRef.current.clearCache();
      }
    };
  }, [designLayer, originalImage, shownImageDimensions]);

  useEffect(() => {
    if (shownImageDimensions) {
      shownImageDimensionsRef.current = shownImageDimensions;
      if (
        typeof shownImageDimensions.x !== 'undefined' &&
        shownImageDimensions.width
      ) {
        saveBoundedCropWithLatestConfig(
          crop.width ?? shownImageDimensions.width,
          crop.height ?? shownImageDimensions.height,
        );
      }
    }
  }, [cropRatio, shownImageDimensions, cropSettings]);

  const scaledMeasures = useMemo(() => {
    const { width: shownWidth, height: shownHeight } = shownImageDimensions;
    const { width, height } = originalImage;

    return {
      scaleX: shownWidth / width,
      scaleY: shownHeight / height,
    };
  });

  useEffect(() => {
    // Load models from public folder
    if (!faceBox || faceBox.src !== originalImage.src) {
      const loadModels = async () => {
        const MODEL_URL =
          'https://supachaic.github.io/react-face-recognition/models';
        await faceapi.loadTinyFaceDetectorModel(MODEL_URL);
        await faceapi.loadFaceLandmarkTinyModel(MODEL_URL);
        await faceapi.loadFaceRecognitionModel(MODEL_URL);
      };

      const detectFace = async () => {
        const detection = await faceapi.detectSingleFace(
          originalImage,
          new faceapi.TinyFaceDetectorOptions(),
        );

        if (detection) {
          const { box } = detection;
          const { x, y, width, height } = box;

          const scaledBox = {
            x: x * scaledMeasures.scaleX,
            y: y * scaledMeasures.scaleY,
            width: width * scaledMeasures.scaleX,
            height: height * scaledMeasures.scaleY,
            src: originalImage.src,
          };

          setFaceBox(scaledBox); // Assuming you have a setFaceBox state hook
        }
      };

      loadModels().then(detectFace);
    }
  }, [originalImage, scaledMeasures]);

  useEffect(() => {
    if (
      !originalImage ||
      !originalImage.complete ||
      originalImage.naturalWidth === 0 ||
      !faceBox
    ) {
      return;
    }

    // Process the image on offscreen canvas
    const offCanvas = document.createElement('canvas');
    offCanvas.width = originalImage.width;
    offCanvas.height = originalImage.height;

    const ctx = offCanvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(originalImage, 0, 0);
    const imageData = ctx.getImageData(
      0,
      0,
      originalImage.width,
      originalImage.height,
    );
    const { data } = imageData;

    for (let y = 0; y < originalImage.height; y += 1) {
      for (let x = 0; x < originalImage.width; x += 1) {
        const idx = (y * originalImage.width + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];

        const isWhite = r > 200 && g > 200 && b > 200;

        if (!isWhite && y > 5 && x > 5 && x < originalImage.width - 5) {
          setTopHead(y * scaledMeasures.scaleY);
          setTopToChin(faceBox.height + faceBox.y - y * scaledMeasures.scaleY);
          return;
        }
      }
    }
  }, [originalImage, scaledMeasures, faceBox]);

  if (!designLayer) {
    return null;
  }

  const enabledAnchors =
    ((lockCropAreaAt || crop.noEffect) && []) ||
    (isCustom || isEllipse
      ? undefined
      : ['top-left', 'bottom-left', 'top-right', 'bottom-right']);

  const saveCropFromEvent = (e, noHistory = false) => {
    if (!e.target) {
      return;
    }

    saveCrop(
      {
        width: e.target.width() * e.target.scaleX(),
        height: e.target.height() * e.target.scaleY(),
        x: e.target.x(),
        y: e.target.y(),
      },
      noHistory,
    );
  };

  useEffect(() => {
    if (cropTransformerRef.current) {
      cropTransformerRef.current.moveToTop();
    }
  }, [faceBox]);

  const limitDragging = (e) => {
    const currentCropShape = e.target;
    currentCropShape.setAttrs(
      boundDragging(currentCropShape.attrs, shownImageDimensionsRef.current),
    );
  };

  let attrs;
  if (!crop.width && !crop.height) {
    const scaleFactor =
      shownImageDimensions.scaledBy < 1 ? shownImageDimensions.scaledBy : 1;
    const unscaledImgDimensions = {
      ...shownImageDimensions,
      width: shownImageDimensions.width / scaleFactor,
      height: shownImageDimensions.height / scaleFactor,
    };
    attrs = boundResizing(
      unscaledImgDimensions,
      { ...unscaledImgDimensions, x: 0, y: 0 },
      { ...unscaledImgDimensions, abstractX: 0, abstractY: 0 },
      isCustom || isEllipse ? false : getProperCropRatio(),
      cropSettings,
    );
  } else {
    attrs = crop;
  }

  const { x = 0, y = 0, width, height } = attrs;

  const cropShapeProps = {
    x,
    y,
    ref: cropShapeRef,
    fill: '#FFFFFF',
    scaleX: 1,
    scaleY: 1,
    globalCompositeOperation: 'destination-out',
    onDragEnd: lockCropAreaAt ? undefined : saveCropFromEvent,
    onDragMove: lockCropAreaAt ? undefined : limitDragging,
    onTransformEnd: lockCropAreaAt ? undefined : saveCropFromEvent,
    draggable: !lockCropAreaAt,
  };

  useEffect(() => {
    if (topHead) {
      setTopMargin(topHead - cropShapeProps.y);
    }
  }, [topHead, cropShapeProps]);

  // ALT is used to center scaling
  return (
    <>
      <Image
        image={originalImage}
        x={isFlippedX ? shownImageDimensions.width : 0}
        y={isFlippedY ? shownImageDimensions.height : 0}
        width={shownImageDimensions.width}
        height={shownImageDimensions.height}
        filters={[Konva.Filters.Blur, Konva.Filters.Brighten]}
        blurRadius={10}
        brightness={-0.3}
        scaleX={isFlippedX ? -1 : 1}
        scaleY={isFlippedY ? -1 : 1}
        ref={tmpImgNodeRef}
      />
      {isEllipse ? (
        <Ellipse
          {...cropShapeProps}
          radiusX={width / 2}
          radiusY={height / 2}
          offset={{
            x: -width / 2,
            y: -height / 2,
          }}
        />
      ) : (
        <>
          <Rect
            {...cropShapeProps}
            width={crop.noEffect ? 0 : width}
            height={crop.noEffect ? 0 : height}
          />

          {showMeasure && !isLoadingGlobally && (
            <Line
              points={[
                cropShapeProps.x + width / 2,
                cropShapeProps.y,
                cropShapeProps.x + width / 2,
                cropShapeProps.y + height,
              ]}
              stroke="red"
              strokeWidth={1}
            />
          )}

          {showMeasure && faceBox && !isLoadingGlobally && (
            <Ellipse
              x={faceBox.x + faceBox.width / 2}
              y={topHead + topToChin / 2}
              radiusX={faceBox.width / 2}
              radiusY={topToChin / 2}
              stroke="red"
              strokeWidth={1}
            />
          )}
          {showMeasure && faceBox && !isLoadingGlobally && (
            <Ellipse
              x={faceBox.x + faceBox.width / 2}
              y={faceBox.y + faceBox.height / 2}
              radiusX={faceBox.width / 2 - 10}
              radiusY={faceBox.height / 2}
              stroke="red"
              strokeWidth={1}
            />
          )}
        </>
      )}
      {crop.noEffect && (
        <TextNode
          name="Text"
          id="no-preview-text-node"
          text={t('cropItemNoEffect')}
          x={shownImageDimensions.width / 2 - noEffectTextDimensions.width / 2}
          y={
            shownImageDimensions.height / 2 - noEffectTextDimensions.height / 2
          }
          fontSize={20}
          fill="#ffffff"
          stroke="#ff0000"
          strokeWidth={0.2}
          shadowColor="#ff0000"
          shadowBlur={10}
          annotationEvents={{}}
          align="center"
          width={noEffectTextDimensions.width}
          height={noEffectTextDimensions.height}
        />
      )}
      <Transformer
        centeredScaling={false}
        flipEnabled={false}
        rotateEnabled={false}
        nodes={cropShapeRef.current ? [cropShapeRef.current] : []}
        anchorSize={14}
        anchorCornerRadius={7}
        enabledAnchors={enabledAnchors}
        ignoreStroke={false}
        anchorStroke={theme.palette['accent-primary']}
        anchorFill={theme.palette['access-primary']}
        anchorStrokeWidth={2}
        borderStroke={theme.palette['accent-primary']}
        borderStrokeWidth={2}
        borderDash={[4]}
        keepRatio={!isCustom || !isEllipse}
        ref={cropTransformerRef}
        boundBoxFunc={(absOldBox, absNewBox) =>
          boundResizing(
            absOldBox,
            absNewBox,
            shownImageDimensionsRef.current,
            isCustom || isEllipse ? false : getProperCropRatio(),
            cropSettings,
          )
        }
      />
    </>
  );
};

CropTransformer.propTypes = {
  setFaceBox: PropTypes.func.isRequired,
  faceBox: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    src: PropTypes.string,
  }),
  setTopToChin: PropTypes.func.isRequired,
  setTopMargin: PropTypes.func.isRequired,
  topToChin: PropTypes.number.isRequired,
};

CropTransformer.defaultProps = {
  faceBox: null,
};

export default CropTransformer;
