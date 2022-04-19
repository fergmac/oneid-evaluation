import React from "react";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <a className="active" href="home">
        Home
      </a>
      <a href="veriff">Veriff</a>
      <a href="yoti">Yoti</a>
      <a href="vouched">Vouched</a>
      <a href="jumio">Jumio</a>
      <a href="my-sessions">My Sessions</a>
    </div>
  );
};

export default Sidebar;
