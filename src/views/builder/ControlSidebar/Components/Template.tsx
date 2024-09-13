import { useDispatch } from 'react-redux';
import {
  setQuerySection,
  QuerySectionPayload,
} from '../../../../store/reducers/querys';
import {
  makeAnimateWhenChange,
  onSelectItem,
  onDropItem,
} from '../../../../store/reducers/template';
import LayersMenu from './LayersMenu';
import ElTitleSection from '../../../../utils/Ui/ElTitleSection';
import productMockSchema from '../../../../_mocks_/schema/product.json';
import globalSettingsData from '../../../../_mocks_/schema/config/settings_values.json';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Layout Template Layers / Header / Page Sections / Footer
const Template = () => {
  // Date
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // Logic for layersMenu for template
  const [schemaValuesData, updateSchemaValuesTemplate]: any =
    useState(productMockSchema);

  // Actions
  const onSelect = (querySection: QuerySectionPayload) => {
    console.log('select item');
    dispatch(setQuerySection(querySection)); // Query Store
    dispatch(onSelectItem(querySection)); // Template store
  };

  const onDrop = (newSchema: object) => {
    updateSchemaValuesTemplate(newSchema);
    dispatch(onDropItem(newSchema));
    dispatch(makeAnimateWhenChange({ typeOfEventOnThem: 'drop' }));
  };
  const dragUpdates = (newSchema: object) => {
    dispatch(onDropItem(newSchema));
  };

  const dragAnyItem = () => {
    dispatch(makeAnimateWhenChange({ typeOfEventOnThem: 'drag' }));
  };

  // Global Settings
  const globalSettings = globalSettingsData.current;

  const entries = Object.entries(globalSettings.sections);

  const midIndex = Math.ceil(entries.length / 2);

  const entriesHead = entries.slice(0, midIndex);
  const entriesLast = entries.slice(midIndex);

  const globalLayersHead = {
    ...globalSettings,
    sections: Object.fromEntries(entriesHead),
  };
  const globalLayersLast = {
    ...globalSettings,
    sections: Object.fromEntries(entriesLast),
  };

  return (
    <>
      <ElTitleSection textTitle={t('menuTitles.template')} className="px-2" />
      <LayersMenu
        id="head-layers"
        schemaValues={globalLayersHead}
        className="main-border-bottom p-2  py-3"
        onClickItem={onSelect}
      ></LayersMenu>

      <LayersMenu
        title="Template"
        id="template"
        schemaValues={schemaValuesData}
        className="main-border-bottom p-2 py-3"
        onClickItem={onSelect}
        onDropItem={onDrop}
        dragUpdates={dragUpdates}
        onDragBlock={dragAnyItem}
        onDragSection={dragAnyItem}
      ></LayersMenu>

      <LayersMenu
        id="last-layers"
        schemaValues={globalLayersLast}
        className="main-border-bottom p-2  py-3"
        onClickItem={onSelect}
      ></LayersMenu>

      {/* <LayersMenu onClickItem={changeActiveItem} className="px-2"></LayersMenu> */}
    </>
  );
};

export default Template;
