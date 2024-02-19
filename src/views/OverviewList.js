import { useContext, useCallback, useEffect, useRef } from "react";
import { GlobalContext } from "../components/GlobalContex";
import TvsList from "./TvsList";
import ShowList from "./ShowList";
import BodyText from '@enact/sandstone/BodyText';
import VirtualList from '@enact/sandstone/VirtualList';
import ri from '@enact/ui/resolution';

const OverviewList = () => {
  const { voyoState } = useContext(GlobalContext);
  const { liveTvs, sections } = voyoState.dataList;

  const renderItem = useCallback(({ index }) => {
    return (
      <div>
        {
          index < 1
            ?
            <div style={{ height: ri.scale(410 * 2) }}>
              <BodyText size='small'>
                ТВ Канали
              </BodyText>
              <TvsList
                imageitems={liveTvs}
                direction="horizontal"
              />
            </div>
            :
            <div style={{ height: ri.scale(410 * 2) }}>
              <BodyText size='small'>
                {sections[index - 1].name}
              </BodyText>
              <ShowList
                imageitems={sections[index - 1].content}
                direction="horizontal"
                total={sections[index - 1].content.length}
              />
            </div>
        }
      </div>
    )
  }
    , [liveTvs, sections]);

  const scrollToRef = useRef(null);

  useEffect(() => {
    scrollToRef.current({ index: 0, animate: false, focus: true });
  });

  useEffect(() => {
    // Below is an example of using scrollTo method for setting an "initial" position of VirtualList.
    // It is a substitute for focusOnIndex, setInitialFocusIndex, and scrollToItem of enyo.
    scrollToRef.current({ index: 0, animate: false, focus: true });
  }, []);


  const getScrollTo = useCallback((scrollTo) => {
    scrollToRef.current = scrollTo;
  }, []);

  return (
    <VirtualList
      dataSize={sections.length + 1}
      itemRenderer={renderItem}
      itemSize={ri.scale(510 * 2)}
      cbScrollTo={getScrollTo}
    />
  );
}

export default OverviewList;
