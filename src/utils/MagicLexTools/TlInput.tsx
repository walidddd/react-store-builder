import React, { useState } from 'react';

interface TlInputProps {
  value: string;
  id?: string;
  onChange: (value: string, id: string) => void;
  className?: string;
  label?: string;
  placeholder?: string;
}

const TlInput: React.FC<TlInputProps> = ({
  value,
  id,
  onChange,
  className,
  label,
  placeholder,
}) => {
  const [valueSlider, setValueSlider] = useState(value);
  const updateSlide = (value: string) => {
    setValueSlider(value);
    if (id) {
      onChange(value, id);
    }
  };
  return (
    <div className={` ${className ? className : ''}`}>
      {label && <h3 className="tl-title mb-2">{label}</h3>}

      <input
        type="text"
        placeholder={placeholder}
        className="tl-input w-100"
        value={valueSlider}
        onChange={(e) => updateSlide(e.target.value as string)}
      />
    </div>
  );
};

export default TlInput;
