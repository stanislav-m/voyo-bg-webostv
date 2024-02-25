import { useContext } from "react";
import { GlobalContext } from "../components/GlobalContex";
import TvsList from './TvsList';

import css from './TVList.module.less';

const TVList = () => {
  const { voyoState } = useContext(GlobalContext);
  const { liveTvs} = voyoState.dataList;

  return (
      <div className={css.list}>
        <TvsList imageitems={liveTvs}
        /></div>
  );

};

export default TVList;
