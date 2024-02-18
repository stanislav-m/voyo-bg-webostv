import { useContext, useCallback, useEffect, useRef } from "react";
import { GlobalContext } from "../components/GlobalContex";
import TvsList from "./TvsList";
import ShowList from "./ShowList";

import css from "./OverviewList.module.less";

const OverviewList = () => {
  const { voyoState } = useContext(GlobalContext);
  const { liveTvs, sections } = voyoState.dataList;
  const scrollToRef = useRef(null);

  console.log(liveTvs, sections);

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
    <div className={css.overviewList}>
      <div className={css.content}>
        <TvsList
          imageitems={liveTvs}
          cbScrollTo={getScrollTo}
          className={css.list}
        />
      </div>
      {sections
        ? sections.map((it) => (
            <div className={css.content}
              key={it.id}>
              <h2>{it.name}</h2>
              <ShowList
                imageitems={it.content}
                total={it.content.length}
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
