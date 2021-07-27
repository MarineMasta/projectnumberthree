import React, { useEffect, useState } from "react"
import Modal from "react-modal"
import TextField from "@material-ui/core/TextField"
import CloseButton from "react-bootstrap/CloseButton"
import Link from "@material-ui/core/Link"
import Alert from "@material-ui/lab/Alert"
import IconButton from "@material-ui/core/IconButton"
import Collapse from "@material-ui/core/Collapse"
import CloseIcon from "@material-ui/icons/Close"
import { createPost, updatePost } from "../../api"

import * as values from "../../constants"

Modal.setAppElement("#root")

const customStyles = {
  content: {
    height: 400,
    width: 600,
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
}

const AddOrModifyItem = ({
  showModal,
  setShowModal,
  editModeEnabled,
  clickedCard = null,
}) => {
  const [gameCard, setGameCard] = useState({
    title: "",
    subtitle: "",
    image: "",
    color: "#34241e",
    timesPlayed: "",
    highestScore: "",
  })
  const [openAlert, setOpenAlert] = useState(false)
  useEffect(() => {
    if (clickedCard) setGameCard(clickedCard)
  }, [])
  useEffect(() => setOpenAlert(false), [showModal])
  const closeModal = () => {
    setShowModal(false)
  }

  const handleSaveForm = async () => {
    try {
      const regexp = new RegExp("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$")
      if (!gameCard.color.match(regexp)) updateState({ color: "#34241e" })
      const { data } = await createPost(gameCard)
      setOpenAlert(true)
      setTimeout(() => {
        closeModal()
        window.location.reload()
      }, 800)
      console.log("Successfully added", data)
    } catch (err) {
      console.log("oops err occured while adding data ", err)
    }
  }

  const handleEditForm = async () => {
    if (!clickedCard) {
      console.log("Error!!, Unable to find the card clicked")
      return
    }
    try {
      await updatePost(clickedCard["_id"], gameCard)
      setOpenAlert(true)
      setTimeout(() => {
        closeModal()
        window.location.reload()
      }, 800)

      console.log("Successfully edited")
    } catch (err) {}
  }

  const updateState = (value) => {
    const varType = Object.keys(value)[0]
    const tempObj = gameCard

    if (
      (varType === "timesPlayed" || varType === "highestScore") &&
      (!(value[varType] >= 0) || value[varType] === "")
    )
      tempObj[varType] = "0"
    else tempObj[varType] = value[varType]
    setGameCard(tempObj)
  }

  return (
    <Modal
      isOpen={showModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Add Game Card Modal"
    >
      <CloseButton
        onClick={closeModal}
        style={{
          background: "transparent",
          opacity: 0.5,
          cursor: "pointer",
        }}
      />

      <form style={{ marginTop: 16 }}>
        <TextField
          required
          id="outlined-basic"
          label={values.GAME_TITLE}
          defaultValue={clickedCard?.title || ""}
          variant="outlined"
          style={{ width: 500 }}
          onChange={(e) => updateState({ title: e.target.value })}
        />
        <TextField
          required
          id="outlined-basic"
          label={values.GAME_SUBTITLE}
          defaultValue={clickedCard?.subtitle || ""}
          variant="outlined"
          style={{ width: 500, marginTop: 8 }}
          onChange={(e) => updateState({ subtitle: e.target.value })}
        />
        <TextField
          id="standard-number"
          label={values.TIMES_PLAYED}
          defaultValue={clickedCard?.timesPlayed || "0"}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          style={{ width: 180, marginTop: 32, marginLeft: 4 }}
          onChange={(e) => updateState({ timesPlayed: e.target.value })}
        />
        <TextField
          id="standard-basic"
          label={values.COLOR}
          defaultValue={clickedCard?.color || ""}
          InputLabelProps={{
            shrink: true,
          }}
          style={{ width: 250, marginTop: 32, marginLeft: 32 }}
          onChange={(e) => updateState({ color: e.target.value })}
        />
        <TextField
          id="standard-basic"
          label={values.HIGHEST_SCORE}
          defaultValue={clickedCard?.highestScore || "0"}
          style={{ marginTop: 16 }}
          onChange={(e) => updateState({ highestScore: e.target.value })}
        />
        <TextField
          required
          id="standard-basic"
          label={values.ADD_IMAGE_URL}
          defaultValue={clickedCard?.image || ""}
          style={{ marginTop: 16, marginLeft: 64, width: 250 }}
          onChange={(e) => updateState({ image: e.target.value })}
        />
      </form>
      <Collapse in={openAlert} style={{ marginTop: 8 }}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenAlert(false)
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {editModeEnabled ? values.SUCCESS_EDIT : values.SUCCESS_SAVED}
        </Alert>
      </Collapse>

      <Link
        variant="h6"
        underline="none"
        onClick={editModeEnabled ? handleEditForm : handleSaveForm}
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 20,
          cursor: "pointer",
          color: "#f50057",
        }}
      >
        {editModeEnabled ? values.EDIT : values.SAVE}
      </Link>
    </Modal>
  )
}

export default AddOrModifyItem
