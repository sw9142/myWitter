import React, { useState } from "react";
import { dbService, storageService } from "../fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

function Weet({ weet, isOwner }) {
  const [UpdatedText, setUpdatedText] = useState(weet.text);
  const [WantToEdit, setWantToEdit] = useState(false);

  const onDeleteHandler = () => {
    const okay = window.confirm("Are you sure to delete this Myweet?");
    if (okay) {
      dbService.doc(`myWeets/${weet.id}`).delete();
      storageService.refFromURL(weet.attachmentUrl).delete();
    }
  };

  const onCancelHandler = (e) => {
    if (e.target.name === "cancel") {
      setWantToEdit(false);
    }
  };

  const onToggleHandler = () => {
    setWantToEdit((pre) => !pre);
  };
  const updateHandler = (e) => {
    setUpdatedText(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setUpdatedText(e.target.value);
    console.log("weet.text: ", weet.text, "  ", "UpdatedText: ", UpdatedText);
    dbService.doc(`myWeets/${weet.id}`).update({
      text: UpdatedText,
    });
    setWantToEdit(false);
  };

  return (
    <div className="nweet">
      {WantToEdit ? (
        <>
          <form onSubmit={onSubmitHandler} className="container nweetEdit">
            <input
              type="text"
              placeholder="edit your myweet"
              onChange={updateHandler}
              value={UpdatedText}
              required
              autoFocus
              className="formInput"
            />
            <input
              type="submit"
              name="submit"
              value="Update"
              className="formBtn"
            />
            <button
              name="cancel"
              onClick={onCancelHandler}
              className="formBtn cancelBtn"
            >
              Cancel
            </button>
          </form>
        </>
      ) : (
        <>
          <h4>{weet.text}</h4>
          {weet.attachmentUrl && (
            <img
              src={weet.attachmentUrl}
              alt="attachment"
              width="50px"
              height="50px"
            />
          )}
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onToggleHandler}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
              <span onClick={onDeleteHandler}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Weet;
