import { useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

function HomePage() {
  return (
    <AuthContext.Consumer>
      {(dataLogin) => <Home dataLogin={dataLogin} />}
    </AuthContext.Consumer>
  );
}

function Home({ dataLogin }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!dataLogin) {
      navigate("/login");
    }
  }, [dataLogin, navigate]);
  return <div>Haloo</div>;
}

export default HomePage;
