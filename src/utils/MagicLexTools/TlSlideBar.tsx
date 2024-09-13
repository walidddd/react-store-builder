import React, { useState } from 'react';
import { Slider } from 'primereact/slider';

interface SliderProps {
  value: number;
  id: string;
  onChange: (value: number, id: string) => void;
  className: string;
  label: string;
  unit?: String;
}

const TlSliderBar: React.FC<SliderProps> = ({
  value,
  id,
  onChange,
  className,
  label,
  unit,
}) => {
  const [valueSlider, setValueSlider] = useState(value);
  const updateSlide = (value: number) => {
    setValueSlider(value);
    onChange(value, id);
  };
  return (
    <div className={`tl-slider ${className}`}>
      <h3 className="tl-title mb-2">{label}</h3>
      <div className="tl-slider-element ">
        <Slider
          value={valueSlider}
          onChange={(e) => updateSlide(e.value as number)}
        />

        <div className="tl-input">
          <input
            type="string"
            value={valueSlider}
            onChange={(e) => updateSlide(Number(e.target.value) as number)}
          />
          {unit ? <label htmlFor="">{unit}</label> : ''}
        </div>
      </div>
    </div>
  );
};

export default TlSliderBar;
