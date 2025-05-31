/** External Dependencies */
import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { SET_CROP, SET_RESIZE, SHOW_MEASURE, ZOOM_CANVAS } from 'actions';
import { usePhoneScreen, useStore } from 'hooks';
import { StyledToolsBarItemButtonLabel } from 'components/ToolsBar/ToolsBar.styled';
import { DEFAULT_ZOOM_FACTOR, ORIGINAL_CROP, TOOLS_IDS } from 'utils/constants';
import toPrecisedFloat from 'utils/toPrecisedFloat';
import getZoomFitFactor from 'utils/getZoomFitFactor';
import { MoveDownOutline, MoveUpOutline } from '@scaleflex/icons';
import { DEFAULT_CROP_PRESETS } from './Crop.constants';
import CropPresetGroupsList from './CropPresetGroupsFolder';
import CropPresetItem from './CropPresetItem';
import {
  StyledOpenMenuButton,
  StyledMenu,
  StyledToolsBarItemButtonWrapper,
  StyledCropItems,
  StyledCustomCropItems,
  StyledApplyButton,
  StyledMeasureLabel,
  StyledMeasureSwitch,
  StyledCropMeasureContainer,
} from './Crop.styled';
import { StyledResizeInput } from '../Resize/Resize.styled';

const CropPresetsOption = ({ anchorEl, onClose }) => {
  const {
    dispatch,
    t,
    adjustments: {
      crop: { ratio: appliedRatio, ratioTitleKey, ratioFolderKey } = {},
    } = {},
    shownImageDimensions,
    showMeasure,
    config,
    theme,
  } = useStore();
  const currentRatio = appliedRatio || ORIGINAL_CROP; // we consider original as default one if no ratio has been set.
  const cropConfig = config[TOOLS_IDS.CROP];
  const isPhoneScreen = usePhoneScreen();
  const [customCrop, setCustomCrop] = useState({ w: null, h: null });
  const allPresets = useMemo(() => {
    const {
      // presetsItems = [],
      // presetsFolders = [],
      lockCropAreaAt,
    } = cropConfig;
    const defaultPresets = lockCropAreaAt
      ? DEFAULT_CROP_PRESETS.filter((item) => !item.hide?.({ lockCropAreaAt }))
      : DEFAULT_CROP_PRESETS;
    return [...defaultPresets];
  }, [cropConfig]);

  const changeCropRatio = (e, newCropRatio, cropProps) => {
    e.stopPropagation();

    const newCrop = {
      ratio: newCropRatio,
      ratioTitleKey: cropProps.ratioTitleKey,
      ratioGroupKey: cropProps.ratioGroupKey,
      ratioFolderKey: cropProps.ratioFolderKey,
      noEffect: cropProps.noEffect,
    };

    dispatch({
      type: SET_CROP,
      payload: newCrop,
    });

    if (cropConfig.autoResize) {
      dispatch({
        type: SET_RESIZE,
        payload: {
          width: cropProps.width,
          height: cropProps.height,
          manualChangeDisabled: cropProps.disableManualResize,
        },
      });
      dispatch({
        type: ZOOM_CANVAS,
        payload: {
          factor:
            cropProps.width > shownImageDimensions.width ||
            cropProps.height > shownImageDimensions.height
              ? getZoomFitFactor(shownImageDimensions, cropProps)
              : DEFAULT_ZOOM_FACTOR,
        },
      });
    }
    onClose();
  };

  const handleChangeCustomCrop = (e) => {
    const { name, value } = e.target;
    if (name === 'width') {
      setCustomCrop((state) => ({ ...state, w: value }));
    } else {
      setCustomCrop((state) => ({ ...state, h: value }));
    }
  };

  const handleApplyCustomCrop = (e) => {
    e.stopPropagation();
    dispatch({
      type: SET_CROP,
      payload: {
        ratio: toPrecisedFloat(customCrop.w / customCrop.h),
        ratioTitleKey: `Portrait (${customCrop.w}x${customCrop.h})`,
        ratioGroupKey: undefined,
        ratioFolderKey: undefined,
        noEffect: false,
      },
    });

    onClose();
  };

  const renderPreset = ({
    titleKey,
    descriptionKey,
    ratio,
    width,
    height,
    groups,
    icon: Icon,
    disableManualResize,
    noEffect,
  }) =>
    groups ? (
      <CropPresetGroupsList
        key={titleKey}
        titleKey={titleKey}
        groups={groups}
        Icon={Icon}
        theme={theme}
        onItemSelect={changeCropRatio}
        t={t}
        disableManualResize={disableManualResize}
      />
    ) : (
      <CropPresetItem
        key={ratio}
        ratio={ratio ?? toPrecisedFloat(width / height)}
        titleKey={titleKey}
        t={t}
        description={t(descriptionKey)}
        Icon={Icon}
        isActive={
          currentRatio === (ratio ?? toPrecisedFloat(width / height)) &&
          !ratioFolderKey
        }
        theme={theme}
        width={width}
        height={height}
        onClick={changeCropRatio}
        disableManualResize={disableManualResize}
        noEffect={noEffect}
      />
    );

  const toolTitleKey = ratioTitleKey || 'cropTool';

  const handleSwitch = () => {
    dispatch({
      type: SHOW_MEASURE,
      payload: {
        enabled: !showMeasure,
      },
    });
  };

  return (
    <>
      <StyledToolsBarItemButtonWrapper>
        <StyledToolsBarItemButtonLabel
          className="FIE_crop-tool-label FIE_selected-crop-preset-label"
          isPhoneScreen={isPhoneScreen}
        >
          {t(toolTitleKey)}
        </StyledToolsBarItemButtonLabel>
        <StyledOpenMenuButton
          className="FIE_crop-presets-opener-button"
          color="link-secondary"
          size="lg"
        >
          {anchorEl ? (
            <MoveUpOutline size={10} />
          ) : (
            <MoveDownOutline size={10} />
          )}
        </StyledOpenMenuButton>
      </StyledToolsBarItemButtonWrapper>
      {anchorEl && (
        <StyledCropItems className="FIE_crop-items">
          <StyledMenu>{allPresets.map(renderPreset)}</StyledMenu>
        </StyledCropItems>
      )}
      {anchorEl && (
        <StyledCustomCropItems className="FIE_crop-items">
          <StyledResizeInput
            className="FIE_custom-crop"
            value={customCrop.w}
            name="width"
            onChange={handleChangeCustomCrop}
            inputMode="numeric"
            title="W"
            label="W"
            inputProps={{ type: 'number' }}
            size="sm"
            iconEnd=""
            placeholder="Width"
          />
          <StyledResizeInput
            className="FIE_custom-crop"
            value={customCrop.h}
            name="height"
            onChange={handleChangeCustomCrop}
            inputMode="numeric"
            title="H"
            label="H"
            inputProps={{ type: 'number' }}
            size="sm"
            iconEnd=""
            placeholder="Height"
          />
          <StyledApplyButton
            size="sm"
            disabled={customCrop.w <= 0 || customCrop.h <= 0}
            onClick={handleApplyCustomCrop}
          >
            Apply
          </StyledApplyButton>
        </StyledCustomCropItems>
      )}

      {anchorEl && (
        <StyledCropMeasureContainer className="FIE_crop-measurement">
          <StyledMeasureLabel>Show measurements</StyledMeasureLabel>
          <StyledMeasureSwitch
            size="sm"
            color="#186DE2"
            checked={showMeasure}
            onChange={handleSwitch}
          />
        </StyledCropMeasureContainer>
      )}
    </>
  );
};

CropPresetsOption.defaultProps = {
  anchorEl: null,
};

CropPresetsOption.propTypes = {
  onClose: PropTypes.func.isRequired,
  anchorEl: PropTypes.instanceOf(HTMLElement),
};

export default CropPresetsOption;
