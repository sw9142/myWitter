import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "../fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

function MyWeetFactory({ UserInfo }) {
  const [Myweets, setMyweets] = useState("");
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
  return (
    <>
      <form onSubmit={onSubmitWeets} className="factoryForm">
        <div className="factoryInput__container">
          <input
            className="factoryInput__input"
            type="text"
            placeholder="What's on your mind?"
            name="myWeets"
            value={Myweets}
            onChange={onMyweet}
            maxLength={120}
          />
          <input type="submit" value="&rarr;" className="factoryInput__arrow" />
        </div>

        <label for="attach-file" className="factoryInput__label">
          <span>Add photos</span>
          <FontAwesomeIcon icon={faPlus} />
        </label>
        <input
          id="attach-file"
          type="file"
          accept="image/*"
          onChange={onFileHandler}
          style={{
            opacity: 0,
          }}
        />
        {Attachchment && (
          <div className="factoryForm__attachment">
            <img
              src={Attachchment}
              alt="attachment"
              style={{
                backgroundImage: Attachchment,
              }}
            />
            <div className="factoryForm__clear" onClick={onClearAttachment}>
              <span>Remove</span>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
        )}
      </form>
    </>
  );
}

export default MyWeetFactory;
