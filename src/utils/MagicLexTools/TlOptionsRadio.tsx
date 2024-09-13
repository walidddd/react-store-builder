import React from 'react';
import { RadioButton } from 'primereact/radiobutton';

interface RadioButtonProps {
  options: { label: string; value: any }[];
  label: string;
  value: any;
  id: string;
  onChange: (value: any, id: string) => void;
  className: string;
}

const TlOptionsRadio: React.FC<RadioButtonProps> = ({
  options,
  label,
  value,
  id,
  className,
  onChange,
}) => {
  return (
    <div className={`tl-option-radio ${className}`}>
      <h3 className="tl-title mb-2">{label}</h3>
      {options.map((option) => (
        <div
          key={option.value}
          className="tl-parent p-field-radiobutton  my-2 "
        >
          <RadioButton
            inputId={option.value + id}
            value={option.value}
            onChange={(e) => onChange(e.value, id)}
            checked={value === option.value}
          />
          <label className="tl-label" htmlFor={option.value + id}>
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default TlOptionsRadio;
