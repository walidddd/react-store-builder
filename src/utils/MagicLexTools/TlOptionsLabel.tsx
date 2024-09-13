import React from 'react';
import { RadioButton } from 'primereact/radiobutton';
import TlOptionsRadio from './TlOptionsRadio';

interface RadioButtonProps {
  options: { label: string; value: any }[];
  label: string;
  value: any;
  onChange: (value: any, id: string) => void;
  className: string;
  id: string;
}

const TlOptionsLabel: React.FC<RadioButtonProps> = ({
  options,
  label,
  value,
  id,
  className,
  onChange,
}) => {
  return (
    <div>
      {options.length <= 3 ? (
        <div className={`tl-option-radio tl-option-label ${className}`}>
          <h3 className="tl-title mb-2">{label}</h3>
          <div className="tl-option-labels-chosen">
            {options.map((option) => (
              <div
                key={option.value}
                className={`tl-parent p-field-radiobutton  my-2  ${option.value === value && 'active'}`}
              >
                <RadioButton
                  inputId={option.value + id}
                  name={id}
                  value={option.value}
                  onChange={(e) => onChange(e.value, id)}
                  checked={value === option.value}
                />
                <label htmlFor={option.value + id} className={`tl-label`}>
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <TlOptionsRadio
          options={options}
          label={label}
          id={id}
          className={className}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default TlOptionsLabel;
