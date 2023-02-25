import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedPage = ({ children }) => {
  const user = useSelector((state) => state.user.user);

  if (!user) {
    return <Navigate to="/homepage" />;
  }
  return children;
};

export default ProtectedPage;
