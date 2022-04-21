import React from "react";
import Link from 'next/link'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link href="/">
        <a className="active">Home</a>
      </Link>
      <Link href="/id-verification">
          <a>Veriff</a>
      </Link>
      <Link href="/yoti-verification">
          <a>Yoti</a>
      </Link>
      <a href="vouched">Vouched</a>
      <a href="jumio">Jumio</a>
      <a href="my-sessions">My Sessions</a>
    </div>
  );
};

export default Sidebar;
