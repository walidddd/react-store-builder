import ElTitleSection from '../../../../utils/Ui/ElTitleSection';
import { useTranslation } from 'react-i18next';

const Apps = () => {
  const { t } = useTranslation();
  return (
    <>
      <ElTitleSection textTitle={t('menuTitles.apps')} className="px-2" />
    </>
  );
};

export default Apps;
