import { useEffect, useState } from 'react';
import LayoutSidebar from '../../../layouts/LayoutSidebar';
import AccordionTools from '../../../utils/Accordions/AccordionTools';
import ElTitleSection from '../../../utils/Ui/ElTitleSection';
import TlMagic from './components/TlMagic';

// Mock Data
import customizeFields from '../../../_mocks_/schema/customizeFields.json';
import productMockSchema from '../../../_mocks_/schema/product.json';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import TlInputCustomCss from '../../../utils/MagicLexTools/TlInputCustomCss';

const CustomizeSidebar = () => {
  // Data
  const { block } = useSelector((state: RootState) => {
    return state.urlQueryControlSlice;
  });
  const [sectionSettings, updateSetting] = useState(
    productMockSchema.sections.main.blocks.title.settings
  );
  const [customCss, setCustomCss] = useState('');

  // Methods
  // Tl Magic logic
  const onChangeField = (value: any, id: string) => {
    updateSetting((prevObject) => ({
      ...prevObject,
      [id]: value,
    }));
  };

  useEffect(() => {
    console.log('Updated myObject:', sectionSettings);
  }, [sectionSettings]); // Run this effect whenever myObject changes

  const getSetting = (item: any) => {
    return customizeFields.blocks.filter((block: any) => {
      return block.type === item;
    })[0]?.settings;
  };

  return (
    <>
      <LayoutSidebar className="customize-slider overflow-auto">
        {/* ?context= theme is  settings && app && main*/}
        <ElTitleSection textTitle="Product Page" className="px-4 mb-3" />
        {getSetting(block)?.length ? (
          <TlMagic
            fields={getSetting(block)}
            values={sectionSettings}
            onChangeField={onChangeField}
            className={'px-4'}
          />
        ) : (
          <p className="px-4">No customization to this item</p>
        )}

        <div className="mt-4">
          <AccordionTools title="Theme Settings">
            <TlMagic
              fields={customizeFields.settings}
              values={sectionSettings}
              onChangeField={onChangeField}
            />
          </AccordionTools>

          <AccordionTools title="Custom css">
            <TlInputCustomCss
              onCssChange={(cssValue) => {
                setCustomCss(cssValue);
              }}
              initialCssValue={customCss}
            ></TlInputCustomCss>
          </AccordionTools>
        </div>
      </LayoutSidebar>
    </>
  );
};

export default CustomizeSidebar;
