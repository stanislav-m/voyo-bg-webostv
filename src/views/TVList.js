import TvsList from "./TvsList";

import css from "./TVList.module.less";

const TVList = ({ data, ...rest }) => {
  const { liveTvs } = data.dataList;

  return (
    <div className={css.list}>
      <TvsList
        {...rest}
        route={data.route}
        imageitems={liveTvs}
        className={css.list}
      />
    </div>
  );
};

export default TVList;
