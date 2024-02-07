import { useContext, useCallback, useEffect, useRef } from "react";
import { GlobalContext } from "../components/GlobalContex";
import ShowList from './ShowList';

import css from './CategList.module.less';

const CategList = () => {
  const { voyoState} = useContext(GlobalContext);
  const { found_rows, items } = voyoState.dataList;

  const scrollToRef = useRef(null);

  useEffect(() => {
    scrollToRef.current({ index: 0, animate: false, focus: true });
  });

  useEffect(() => {
    // Below is an example of using scrollTo method for setting an "initial" position of VirtualList.
    // It is a substitute for focusOnIndex, setInitialFocusIndex, and scrollToItem of enyo.
    scrollToRef.current({ index: 60, animate: false, focus: true });
  }, []);


  const getScrollTo = useCallback((scrollTo) => {
    scrollToRef.current = scrollTo;
  }, []);

  return (
    <div className={css.list}>
      <ShowList imageitems={items} total={Number(found_rows)}
        cbScrollTo={getScrollTo}
        className={css.list}
      /></div>
  );

};

export default CategList;
