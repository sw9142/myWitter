import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Nav({ UserInfo }) {
  console.log("UserInfo.displayName In Nav: ", UserInfo);
  return (
    <div>
      <ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        <li>
          <Link to="/" style={{ width: "50px" }}>
            <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            style={{
              marginLeft: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "50px",
              fontSize: 12,
            }}
          >
            <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />

            <span style={{ marginTop: 10, textAlign: "center" }}>
              {UserInfo.displayName
                ? `${UserInfo.displayName}'s Profile`
                : "Profile"}
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
