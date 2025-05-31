/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { usePhoneScreen, useStore } from 'hooks';
import { Menu } from '@scaleflex/icons';
import CloseButton from './CloseButton';
import SaveButton from './SaveButton';
import ResetButton from './ResetButton';
import UndoButton from './UndoButton';
import RedoButton from './RedoButton';
import ImageDimensionsAndDisplayToggle from './ImageDimensionsAndDisplayToggle';
import {
  StyledTopbar,
  StyledFlexCenterAlignedContainer,
  StyledMainButtonsWrapper,
  StyledControlButtonsWrapper,
  StyledHistoryButtons,
  StyledMenuIconButton,
  StyledActionButtons,
} from './Topbar.styled';
import BackButton from './BackButton';

const Topbar = ({ toggleMainMenu, children }) => {
  const {
    config: { showBackButton },
  } = useStore();

  const isPhoneScreen = usePhoneScreen(320);

  return (
    <StyledTopbar className="FIE_topbar" isPhoneScreen={isPhoneScreen}>
      <StyledControlButtonsWrapper>
        <StyledHistoryButtons className="FIE_topbar-history-buttons">
          <UndoButton margin="0" showBackButton={showBackButton} />
          <RedoButton margin="0" showBackButton={showBackButton} />
          <ResetButton margin="0" showBackButton={showBackButton} />
        </StyledHistoryButtons>

        {showBackButton ? <SaveButton /> : <CloseButton />}
      </StyledControlButtonsWrapper>
      <StyledMainButtonsWrapper className="FIE_topbar-buttons-wrapper">
        <StyledMenuIconButton
          className="FIE_tabs_toggle_btn"
          size={isPhoneScreen ? 'sm' : 'lg'}
          color="basic"
          onClick={() => toggleMainMenu(true)}
        >
          {(props) => <Menu {...props} />}
        </StyledMenuIconButton>
        <StyledActionButtons>
          {children}
          {showBackButton ? <BackButton /> : <SaveButton />}
        </StyledActionButtons>
      </StyledMainButtonsWrapper>

      <StyledFlexCenterAlignedContainer
        className="FIE_topbar-center-options"
        showBackButton={showBackButton}
      >
        <ImageDimensionsAndDisplayToggle
          showBackButton={showBackButton}
          isPhoneScreen={isPhoneScreen}
        />
      </StyledFlexCenterAlignedContainer>
    </StyledTopbar>
  );
};

Topbar.defaultProps = {
  toggleMainMenu: () => {},
  children: <div />,
};

Topbar.propTypes = {
  toggleMainMenu: PropTypes.func,
  children: PropTypes.node,
};

export default Topbar;
