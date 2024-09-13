import LayoutBuilder from './layouts/LayoutApp';
import HeaderComponent from './views/builder/Header';
import PrimaryAuxSidebar from './views/builder/PrimaryAuxSidebar';
import TemplateContent from './views/builder/TemplateContent/TemplateContent';
import ControlSidebar from './views/builder/ControlSidebar';
import CustomizeSidebar from './views/builder/CustomizeSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { setContext, setQuerySection } from './store/reducers/querys';

import { AppDispatch, RootState } from './store/store';
import { Toast } from 'primereact/toast';

import ToastContainer from './utils/Ui/ToastContainer';
import { fetchSchemaData } from './store/asynchronousActions';

function App() {
  const toastTopRight = useRef<Toast>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { screenSize } = useSelector((state: RootState) => {
    return state.storeBuilderSettings;
  });
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    // Set sections and blocks values
    const section = queryParams.get('sections') || 'main-product';
    const block = queryParams.get('block') || '';
    setQuerySection({ section: section, block: block });

    // Set Context
    const context = queryParams.get('context') || 'Sections';
    dispatch(setContext(context));

    dispatch(fetchSchemaData());

    // Clean up function to handle unmounting if needed
    return () => {
      // You can dispatch any cleanup actions here if needed
    };
  }, [dispatch]);

  return (
    <div>
      <LayoutBuilder className={screenSize}>
        <HeaderComponent></HeaderComponent>
        <PrimaryAuxSidebar></PrimaryAuxSidebar>
        <ControlSidebar></ControlSidebar>
        {/* Start template content */}
        <TemplateContent></TemplateContent>
        {/* Start  right side bar */}
        <CustomizeSidebar></CustomizeSidebar>
        <ToastContainer></ToastContainer>
      </LayoutBuilder>
    </div>
  );
}

export default App;
