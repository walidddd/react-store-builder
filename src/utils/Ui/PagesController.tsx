import React, { useState, useEffect, useRef } from 'react';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TlInput from '../MagicLexTools/TlInput';

interface pagesControllerProps {
  className?: string;
  onChangePage?: (path: string) => void;
  data?: Array<{ name: string; path: string }>;
  activePage: string;
}

const PagesController: React.FC<pagesControllerProps> = ({
  className,
  onChangePage,
  data,
  activePage,
}) => {
  const [statueOptions, updateStatueOptions] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [valueSearch, updateValueInput] = useState('');

  const changeInputSearch = (value: string) => {
    updateValueInput(value);
  };

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

  const handlePageClick = (path: string) => {
    if (onChangePage) {
      onChangePage(path);
    }
    updateStatueOptions(false);
  };

  const activePageName = data?.find((page) => page.path === activePage)?.name;

  return (
    <div
      ref={ref}
      className={`el-setting-options pages-controller flex ${className ? className : ''}`}
    >
      <button onClick={fadeToggle} className="button-toggle">
        <i className="pi pi-tags" style={{ fontSize: '1rem' }}></i>
        <span className="title-page">
          {activePageName || 'Default product'}
        </span>
        <FontAwesomeIcon icon={faAngleDown} />
      </button>

      {statueOptions && (
        <div className="body-el-settings-options">
          <TlInput
            value={valueSearch}
            className="search-input"
            onChange={changeInputSearch}
            placeholder="Search online store"
          />
          <ul style={{ padding: '6px 0' }}>
            {data?.map((page, index) => (
              <li key={index} onClick={() => handlePageClick(page.path)}>
                <a className={activePage === page.path ? 'active' : ''}>
                  <i className="pi pi-tags" style={{ fontSize: '1rem' }}></i>
                  <span>{page.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PagesController;
