import React from 'react';
import { Checkbox } from 'primereact/checkbox';

interface TlCheckBoxProps {
  onChange?: (checked: boolean, id: string) => void;
  value?: boolean;
  label?: string;
  id?: string;
  className?: string;
}

const TlCheckBox: React.FC<TlCheckBoxProps> = ({
  onChange = () => {}, // Provide a default function to prevent destructuring null or undefined
  value,
  id,
  label,
  className,
}) => {
  return (
    <div className={`tl-checkbox tl-parent ${className}`}>
      <Checkbox
        inputId={id}
        onChange={(e) =>
          onChange(e.checked === undefined ? false : e.checked, id ? id : '')
        }
        checked={value !== undefined ? value : false}
        className="p-checkbox "
      />
      <label className="tl-label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default TlCheckBox;
