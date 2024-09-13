const LayoutBuilder = ({ children, className }: any) => {
  return (
    <>
      <div className={`layout-sidebar ${className}`}>{children}</div>
    </>
  );
};

export default LayoutBuilder;
