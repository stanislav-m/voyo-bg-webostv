import { useCallback, useEffect, useRef } from "react";
import TestList from './TestList';

import css from './TestList.module.less';

const Test_l = () => {

  const testData = [
    { id: 0, name: "abc 0", cap: "aapp"},
    { id: 1, name: "abc 1", cap: "aapp"},
    { id: 2, name: "abc 2", cap: "aapp"},
    { id: 3, name: "abc 3", cap: "aapp"},
    { id: 4, name: "abc 4", cap: "aapp"},
    { id: 5, name: "abc 5", cap: "aapp"},
    { id: 6, name: "abc 6", cap: "aapp"},
    { id: 7, name: "abc 7", cap: "aapp"},
    { id: 8, name: "abc 8", cap: "aapp"},
    { id: 9, name: "abc 9", cap: "aapp"},
    { id: 10, name: "abc 10", cap: "aapp"},
  ];

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
        <TestList imageitems={testData}
          cbScrollTo={getScrollTo}
        /></div>
  );

};

export default Test_l;
