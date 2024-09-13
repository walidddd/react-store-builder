import { FC } from 'react';

interface Props {
  textTitle: string;
  className?: string;
}

const ElTitleSection: FC<Props> = ({ textTitle, className }) => {
  return (
    <>
      <h2 className={`title-section ${className}`}>{textTitle}</h2>
    </>
  );
};

export default ElTitleSection;
