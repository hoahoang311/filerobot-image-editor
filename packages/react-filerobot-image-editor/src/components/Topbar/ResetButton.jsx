/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { ResetIcon } from 'components/Icons';

/** Internal Dependencies */
import { useStore } from 'hooks';
import { StyledHistoryButton } from './Topbar.styled';
import ConfirmationModal from './ConfirmationModal';

const ResetButton = ({ margin }) => {
  const { isResetted = true, feedback, t } = useStore();

  const isBlockerError = feedback.duration === 0;

  return (
    <ConfirmationModal isReset>
      <StyledHistoryButton
        className="FIE_topbar-reset-button"
        color="basic"
        size="sm"
        disabled={isResetted || isBlockerError}
        title={t('resetOperations')}
        margin={margin}
      >
        <ResetIcon />
        Reset all
      </StyledHistoryButton>
    </ConfirmationModal>
  );
};

ResetButton.defaultProps = {
  margin: undefined,
};

ResetButton.propTypes = {
  margin: PropTypes.string,
};

export default ResetButton;
