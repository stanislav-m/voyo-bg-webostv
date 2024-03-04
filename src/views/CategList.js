import ShowList from "./ShowList";

import css from "./CategList.module.less";

const CategList = ({ data, ...rest }) => {
  const { found_rows, items } = data.dataList;
  console.log(data);

  return (
    <div className={css.list}>
      <ShowList
        {...rest}
        route={data.route}
        imageitems={items}
        total={Number(found_rows)}
        className={css.list}
      />
    </div>
  );
};

export default CategList;
