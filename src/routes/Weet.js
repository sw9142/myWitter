import React, { useState } from "react";
import { dbService, storageService } from "../fbase";

function Weet({ weet, isOwner }) {
  const [UpdatedText, setUpdatedText] = useState(weet.text);
  const [WantToEdit, setWantToEdit] = useState(false);

  const onClickHandler = (e) => {
    if (e.target.name === "edit") {
      setWantToEdit(true);
    } else if (e.target.name === "delete") {
      const okay = window.confirm("Are you sure to delete this Myweet?");
      if (okay) {
        dbService.doc(`myWeets/${weet.id}`).delete();
        storageService.refFromURL(weet.attachmentUrl).delete();
      }
    } else if (e.target.name === "cancel") {
      setWantToEdit(false);
    }
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
    <>
      {weet.attachmentUrl && (
        <img src={weet.attachmentUrl} width="50px" height="50px" />
      )}
      <h4>{weet.text}</h4>

      {!WantToEdit && isOwner && (
        <>
          <button name="edit" onClick={onClickHandler}>
            Edit
          </button>

          <button name="delete" onClick={onClickHandler}>
            Delete
          </button>
        </>
      )}
      {WantToEdit && (
        <>
          <form onSubmit={onSubmitHandler}>
            <input
              type="text"
              placeholder="edit your myweet"
              onChange={updateHandler}
              value={UpdatedText}
            />
            <input type="submit" name="submit" value="Update" />
            <button name="cancel" onClick={onClickHandler}>
              Cancel
            </button>
          </form>
        </>
      )}
    </>
  );
}

export default Weet;
