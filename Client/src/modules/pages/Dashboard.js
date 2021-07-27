import React, { useState, useEffect } from "react"
import TopNav from "../views/TopNav"
import { Carousel } from "3d-react-carousal"
import Button from "@material-ui/core/Button"
import * as values from "../../constants"
import AddOrModifyItem from "../views/AddOrModifyItem"
import { fetchPosts } from "../../api"

function Dashboard(props) {
  const [showModal, setShowModal] = useState(false)
  const [gamesData, setGamesData] = useState([])
  const [carousel, setCarousel] = useState([])

  useEffect(() => {
    fetchPosts()
      .then((res) => setGamesData(res.data))
      .catch((err) => console.log("Failed to load data: ", err))
  }, [])

  useEffect(() => {
    const slides = gamesData.map((item) => (
      <img src={item.image} alt={item.title} height={300} width={800} />
    ))
    setCarousel(<Carousel slides={slides} />)
  }, [gamesData])

  return (
    <div>
      <TopNav auth={props.auth} />
      <div
        style={{
          display: "block",
          height: "400px",
          marginTop: 80,
        }}
      >
        {carousel}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button
          color="secondary"
          size="large"
          onClick={() => props.history.push("/games")}
        >
          {values.VIEW_COMPLETE_LIST}
        </Button>
        <Button color="primary" onClick={() => setShowModal(true)}>
          {values.ADD_ITEM}
        </Button>
        <AddOrModifyItem showModal={showModal} setShowModal={setShowModal} />
      </div>
    </div>
  )
}

export default Dashboard
