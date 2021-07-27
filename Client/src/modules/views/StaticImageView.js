/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"

import Grid from "@material-ui/core/Grid"
import CustomCard from "../components/CustomCard"
import CardModal from "./CardModal"
import AddOrModifyItem from "./AddOrModifyItem"
import { fetchPosts } from "../../api"

const useGridStyles = makeStyles(({ breakpoints }) => ({
  root: {
    [breakpoints.up("md")]: {
      justifyContent: "center",
    },
  },
}))

const StaticImageView = React.memo(function SolidGameCard({ editModeEnabled }) {
  const [gamesList, setGamesList] = useState([])
  const gridStyles = useGridStyles()
  const [clickedCard, setClickedCard] = useState({})
  const [showCard, setShowCard] = useState(false)

  useEffect(() => {
    fetchPosts()
      .then((res) => setGamesList(res.data))
      .catch((err) => console.log("Failed to retrieve games data: ", err))
  }, [])

  const cardClickHandler = (gameCard) => {
    setClickedCard(gameCard)
    setShowCard(true)
  }

  if (gamesList === []) return null

  return (
    <>
      <Grid classes={gridStyles} container spacing={4}>
        {gamesList.map((gameCard) => {
          const { _id, title, subtitle, image, color } = gameCard
          return (
            <Grid item key={`${_id}`}>
              <CustomCard
                title={title}
                subtitle={subtitle}
                image={image}
                color={color}
                onClickHandler={() => cardClickHandler(gameCard)}
              />
            </Grid>
          )
        })}
      </Grid>
      {editModeEnabled ? (
        <AddOrModifyItem
          showModal={showCard}
          setShowModal={setShowCard}
          editModeEnabled={editModeEnabled}
          clickedCard={clickedCard}
        />
      ) : (
        <CardModal
          showCard={showCard}
          setShowCard={setShowCard}
          gameCard={clickedCard}
        />
      )}
    </>
  )
})

export default StaticImageView
