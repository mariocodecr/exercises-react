import React from "react";
import { Typography, Link, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    resultItem: {
        padding: '15px 0',
        borderBottom: '1px solid #ddd',
    },
    resultTitle: {
        fontSize: '18px',
        color: '#1a0dab',
        textDecoration: 'none',
    },
    resultUrl: {
        color: '#006621',
        fontSize: '14px',
    },
    resultDescription: {
        fontSize: '14px',
    },
})

interface ResultItemProps {
    title: string;
    url: string;
    description: string;
}

const ResultItem: React.FC<ResultItemProps> = ({ title, url, description }) => {
    const classes = useStyles();

    return (
        <Box className={classes.resultItem}>
             <Link href={url} className={classes.resultTitle} target="_blank" rel="noopener noreferrer">
                {title}
             </Link>
            <Typography className={classes.resultUrl}>{url}</Typography>
            <Typography className={classes.resultDescription}>{description}</Typography>
        </Box>
    );
}

export default ResultItem;