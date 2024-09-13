import React from 'react';
import TlInput from '../MagicLexTools/TlInput';
import TlCheckBox from '../MagicLexTools/TlCheckBox';
import TlOptionsRadio from '../MagicLexTools/TlOptionsRadio';
import TlOptionsLabel from '../MagicLexTools/TlOptionsLabel';
import TlColorPicker from '../MagicLexTools/TlColorPicker';
import TlSliderBar from '../MagicLexTools/TlSlideBar';
import TlInputCustomCss from '../MagicLexTools/TlInputCustomCss';

interface DynamicComponentProps {
  componentName: string;
  props?: any;
  onChange: (value: number, id: string) => void;
  className: string;
  value?: any;
  name: string;
  chosen: string;
  selected: string;
}

// Define your dynamic component
const DynamicComponent: React.FC<DynamicComponentProps> = ({
  componentName,
  props,
  onChange,
  className,
  value,
  name,
  chosen,
  selected,
}) => {
  // Dynamically resolve the component based on its name
  const Component = components[componentName];

  // Render the resolved component with props
  return Component ? (
    <div>
      {name}
      {chosen}
      {selected}

      <Component
        {...props}
        onChange={onChange}
        className={className}
        value={value}
      />
    </div>
  ) : (
    <div></div>
  );
};

// Map component names to their components
const components: { [key: string]: React.FC<any> } = {
  TlInput,
  TlCheckBox,
  TlOptionsRadio,
  TlOptionsLabel,
  TlColorPicker,
  TlSliderBar,
  TlInputCustomCss,
};

export default DynamicComponent;
