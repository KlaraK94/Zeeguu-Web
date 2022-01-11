import { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../UserContext";
import strings from "../i18n/definitions";
import StudentSpecificSidebarOptions from "./StudentSpecificSidebarOptions";
import TeacherSpecificSidebarOptions from "./TeacherSpecificSidebarOptions";
import { setColors } from "../components/colors";
import * as s from "./SideBar.sc";

export default function SideBar(props) {
  const user = useContext(UserContext);
  const api = props.api;
  const [initialSidebarState, setInitialSidebarState] = useState(true);
  const [isOnStudentSide, setIsOnStudentSide] = useState(true);

  //deducting whether we are on student or teacher side for colouring
  const path = useLocation().pathname;
  useEffect(() => {
    //in Settings the side is determined by whether the user is a student or a teacher
    if (path.includes("account")) {
      setIsOnStudentSide(!user.is_teacher);
    } else {
      setIsOnStudentSide(!path.includes("teacher"));
    }
    // eslint-disable-next-line
  }, [path]);

  const defaultPage = user.is_teacher ? "/teacher/classes" : "articles";

  const { light_color, dark_color } = setColors(isOnStudentSide);

  function toggleSidebar(e) {
    e.preventDefault();
    setInitialSidebarState(!initialSidebarState);
  }

  function resetSidebarToDefault(e) {
    setInitialSidebarState(true);
  }

  function sendFeedback(e) {
    window.location = "mailto:zeeguu.team@gmail.com?subject=General Feedback";
    e.preventDefault();
    resetSidebarToDefault(e);
  }

  let sidebarContent = (
    <>
      <div className="logo">
        <a href={defaultPage} rel="external">
          <img
            src="/static/images/zeeguuWhiteLogo.svg"
            alt="Zeeguu Logo - The Elephant"
          />
        </a>
      </div>
      <div className="arrowHolder">
        <span className="toggleArrow" onClick={toggleSidebar}>
          ▲
        </span>
      </div>

      {isOnStudentSide && (
        <StudentSpecificSidebarOptions
          resetSidebarToDefault={resetSidebarToDefault}
          user={user}
          api={api}
        />
      )}

      {!isOnStudentSide && (
        <TeacherSpecificSidebarOptions
          resetSidebarToDefault={resetSidebarToDefault}
          user={user}
          setIsOnStudentSide={setIsOnStudentSide}
        />
      )}

      <br />
      <div className="navigationLink">
        <Link to="/account_settings" onClick={resetSidebarToDefault}>
          <small>{strings.settings}</small>
        </Link>
      </div>
      <div className="navigationLink">
        <Link to="#" onClick={sendFeedback}>
          <small>{strings.sentFeedback1}</small>
        </Link>
      </div>
      <br />
      <div className="navigationLink">
        <Link
          to="/"
          onClick={() => {
            user.logoutMethod();
          }}
        >
          <small>{strings.logout}</small>
        </Link>
      </div>
    </>
  );

  if (!initialSidebarState) {
    return (
      <s.SideBarToggled light={light_color} dark={dark_color}>
        {sidebarContent}
        <s.MainContentToggled id="scrollHolder">
          {props.children}
        </s.MainContentToggled>
      </s.SideBarToggled>
    );
  }

  return (
    <s.SideBarInitial light={light_color} dark={dark_color}>
      {sidebarContent}
      <s.MainContentInitial id="scrollHolder">
        {props.children}
      </s.MainContentInitial>
    </s.SideBarInitial>
  );
}