import { useSelector } from 'react-redux';
import LayoutSidebar from '../../../layouts/LayoutSidebar';
import Settings from './Components/Settings';
import Template from './Components/Template';
import Apps from './Components/Apps';
import { RootState } from '../../../store/store';
const ControlSidebar = () => {
  const { context } = useSelector((state: RootState) => {
    return state.urlQueryControlSlice;
  });

  return (
    <>
      <LayoutSidebar className="control-sidebar ">
        {/* Left Main Controle Component */}
        {context === 'Settings' && <Settings />}
        {context === 'Sections' && <Template />}
        {context === 'Apps' && <Apps />}
      </LayoutSidebar>
    </>
  );
};

export default ControlSidebar;
