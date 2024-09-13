import { faGear, faStore } from '@fortawesome/free-solid-svg-icons';
import ElButtonIcon from '../../../utils/Ui/ElButtonIcon';
import ElIcone from '../../../utils/Ui/ElIcon';
import { useDispatch, useSelector } from 'react-redux';
import { setContext } from '../../../store/reducers/querys';
import { RootState } from '../../../store/store';

const PrimaryAuxSidebar = () => {
  const { context } = useSelector((state: RootState) => {
    return state.urlQueryControlSlice;
  });
  const dispatch = useDispatch();
  const changeGlobalContext = (menuName: string) => {
    dispatch(setContext(menuName));
  };
  return (
    <>
      <div className="primary-aux-sidebar">
        <ul className="main-menu">
          <li>
            <ElButtonIcon
              icon="pi-hourglass"
              text="Sections"
              onClick={changeGlobalContext}
              className={context === 'Sections' ? 'active' : ''}
            />
          </li>
          <li>
            <ElButtonIcon
              text="Settings"
              onClick={changeGlobalContext}
              className={context === 'Settings' ? 'active' : ''}
            >
              <ElIcone icon={faGear} />
            </ElButtonIcon>
          </li>
          <li>
            <ElButtonIcon
              text="Apps"
              onClick={changeGlobalContext}
              className={context === 'Apps' ? 'active' : ''}
            >
              <ElIcone icon={faStore} />
            </ElButtonIcon>
          </li>
        </ul>
      </div>
    </>
  );
};
export default PrimaryAuxSidebar;
