import { useState } from 'react';
import ElSaveButton from '../../../utils/Ui/ElSaveButton';
import ScreenOptions from './Components/ScreenOptions';

// Store
import { RootState } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { updateScreenSize } from '../../../store/reducers/builderSettings';
import { SAVE_TEMPLATE } from '../../../helpers/global-variables';
import { useTranslation } from 'react-i18next';

const RightActionsThem = () => {
  const { t } = useTranslation();

  // Data
  const dispatch = useDispatch();
  const { screenSize } = useSelector((state: RootState) => {
    return state.storeBuilderSettings;
  });
  const statusSaveTemplate = true;

  // Methods
  const saveTemplate = () => {
    dispatch({
      type: SAVE_TEMPLATE,
    });
  };

  const onChangeScreenOptions = (option: string) => {
    dispatch(updateScreenSize({ screenSize: option }));
  };
  return (
    <>
      <div className="right-actions">
        <ScreenOptions
          selectedOption={screenSize}
          onChange={onChangeScreenOptions}
          className="h-full flex align-center"
        ></ScreenOptions>
        <ElSaveButton
          className="h-full"
          disabled={!statusSaveTemplate}
          text={t('buttons.save')}
          onClick={saveTemplate}
        ></ElSaveButton>
      </div>
    </>
  );
};

export default RightActionsThem;
