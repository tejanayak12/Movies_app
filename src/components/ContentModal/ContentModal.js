import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import Modal from "@material-ui/core";
import { Backdrop } from "@material-ui/core";
import Fade from "@material-ui/core";
import axios from "axios"
import {
    img_500,
    unavailable,
    unavailableLandscape
} from "../../congif/config";
import "./ContentModal.css";
import { Button } from "@material-ui/core";
import { YouTubeIcon } from "@material-ui/icons";
import Carousel from "../Carousel/Carousel";


const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    paper: {
        width: "90%",
        height: "80%",
        backgroundColor: "#39445a",
        border: "1px solid #282c34",
        borderRadius: 10,
        color: "white",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(1, 1, 3)
    },
}));


export default function TransitionsModal({ children, media_type, id }) {
    const classes = useStyles();
    const [open, SetOpen] = useState(false);
    const [content, SetContent] = useState();
    const [video, setVideo] = useState();

    const handleOpen = () => {
        SetOpen(true)
    };

    const handelClose = () => {
        SetOpen(false)
    };

    const fetchData = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );

        SetContent(data)
        console.log(data)
    };

    const fetchVideo = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );

        setVideo(data.results[0]?.key);
    };

    useEffect(() => {
        fetchData();
        fetchVideo();
    }, []);

    return (
        <>
            <div className="media" style={{ cursor: "pointer" }} color="inherit" onClick={handleOpen}>
                {children}
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedy="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handelClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500
                }}
            >
                <Fade in={open}>
                    {content && (
                        <div className={classes.paper}>
                            <div className="ContentModal">
                                <img
                                    src={
                                        content.backdrop_path
                                            ? `${img_500}/${content.backdrop_path}`
                                            : unavailableLandscape
                                    }
                                    alt={content.name || content.title}
                                    className="ContentModal_landscape"
                                />
                                <div className="ContentModal_about">
                                    <span className="ContentModal__title">
                                        {content.name || content.title}(
                                        {(
                                            content.first_air_date ||
                                            content.release_date ||
                                            "-------"
                                        ).substring(0, 4)}
                                        )
                                    </span>
                                    {content.tagline && (
                                        <i className="tagline">{content.tagline}</i>
                                    )}

                                    <span className="ContentModal__description">
                                        {content.overview}
                                    </span>

                                    <div>
                                        <Carousel id={id} media_type={media_type} />
                                    </div>

                                    <button
                                        variant="contained"
                                        startIcon={<YouTubeIcon />}
                                        color="secondary"
                                        target="__blank"
                                        href={`https://www.youtube.com/watch?v=${video}`}
                                    >
                                        Watch The Trailer
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </Fade>

            </Modal>

        </>
    )
}