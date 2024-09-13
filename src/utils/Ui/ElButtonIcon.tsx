import { FC, ReactNode } from 'react';
import '../../assets/scss/04-utils/ElButtonIcon.scss'; // Import scss file

interface Props {
  icon?: string;
  text: string;
  className?: string; // Make className prop optional
  onClick?: (name: string) => void; // Add question mark to make onClick prop optional
  children?: ReactNode;
}

const ButtonIcon: FC<Props> = ({
  icon,
  text,
  onClick,
  className,
  children,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(text); // Only call onClick if it's provided
    }
  };

  return (
    <button
      className={`button-icon ${className ? className : ''}`}
      onClick={handleClick}
    >
      {icon && <span className={`pi ${icon}`} />}
      {children}
      {/* Assuming PrimeReact uses 'pi' class for icons */}
      <span className="label-button-icon">{text}</span>
    </button>
  );
};

export default ButtonIcon;
