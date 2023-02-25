import { useSelector } from "react-redux";
import "../../App.css";

const AlertMessage = () => {
  const { alertType, alertText } = useSelector((state) => state.user);
  return (
    <div className={`alert alert-${alertType}`}>
      <p>{alertText}</p>
    </div>
  );
};

export default AlertMessage;
