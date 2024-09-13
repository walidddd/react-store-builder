import React, { useEffect, useState, ChangeEvent } from 'react';

interface InputCustomCssProps {
  initialCssValue: string;
  onCssChange?: (css: string) => void;
}

const InputCustomCss: React.FC<InputCustomCssProps> = ({
  initialCssValue,
  onCssChange,
}) => {
  const [cssValue, setCssValue] = useState(initialCssValue);

  useEffect(() => {
    setCssValue(initialCssValue);
  }, [initialCssValue]);

  const handleCssChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setCssValue(value);
    if (onCssChange) {
      onCssChange(value);
    }
  };

  return (
    <div className="input-custom-css">
      <label htmlFor="custom-css-textarea" className="tl-title mb-2">
        Enter Custom CSS:
      </label>

      <textarea
        id="custom-css-textarea"
        className="input-custom-css__textarea"
        value={cssValue}
        onChange={handleCssChange}
        placeholder="Type your CSS here..."
        rows={10}
      />
    </div>
  );
};

export default InputCustomCss;
