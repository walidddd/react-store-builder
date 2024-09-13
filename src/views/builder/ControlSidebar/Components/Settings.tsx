import { useState } from 'react';
import customizeFields from '../../../../_mocks_/schema/config/settings_feilds.json';
import schemaValues from '../../../../_mocks_/schema/config/settings_values.json';
import ElTitleSection from '../../../../utils/Ui/ElTitleSection';
import TlMagic from '../../CustomizeSidebar/components/TlMagic';
import AccordionTools from '../../../../utils/Accordions/AccordionTools';
import { useTranslation } from 'react-i18next';

const Settings = () => {
  const { t } = useTranslation();

  // Settings
  const [sectionSettings, updateSetting] = useState(schemaValues);
  // Tl Magic logic
  const onChangeField = (value: any, id: string) => {
    updateSetting((prevObject) => ({
      ...prevObject,
      [id]: value,
    }));
  };

  return (
    <>
      <ElTitleSection textTitle={t('menuTitles.settings')} className="px-2" />
      <div className="overflow-auto">
        {customizeFields.map((field) => {
          return (
            field.settings?.length && (
              <AccordionTools title={field.name} key={field.name}>
                <TlMagic
                  fields={field.settings}
                  values={sectionSettings}
                  onChangeField={onChangeField}
                />
              </AccordionTools>
            )
          );
        })}
      </div>
    </>
  );
};

export default Settings;
