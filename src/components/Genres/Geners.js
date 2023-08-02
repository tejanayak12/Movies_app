import { Chip } from "@material-ui/core";
import axios from "axios";
import { useEffect } from "react";

const Geners = ({
    selectedGeners,
    setSelectedGeners,
    geners,
    setGeners,
    type,
    setPage
}) => {
    const handelAdd = (gener) => {
        setSelectedGeners([...selectedGeners, gener]);
        setGeners(geners.filter((g) => g.id !== gener.id));
        setPage(1)
    };

    const handelRemove = (genre) => {
        setSelectedGeners(
            selectedGeners.filter((selected) => selected.id !== genre.id)
        );

        setGeners([...geners, genre]);
        setPage(1);
    };

    const fetchGenres = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        setGeners(data.geners)
    };

    useEffect(() => {
        fetchGenres();

        return () => {
            setGeners({});
        };
    }, [])

    return (
        <div style={{ padding: "6px 0" }}>
            {selectedGeners.map((genre) => (
                <Chip
                    style={{ margin: 2 }}
                    label={genre.name}
                    key={genre.id}
                    color="primary"
                    clickable
                    size="small"
                    onDelete={() => handelRemove(genre)}
                />
            ))}
            {geners.map((genre) => (
                <Chip
                    style={{ margin: 2 }}
                    label={genre.name}
                    key={genre.id}
                    clickable
                    size="small"
                    onClick={() => handelAdd(genre)}
                />
            ))}
        </div>
    );
};


export default Geners;