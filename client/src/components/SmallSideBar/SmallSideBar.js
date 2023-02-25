import { NavLink } from "react-router-dom";
import {} from "react-router-dom";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { IoAddCircleOutline, IoTrophyOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { SiElasticsearch } from "react-icons/si";
import "./smallSideBar.css";

const SideBarDiv = styled.div``;

const SmallSideBar = ({ toggleTheme, isDarkTheme, lightTheme }) => {
  return (
    <div>
      <SideBarDiv className="side-bar-container">
        <div className="side-container sidebar">
          <div className="content small-sidebar">
            <div className="nav-links">
              <NavLink key={`link-to-dashboard`} className="link" to="/" activeclassname="active">
                <span>
                  <FiSearch />
                </span>
              </NavLink>
              <NavLink
                key={`link-to-advanced-search`}
                className="link"
                to="/advanced-search"
                activeclassname="active">
                <span>
                  <SiElasticsearch />
                </span>
              </NavLink>
              <NavLink
                key={`link-to-all-user`}
                className="link"
                to="/user"
                activeclassname="active">
                <span>
                  <CgProfile />
                </span>
              </NavLink>
              <NavLink
                key={`link-to-add-codes`}
                className="link"
                to="/add-codes"
                activeclassname="active">
                <span>
                  <IoAddCircleOutline />
                </span>
              </NavLink>
              <NavLink
                key={`link-to-success-board`}
                className="link"
                to="/success-board"
                activeclassname="active">
                <span>
                  <IoTrophyOutline />
                </span>
              </NavLink>
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
    </div>
  );
};

export default SmallSideBar;
