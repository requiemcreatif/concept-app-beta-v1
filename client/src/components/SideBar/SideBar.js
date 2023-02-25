import { NavLink } from "react-router-dom";
import {} from "react-router-dom";
import styled from "styled-components";
import { SiElasticsearch } from "react-icons/si";
import { FiSearch } from "react-icons/fi";
import { IoAddCircleOutline, IoTrophyOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

const SideBarDiv = styled.div`
  display: none;

  @media (min-width: 992px) {
    display: block;

    .side-container {
      //position: fixed;
      min-height: 100vh;
      width: 250px;
      margin-left: -250px;
      transition: all 0.5s ease-in-out;
    }
    .content {
      //background-color: #fff;
      position: fixed;
      width: 250px;
      height: 100%;
      top: 50px;
      display: flex;
      flex-direction: column;
      padding: 4.1rem 1rem;
      gap: 10rem;
    }
    .show-sidebar {
      margin-left: 0;
      transition: all 0.5s ease-in;
    }

    .nav-links {
      padding: 2rem 1rem;
      display: flex;
      flex-direction: column;
    }

    .link {
      //////
      margin: 0.5rem 0;
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.5rem;
      color: #053651;
      transition: color 0.3s ease-in-out, box-shadow 0.3s ease-in-out padding 0.3s ease-in-out;
    }
    .link:hover {
      padding-left: 3rem;
      transition: all 0.5s ease-out;
      color: #fff;
      box-shadow: inset 200px 0 200px 0 #053651;
      border-radius: 5px;
    }
    .active {
      padding-left: 3rem;
      transition: all 0.5s ease-out;
      color: #fff;
      box-shadow: inset 200px 0 200px 0 #053651;
      border-radius: 5px;
    }

    a {
      padding: 1rem;
      color: #053651;
      font-size: 1.5rem;
      font-weight: 500;
      line-height: 1.5;
      text-decoration: none;
    }
    .concept-logo {
      width: 150px;
      color: #54b3d6;
    }

    .logo {
      display: flex;
      justify-content: center;
      padding-right: 2rem;
    }

    .switch {
      padding: 1rem;
    }
  }
`;

const SideBar = ({ toggleTheme, isDarkTheme }) => {
  return (
    <SideBarDiv>
      <div className="side-container sidebar">
        <div className="content big-sidebar">
          <div className="nav-links">
            <NavLink key={`link-to-dashboard`} className="link" to="/" activeclassname="active">
              <span>
                <FiSearch />
              </span>
              Search
            </NavLink>
            <NavLink
              key={`link-to-advanced-search`}
              className="link"
              to="/advanced-search"
              activeclassname="active">
              <span>
                <SiElasticsearch />
              </span>
              Advanced Search
            </NavLink>
            <NavLink
              key={`link-to-all-codes`}
              className="link"
              to="/all-codes"
              activeclassname="active">
              <span>
                <CgProfile />
              </span>
              MyCodes
            </NavLink>
            <NavLink
              key={`link-to-add-codes`}
              className="link"
              to="/add-codes"
              activeclassname="active">
              <span>
                <IoAddCircleOutline />
              </span>
              Add Codes
            </NavLink>
            <NavLink
              key={`link-to-success-board`}
              className="link"
              to="/success-board"
              activeclassname="active">
              <span>
                <IoTrophyOutline />
              </span>
              Success Board
            </NavLink>
            {/* <NavLink
              key={`link-to-profile`}
              className="link"
              to="/profile"
              activeclassname="active">
              <span>
                <CgProfile />
              </span>
              Profile
            </NavLink> */}

            <div>
              <label className="switch">
                <input type="checkbox" checked={isDarkTheme} onChange={toggleTheme} />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </SideBarDiv>
  );
};

export default SideBar;
