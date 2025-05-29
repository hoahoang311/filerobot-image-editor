/** External Dependencies */
import styled from 'styled-components';
import Input from '@scaleflex/ui/core/input';
import Select from '@scaleflex/ui/core/select';

const StyledFontFamilySelect = styled(Select)`
  width: 154px;
  border: none;
  background-color: rgba(77, 77, 77, 0.08);
  border-radius: 6px;
`;

const StyledFontSizeInput = styled(Input)`
  width: 64px;
  border: none;
  background-color: rgba(77, 77, 77, 0.08);
  border-radius: 6px;
`;

const StyledToolsWrapper = styled.div`
  display: flex;
`;

const StyledFontWrapper = styled.div`
  display: flex;
  gap: 6px;
`;

export {
  StyledFontFamilySelect,
  StyledFontSizeInput,
  StyledToolsWrapper,
  StyledFontWrapper,
};
