import { faDatabase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColorPicker } from 'primereact/colorpicker';

interface TlColorProps {
  value?: string;
  id?: string;
  label?: string;
  className?: string;
  onChange: (value: string, id: string) => void;
}

const TlColorPicker: React.FC<TlColorProps> = ({
  value,
  label,
  className,
  onChange,
  id,
}) => {
  const changeColor = (color: any) => {
    if (id) onChange(color.value, id);
  };

  return (
    <div
      className={`tl-color-picker card  justify-content-center ${className}`}
    >
      <ColorPicker value={value} onChange={changeColor} />
      <div className="tl-color-picker-main">
        <label htmlFor="">{label}</label>
        <span>{value}</span>
      </div>
      <button className="button-none-default">
        <FontAwesomeIcon icon={faDatabase} />
      </button>
    </div>
  );
};

export default TlColorPicker;
