import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface Props {
  icon: IconProp;
}

const MyCustomIconComponent: React.FC<Props> = ({ icon }) => {
  return (
    <div>
      <FontAwesomeIcon icon={icon} />
    </div>
  );
};

export default MyCustomIconComponent;
