import { useContext } from "react";
import { GlobalContext } from "../components/GlobalContex";
import ShowList from "./ShowList";

import css from "./CategList.module.less";

const CategList = () => {
  const { voyoState } = useContext(GlobalContext);
  const { found_rows, items } = voyoState.dataList;

  return (
    <div className={css.list}>
      <ShowList
        imageitems={items}
        total={Number(found_rows)}
        className={css.list}
      />
    </div>
  );
};

export default CategList;
