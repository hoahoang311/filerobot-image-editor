import Portrait from '@scaleflex/icons/portrait';

const toPrecisedFloat = (number, precision = 5) =>
  number && +parseFloat(number).toFixed(precision);

export default toPrecisedFloat;

export const fromIdOptionToCropPreset = (options) =>
  options?.map((item) => ({
    titleKey: item.name,
    descriptionKey: '',
    ratio: toPrecisedFloat(item.width / item.height),
    icon: Portrait,
  })) || [];

// Id Option Interface
// id: number;
// name: string;
// country: string;
// width: number;
// height: number;
// unit: 'MM' | 'PIXEL';
// description?: string;
// isActive: boolean;
// createdAt: string;
// updatedAt: string;
