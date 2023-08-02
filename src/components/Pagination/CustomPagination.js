import React from "react";
import Pagination from "@material-ui/Pagination";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const darkTheme = createMuiTheme({
    palette: {
        type: "dark"
    },
});


export default function CustomPagination({ setPage, numOfPages = 10 }) {
    const handelPageChange = (page) => {
        setPage(page);
        window.scroll(0, 0)
    };

    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: 10,
            }}
        >
            <ThemeProvider theme={darkTheme}>
                <Pagination
                    onChange={(e) => handelPageChange(e.target.textContent)}
                    count={numOfPages}
                    color="primary"
                    hideNextButton
                    hidePrevButton
                />
            </ThemeProvider>
        </div>
    )
}