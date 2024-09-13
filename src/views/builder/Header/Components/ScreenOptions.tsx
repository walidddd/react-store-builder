import React from 'react';
import { RadioButton } from 'primereact/radiobutton';

interface RadioButtonProps {
  selectedOption?: any;
  onChange?: (value: any) => void;
  className?: string;
}

const ScreenOptions: React.FC<RadioButtonProps> = ({
  selectedOption,
  className,
  onChange,
}) => {
  const options = [
    {
      value: 'full-screen',
      icon: 'pi pi-desktop',
    },
    {
      value: 'md',
      icon: 'pi pi-tablet',
    },
    {
      value: 'sm',
      icon: 'pi pi-mobile',
    },
  ];
  return (
    <div className={`tl-option-radio tl-option-label ${className}`}>
      <div className="tl-option-labels-chosen">
        {options.map((option) => (
          <div
            key={option.value}
            className={`tl-parent p-field-radiobutton  my-2  ${option.value === selectedOption && 'active'}`}
          >
            <RadioButton
              inputId={option.value}
              value={option.value}
              onChange={(e) => (onChange ? onChange(e.value) : null)}
              checked={selectedOption === option.value}
            />
            <label htmlFor={option.value} className={`tl-label`}>
              <i className={option.icon}></i>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScreenOptions;
