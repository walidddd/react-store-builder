import React, { ReactNode, useState, useEffect, useRef } from 'react';

interface Option {
  name: string;
  href: string;
  icon: string;
}

interface ElSettingsOptionsProps {
  children?: ReactNode;
  options: Option[];
  headerStyle?: React.CSSProperties; // Style prop for header
  listStyle?: React.CSSProperties; // Style prop for list
}

const ElSettingsOptions: React.FC<ElSettingsOptionsProps> = ({
  children,
  options,
  headerStyle,
  listStyle,
}) => {
  const [statueOptions, updateStatueOptions] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        updateStatueOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fadeToggle = () => {
    updateStatueOptions(!statueOptions);
  };

  return (
    <div ref={ref} className="el-setting-options flex">
      <button onClick={fadeToggle}>
        <i className="pi pi-ellipsis-h" style={{ fontSize: '1rem' }}></i>
      </button>

      {statueOptions && (
        <div className="body-el-settings-options">
          {children && (
            <div className="header-el-settings-options" style={headerStyle}>
              {children}
            </div> // Apply headerStyle
          )}
          <ul style={{ padding: '6px 0' }}>
            {' '}
            {/* Apply listStyle */}
            {options.map((option: Option, index: number) => (
              <li key={index}>
                <a href={option.href} style={listStyle}>
                  <i className={option.icon}></i> <span>{option.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ElSettingsOptions;
