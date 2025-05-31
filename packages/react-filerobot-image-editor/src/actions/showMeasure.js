export const SHOW_MEASURE = 'SHOW_MEASURE';

const showMeasure = (state, payload) => ({
  ...state,
  showMeasure: payload.enabled,
});

export default showMeasure;
