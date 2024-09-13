import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { listenOnMessagesFromLexEditor } from '../../../helpers/common';
import { useDispatch } from 'react-redux';
import { setQuerySection } from '../../../store/reducers/querys';
import { useEffect } from 'react';

const TemplateContent = () => {
  const dispatch = useDispatch();

  // Store Data
  const { typeOfEventOnThem } = useSelector((state: RootState) => {
    return state.storeTemplate;
  });
  useEffect(() => {
    // Listen message from lex editor
    listenOnMessagesFromLexEditor((message) => {
      const { type, action, itemId } = message;
      if (action === 'select') {
        console.log('actions', action);
        dispatch(
          setQuerySection({
            section: type === 'section' ? itemId : null,
            block: type === 'block' ? itemId : null,
          })
        );
      }
    });
  }, []);
  // https://softcomfort.shop/categories/collection-series/product/akrehamn-foam-mattress-medium/
  return (
    <>
      <main className={`template-content animate-${typeOfEventOnThem}`}>
        <div className="template">
          <iframe
            id="myIframe"
            src="https://store.shop/categories/best-sellers/product/the-conjuring-chucky-doll/?display_mode=editor"
            width="100%"
            height="100%"
          ></iframe>
        </div>
      </main>
    </>
  );
};

export default TemplateContent;
