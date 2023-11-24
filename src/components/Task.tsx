import { Input } from "postcss";
import { DEFAULT_MIN_VERSION } from "tls";

type taskProps = {
  index: number;
  name: String;
  isChecked: boolean;
  handleCheck: (index: number) => void;
};

const Task = ({ index, name, isChecked, handleCheck }: taskProps) => {
  return (
    <div className="task">
      <div>
        <div className="aled" onClick={() => handleCheck(index)}>
          <input
            className="checkbox"
            type="checkbox"
            checked={isChecked}
            hidden
            readOnly
          ></input>
          <div className="oskour">
            {isChecked ? (
              <div className="POPO">
                <div className="checkbox"></div>
                <div className="tick"></div>
              </div>
            ) : (
              <div className="checkbox"></div>
            )}
          </div>
        </div>
      </div>
      <h1 className="task_name">{name}</h1>
    </div>
  );
};

export default Task;
