import TvsList from './TvsList';

import css from './TVList.module.less';

const TVList = ({data}) => {
  const { liveTvs} = data.dataList;

  return (
      <div className={css.list}>
        <TvsList imageitems={liveTvs}
        /></div>
  );

};

export default TVList;
