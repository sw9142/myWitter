import React, { useState, useEffect } from "react";
import { dbService, storageService } from "../fbase";
import { v4 as uuidv4 } from "uuid";
import Weet from "./Weet";

export default function Home({ UserInfo }) {
  const [Myweets, setMyweets] = useState("");
  const [WeetList, setWeetList] = useState([]);
  const [Attachchment, setAttachchment] = useState();

  const onMyweet = (e) => {
    setMyweets(e.target.value);
  };
  const onSubmitWeets = async (e) => {
    e.preventDefault();
    let attachmentUrl = "";
    if (Attachchment) {
      const attachmentRef = storageService
        .ref()
        .child(`${UserInfo.uid}/${uuidv4()}`);

      const response = await attachmentRef.putString(Attachchment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }

    dbService.collection("myWeets").add({
      text: Myweets,
      addedDate: Date.now(),
      userId: UserInfo.uid,
      attachmentUrl,
    });
    setMyweets("");
    setAttachchment("");
  };

  const onFileHandler = (e) => {
    const file = e.target.files[0];

    const fileReader = new FileReader();
    fileReader.onloadend = (finishedEvent) => {
      setAttachchment(finishedEvent.currentTarget.result);
    };
    fileReader.readAsDataURL(file);
  };

  const onClearAttachment = () => {
    setAttachchment(null);
  };

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
    <div>
      home page
      <form onSubmit={onSubmitWeets}>
        <input
          type="text"
          placeholder="What's on your mind?"
          name="myWeets"
          value={Myweets}
          onChange={onMyweet}
        />
        <input type="file" accept="image/*" onChange={onFileHandler} />
        <button>MyWeets</button>
        {Attachchment && (
          <>
            <img src={Attachchment} style={{ width: "50px", height: "50px" }} />
            <button onClick={onClearAttachment}>Clear</button>
          </>
        )}
      </form>
      {WeetList.map((weet) => (
        <div key={weet.id}>
          <Weet weet={weet} isOwner={weet.userId === UserInfo.uid} />
        </div>
      ))}
    </div>
  );
}
