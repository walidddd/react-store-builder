const fields: any = {
  checkbox: {
    componentName: 'TlCheckBox',
  },
  text: {
    componentName: 'TlInput',
  },
  radio: {
    componentName: 'TlOptionsRadio',
  },
  select: {
    componentName: 'TlOptionsLabel',
  },
  color: {
    componentName: 'TlColorPicker',
  },
  range: {
    componentName: 'TlSliderBar',
  },
};

export const getComponentName = (fieldType: string) => {
  return fields[fieldType]?.componentName;
};
