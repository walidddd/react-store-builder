interface SaveButton {
  disabled?: boolean;
  text: string;
  onClick?: () => void;
  className?: string;
}

const ElSaveButton: React.FC<SaveButton> = ({
  disabled,
  text,
  onClick,
  className,
}) => {
  return (
    <>
      <button
        className={`save-changes disabled ${className ? className : ''}`}
        disabled={disabled}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
};

export default ElSaveButton;
