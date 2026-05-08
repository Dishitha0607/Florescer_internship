import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">KAIZEN</Link>
      </div>

      <div className="nav-right">
        {!user ? (
          <Link to="/" className="nav-btn">
            Login
          </Link>
        ) : (
          <>
            <span className="nav-user">
              {user.username}
            </span>

            <button className="nav-btn logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;