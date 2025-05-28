/** External Dependencies */
// import {
//   FineTune,
//   Annotate,
//   CropFrame,
//   ImageFilters,
//   Watermark,
//   Resize,
// } from '@scaleflex/icons';
import { TabIconDefault } from 'components/Icons';

/** Internal Dependencies */
import { TABS_IDS } from 'utils/constants';

export const AVAILABLE_TABS = [
  {
    id: TABS_IDS.ADJUST,
    labelKey: 'adjustTab',
    icon: TabIconDefault,
  },
  {
    id: TABS_IDS.FINETUNE,
    labelKey: 'finetuneTab',
    icon: TabIconDefault,
  },
  {
    id: TABS_IDS.FILTERS,
    labelKey: 'filtersTab',
    icon: TabIconDefault,
    hideFn: ({ useCloudimage }) => useCloudimage,
  },
  {
    id: TABS_IDS.WATERMARK,
    labelKey: 'watermarkTab',
    icon: TabIconDefault,
  },
  {
    id: TABS_IDS.ANNOTATE,
    labelKey: 'annotateTabLabel',
    icon: TabIconDefault,
    hideFn: ({ useCloudimage }) => useCloudimage,
  },
  {
    id: TABS_IDS.RESIZE,
    labelKey: 'resizeTab',
    icon: TabIconDefault,
  },
];
