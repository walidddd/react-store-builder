const LayoutBuilder = ({ children, className }: any) => {
  return (
    <>
      <div className={`Layout-Global ${className}`}>{children}</div>
    </>
  );
};

export default LayoutBuilder;
