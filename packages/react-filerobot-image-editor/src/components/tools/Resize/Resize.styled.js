/** External Dependencies */
import styled, { css } from 'styled-components';
import IconButton from '@scaleflex/ui/core/icon-button';
import InputGroup from '@scaleflex/ui/core/input-group';
import { Color as PC } from '@scaleflex/ui/utils/types/palette';
import { FontVariant as FV } from '@scaleflex/ui/utils/types/typography';
import { Button } from '@scaleflex/ui/core';

const StyledResizeWrapper = styled.div`
  display: flex;
  justify-content: ${({ alignment }) => alignment || 'center'};
  align-items: flex-end;
  justify-content: space-between;
  gap: 3px;
  flex-wrap: wrap;

  .SfxLabel-root {
    position: absolute;
    z-index: 99;
    font-size: 10px;
  }
`;

const StyledResizeInput = styled(InputGroup)(
  ({ theme }) => css`
    width: 79px;
    border: none;
    background-color: #f1f1f1;
    height: 24px;
    padding-block: 0;
    padding-inline: 8px;
    border-radius: 6px;

    .SfxInput-Base {
      width: 100%;
      min-width: 100%;
      max-width: 100%;
      font-size: 12px;
      margin-left: 4px;
    }

    span {
      color: ${theme.palette[PC.TextSecondary]};
      ${theme.typography.font[FV.LabelMedium]};
      font-size: 12px;
    }

    > div {
      gap: 0;
    }
  `,
);

const StyledRatioLockIcon = styled(IconButton)`
  padding: 9px 4px;
  svg {
    margin-bottom: 1px;
  }
`;

const StyledResetButton = styled(IconButton)`
  padding: 9px 4px;
`;

export {
  StyledResizeWrapper,
  StyledResizeInput,
  StyledRatioLockIcon,
  StyledResetButton,
};
