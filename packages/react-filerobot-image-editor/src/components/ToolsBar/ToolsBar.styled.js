/** External Dependencies */
import styled, { css } from 'styled-components';
import Label from '@scaleflex/ui/core/label';
import { Color as PC } from '@scaleflex/ui/utils/types/palette';
import { FontVariant as FV } from '@scaleflex/ui/utils/types/typography';

const StyledToolsBar = styled.div`
  width: fit-content;
  margin: 0 auto;
  padding-top: 16px;
  max-width: 256px;
  max-height: 520px;

  [data-phone='true'] & {
    padding: 0;
    margin-top: 8px;
    max-height: initial;
  }
`;

const StyledToolsBarItems = styled.div`
  background-color: white;
  width: 256px;
  padding: 16px;
  border-radius: 8px;
  align-items: center;
  overflow: auto;
  scrollbar-width: none;

  ${({ isPhoneScreen }) =>
    isPhoneScreen &&
    `
    justify-content: space-between;
    padding: 12px;
    gap: 8px;
  `}
`;

const StyledToolsBarItemButton = styled.div(
  ({ theme, isPhoneScreen }) => `
    display: flex;
    gap: 6px;
    margin-top: 8px;
    border-radius: 2px;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 8px 12px;

    svg {
      color: ${theme.palette[PC.IconsPrimary]};
    }

    &,
    * {
      cursor: pointer;
    }

    &:hover {
      ${!isPhoneScreen && `background: ${theme.palette['bg-primary-active']};`}
    }

    &[aria-selected='true'] {
      ${!isPhoneScreen && `background: ${theme.palette['bg-primary-active']};`}
      border-radius: 4px;

      * {
        color: ${theme.palette['accent-primary-active']};
      }
    }

    ${
      isPhoneScreen &&
      css`
        display: flex;
        flex-direction: column;
        min-width: 52px;
        min-height: 52px;
        padding: 8px;
        gap: 4px;
      `
    }
  `,
);

const StyledToolsBarItemButtonLabel = styled(Label)(
  ({ theme, isPhoneScreen }) => css`
    color: ${theme.palette[PC.TextPrimary]};
    ${isPhoneScreen && theme.typography.font[FV.LabelExtraSmallUp]};
  `,
);

const StyledToolsBarItemOptionsWrapper = styled.div`
  position: relative;
  width: 100%;
  transition: max-height 100ms ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;

  ${(props) => `
      // max-height: ${props.hasChildren ? '56px' : 0};
      // margin: ${props.hasChildren ? '0 auto 8px' : 0};
    `};

  ${({ isPhoneScreen }) =>
    isPhoneScreen &&
    `
    max-height: unset;
    flex-direction: column;
    padding: 0 12px 8px 12px;
    gap: 8px;
    margin: 0;
  `}
`;

const StyledToolItemWrapper = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  gap: 12px;
`;

export {
  StyledToolsBar,
  StyledToolsBarItems,
  StyledToolsBarItemButton,
  StyledToolsBarItemButtonLabel,
  StyledToolsBarItemOptionsWrapper,
  StyledToolItemWrapper,
};
