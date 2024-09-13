import React, { ReactNode, useState, useRef, useEffect } from 'react';

interface AccordionProps {
  title: string;
  children: ReactNode;
}

const AccordionTools: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<string>('0px');

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [isOpen]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion px-0">
      <div className="accordion-header px-4" onClick={toggleAccordion}>
        <h3>{title}</h3>
        <button>
          {isOpen ? (
            <i
              className="pi pi-angle-up
"
            ></i>
          ) : (
            <i
              className="pi pi-angle-down
          "
            ></i>
          )}
        </button>
      </div>
      <div
        className="accordion-content px-4"
        style={{ maxHeight: isOpen ? contentHeight : '0px' }}
        ref={contentRef}
      >
        {children}
      </div>
    </div>
  );
};

export default AccordionTools;
