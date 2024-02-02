import { useContext } from "react";
import { GlobalContext } from "../components/GlobalContex";

const OverviewList = () => {
  const { overviewList, loading } = useContext(GlobalContext);

  const { liveTvs, sections } = overviewList;

  return (
    <div className="overviewList">
      {loading && <span>Loading ... please wait...</span>}
      <div className="sectionBox">
        <h2>{"Телевизионни канали"}</h2>
        {liveTvs
          ? liveTvs.map((item) => (
              <div>
                <div
                  className="contBox"
                  key={item.id}
                  style={{
                    backgroundImage: `url(${item.logo})`,
                  }}
                />
                <h3>{item.name}</h3>
              </div>
            ))
          : null}
      </div>
      <div className="sections">
        {sections
          ? sections.map((it) => (
              <div className="sectionBox" key={it.id}>
                <h2>{it.name}</h2>
                {it.content.map((el) => (
                  <div>
                    <div
                      className="contBox"
                      key={el.id}
                      style={{
                        backgroundImage: `url(${el.image.replace("{WIDTH}x{HEIGHT}","284x410")})`,
                      }}
                    />
                    <h3>{el.title}</h3>
                  </div>
                ))}
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default OverviewList;
