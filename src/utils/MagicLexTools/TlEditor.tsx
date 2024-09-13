import React, { useState } from 'react';
import { Editor } from 'primereact/editor';

interface SliderProps {
  value: string;
  onChange: (value: any) => void;
  className?: string;
  label: string;
}

const TlSliderBar: React.FC<SliderProps> = ({
  value,
  onChange,
  className,
  label,
}) => {
  const [valueSlider, setValueSlider] = useState(value);
  const updateSlide = (value: any) => {
    setValueSlider(value);
    onChange(value);
  };

  // Custom CSS for the PrimeReact Editor component
  const customEditorStyles = `
    .ql-editor {
      font-size: 12px; /* Example font size */
    }
    .ql-toolbar {
      font-size: 12px; /* Example font size */
    }
    .ql-icon {
      font-size: 12px; /* Example font size for icons */
    }
  `;

  return (
    <div className={` ${className}`}>
      <h3 className="tl-title mb-2">{label}</h3>

      <style>{customEditorStyles}</style>

      <Editor
        className="w-100"
        value={valueSlider}
        onTextChange={(e) => updateSlide(e.htmlValue)}
      />
    </div>
  );
};

export default TlSliderBar;
