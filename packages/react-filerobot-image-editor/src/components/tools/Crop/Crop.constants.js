/** External Dependencies */
import Custom from '@scaleflex/icons/custom';
// import Ellipse from '@scaleflex/icons/ellipse';
// import Landscape from '@scaleflex/icons/landscape';
import Portrait from '@scaleflex/icons/portrait';
import ImageOutline from '@scaleflex/icons/image-outline';

/** Internal Dependencies */
import { CUSTOM_CROP, ORIGINAL_CROP } from 'utils/constants';
import toPrecisedFloat from 'utils/toPrecisedFloat';

export const DEFAULT_CROP_PRESETS = [
  {
    titleKey: 'custom',
    ratio: CUSTOM_CROP,
    icon: Custom,
    hide: ({ lockCropAreaAt } = {}) => lockCropAreaAt,
  },
  {
    titleKey: 'original',
    ratio: ORIGINAL_CROP,
    icon: ImageOutline,
  },
  // {
  //   titleKey: 'landscape',
  //   descriptionKey: '16:9',
  //   ratio: toPrecisedFloat(16 / 9),
  //   icon: Landscape,
  // },
  {
    titleKey: 'Portrait (35x45)',
    descriptionKey: '',
    ratio: toPrecisedFloat(35 / 45),
    icon: Portrait,
  },
  {
    titleKey: 'Portrait (40x50)',
    descriptionKey: '',
    ratio: toPrecisedFloat(40 / 50),
    icon: Portrait,
  },
  {
    titleKey: 'Portrait (50x70)',
    descriptionKey: '',
    ratio: toPrecisedFloat(50 / 70),
    icon: Portrait,
  },
  {
    titleKey: 'Portrait (40x60)',
    descriptionKey: '',
    ratio: toPrecisedFloat(40 / 60),
    icon: Portrait,
  },
  {
    titleKey: 'Portrait (30x40)',
    descriptionKey: '',
    ratio: toPrecisedFloat(30 / 40),
    icon: Portrait,
  },

  // {
  //   titleKey: 'ellipse',
  //   ratio: ELLIPSE_CROP,
  //   icon: Ellipse,
  // },
];
