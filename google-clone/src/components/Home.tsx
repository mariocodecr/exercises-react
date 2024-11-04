import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { TextField, Button, Container, Box } from '@mui/material';


const useStyles = makeStyles({
    searchContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '100px'
    },
    logo: {
        width: '250px',
        marginBottom: '20px',
    },
    searchBar: {
        width: '100%',
        maxWidth: '600px',
        marginBottom: '10px'
    },
})

const Home: React.FC = () => {
    const classes = useStyles()
    const [query, setQuery] = useState<string>('')
    const navigate = useNavigate()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (query) {
            navigate(`/search/${query}`)
        }
    }

    return (
        <Container className={classes.searchContainer}>
            <img src="#" alt="Google Logo" className={classes.logo} />
            <form onSubmit={handleSearch} className="search-form">
                <TextField variant="outlined"
                    placeholder="search Google or type a URL"
                    value={query} onChange={(e) => setQuery(e.target.value)}
                    className={classes.searchBar} >
                    <Button variant="contained" color="primary" type="submit"> Google Search </Button>
                </TextField>
            </form>
     </Container>
    )
}

export default Home;