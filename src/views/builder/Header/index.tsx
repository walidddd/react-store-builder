import RightActionsThem from './RightActionsThem';
import LeftActionsThem from './LeftActionsThem';
import MiddleActionsThem from './MiddleActionsThem';
import { useSelector } from 'react-redux';

const Header = () => {
  const loadingGlobalStatus = useSelector(
    (state: any) => state.storeBuilderSettings.loadingGlobal
  );
  return (
    <>
      <header
        className={`header ${loadingGlobalStatus ? 'loading--' + loadingGlobalStatus : ''}`}
      >
        <LeftActionsThem></LeftActionsThem>
        <MiddleActionsThem></MiddleActionsThem>
        <RightActionsThem></RightActionsThem>
      </header>
    </>
  );
};

export default Header;
