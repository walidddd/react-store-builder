import { pages } from '../../../settings/validPagesToBuilder';
import PagesController from '../../../utils/Ui/PagesController';
import { useDispatch, useSelector } from 'react-redux';
import { updateActivePage } from '../../../store/reducers/builderSettings';
import { RootState } from '../../../store/store';

const MiddleActionsThem = () => {
  const dispatch = useDispatch();
  const { activePage } = useSelector((state: RootState) => {
    return state.storeBuilderSettings;
  });

  const handleChangePage = (path: string) => {
    // setActivePage(path);
    dispatch(updateActivePage({ activePage: path }));
    console.log(path);
  };
  return (
    <>
      <div className="middle-actions h-full">
        <PagesController
          className="h-full"
          data={pages}
          onChangePage={handleChangePage}
          activePage={activePage}
        ></PagesController>
      </div>
    </>
  );
};

export default MiddleActionsThem;
