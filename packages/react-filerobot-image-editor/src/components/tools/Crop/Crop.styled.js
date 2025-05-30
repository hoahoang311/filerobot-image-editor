/** External Dependencies */
import styled, { css } from 'styled-components';
import Button from '@scaleflex/ui/core/button';
import Label from '@scaleflex/ui/core/label';
import { Accordion, MenuItem } from '@scaleflex/ui/core';
import { Color as PC } from '@scaleflex/ui/utils/types/palette';
import { FontVariant as FV } from '@scaleflex/ui/utils/types/typography';

const StyledToolsBarItemButtonWrapper = styled.div`
  display: flex;
`;

const StyledOpenMenuButton = styled(Button)`
  margin: 0 0 0 6px;
  padding: 0;
`;

const StyledMenuItemIcon = styled.div`
  svg,
  span {
    vertical-align: middle;
  }
`;

const StyledRatioDescription = styled(Label)`
  cursor: pointer;
  ${({ theme: { typography } }) => typography.font[FV.InputSm]}
`;

const StyledMenu = styled.div`
  min-width: 270px;
  border-radius: 4px;
  overflow: hidden;
  background-color: ${({ theme: { palette } }) =>
    palette[PC.BackgroundStateless]};
`;

const StyledMenuItem = styled(MenuItem)`
  display: flex;
  gap: 10px;
  justify-content: flex-start;
  align-items: center;
  border-radius: 4px;
  padding: 8px 16px;

  ${({ isAccordion }) => isAccordion && 'padding-left: 22px;'}

  ${({ isListItem }) => isListItem && 'padding: 0;'}
`;

const StyledMenuItemLabel = styled(Label)(
  ({ theme }) => css`
    color: ${theme.palette[PC.TextPrimary]};
    ${theme.typography.font[FV.InputMd]};
  `,
);

const StyledAccordion = styled(Accordion)(
  ({ theme }) => css`
    .SfxAccordionHeader-icon {
      padding-left: 0;
    }

    .SfxAccordionHeader-label {
      ${theme.typography.font[FV.LabelMediumEmphasis]};
      color: ${theme.palette[PC.TextPrimary]};
    }

    .SfxAccordionHeader-root {
      display: flex;
      flex-direction: row-reverse;
      width: fit-content;
      gap: 10px;
    }
  `,
);

const StyledCropItems = styled.div`
  position: absolute;
  right: 88px;
  top: 135px;
  width: 256px;
  border-radius: 8px;
  padding: 10px;
  background-color: white;

  > div {
    min-width: 100%;

    * {
      color: black !important;
    }
  }
`;

const StyledCustomCropItems = styled.div`
  position: absolute;
  right: 88px;
  top: 389px;
  width: 256px;
  border-radius: 8px;
  padding: 10px;
  background-color: white;
  display: flex;

  > div {
    * {
      color: black !important;
    }
  }

  gap: 8px;

  div:nth-child(1) {
    min-width: 60px;
  }

  div:nth-child(2) {
    min-width: 60px;
  }

  label {
    font-size: 10px;
  }
`;

const StyledApplyButton = styled(Button)`
  height: 24px;
  align-self: flex-end;
  background-color: #186de2;

  span {
    * {
      color: white !important;
      font-weight: 400 !important;
      font-size: 10px !important;
    }
  }
`;

export {
  StyledToolsBarItemButtonWrapper,
  StyledOpenMenuButton,
  StyledMenuItemIcon,
  StyledRatioDescription,
  StyledMenu,
  StyledMenuItem,
  StyledMenuItemLabel,
  StyledAccordion,
  StyledCropItems,
  StyledCustomCropItems,
  StyledApplyButton,
};
