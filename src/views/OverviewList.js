import { useContext, useCallback, useEffect, useRef } from "react";
import { GlobalContext } from "../components/GlobalContex";
import TvsList from './TvsList';
import ShowList from './ShowList';

import css from './OverviewList.module.less';

const OverviewList = () => {
  const { overviewList } = useContext(GlobalContext);
  const { liveTvs, sections } = overviewList;
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
    <div>
      <div className={css.overviewList}>
        <TvsList imageitems={liveTvs}
          cbScrollTo={getScrollTo}
          className={css.list}
        /></div>
      {sections
        ? sections.map((it) => (
          <div className="sectionBox" key={it.id}>
            <h2>{it.name}</h2>
            <ShowList imageitems={it.content}
              cbScrollTo={getScrollTo}
              className={css.list}
            />
          </div>
        ))
        : null}
    </div>
  );

};

export default OverviewList;
