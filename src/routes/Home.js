import React, { useState, useEffect } from "react";
import { dbService } from "../fbase";
import MyWeetFactory from "./MyWeetFactory";

import Weet from "./Weet";

export default function Home({ UserInfo }) {
  const [WeetList, setWeetList] = useState([]);

  useEffect(() => {
    dbService
      .collection("myWeets")
      .orderBy("addedDate", "desc")
      .onSnapshot((snapshot) => {
        const weetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setWeetList(weetArray);
      });
  }, []);

  return (
    <div className="container">
      <MyWeetFactory UserInfo={UserInfo} />
      <div style={{ marginTop: 30 }}>
        {WeetList.map((weet) => (
          <div key={weet.id}>
            <Weet weet={weet} isOwner={weet.userId === UserInfo.uid} />
          </div>
        ))}
      </div>
    </div>
  );
}
