/** External Dependencies */
import styled from 'styled-components';
import Label from '@scaleflex/ui/core/label';
import { Color as PC } from '@scaleflex/ui/utils/types/palette';
import { FontVariant as FV } from '@scaleflex/ui/utils/types/typography';

const StyledTabItem = styled.div(
  ({ theme }) => `
    width: 64px;
    min-height: 42px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    background: ${theme.palette[PC.BackgroundStateless]};
    align-items: center;
    justify-content: center;
      box-shadow: 6px 8px 12px 0px rgba(146, 166, 188, 0.14);

    [data-phone='true'] & {
      margin-bottom: 0;
      height: 50px;
      border-radius: 0;
    }

    svg {
      color: ${theme.palette[PC.IconsPrimary]};
    }

    &,
    * {
      cursor: pointer;
    }

    &:hover {
      background: ${theme.palette['bg-primary-active']};
    }

    &[aria-selected='true'] {
      background: ${theme.palette['bg-primary-active']};

      * {
        color: ${theme.palette['accent-primary-active']};
      }
    }
  `,
);

const StyledTabItemLabel = styled(Label)(
  ({ theme }) => `
  color: ${theme.palette[PC.TextPrimary]};
  ${theme.typography.font[FV.LabelSmall]};
  font-size: 10px;
  line-height: 14px;

  span {
    white-space: normal;
  }

  [data-phone='true'] & {
    font-size: 10px;
  }
`,
);

export { StyledTabItem, StyledTabItemLabel };
