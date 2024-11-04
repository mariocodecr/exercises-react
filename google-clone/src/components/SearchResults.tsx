import React from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Container, Typography } from "@mui/material";
import ResultItem from "./ResultItem";

const useStyles = makeStyles({
    resultsContainer: {
        maxWidth: '600px',
        margin: '0 auto',
        paddingTop: '20px'
    }
})

const searchData: Record<string, Array<{ title: string; url: string; description: string }>> = {
    Naruto: [
      { title: 'Naruto - Wikipedia', url: 'https://en.wikipedia.org/wiki/Naruto', description: 'Naruto is a Japanese manga series written and illustrated by Masashi Kishimoto.' },
      { title: 'Naruto Official Site', url: 'https://www.naruto.com', description: 'Welcome to the official Naruto website with all the latest news and episodes.' },
    ],
    React: [
      { title: 'React – A JavaScript library for building user interfaces', url: 'https://reactjs.org/', description: 'React is a JavaScript library for creating interactive UIs.' },
      { title: 'Getting Started with React', url: 'https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_getting_started', description: 'Learn the basics of React for building front-end applications.' },
    ],
    JavaScript: [
      { title: 'JavaScript - MDN Web Docs', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', description: 'JavaScript is a programming language that conforms to the ECMAScript specification.' },
      { title: 'Introduction to JavaScript', url: 'https://www.w3schools.com/js/', description: 'Learn JavaScript from scratch at W3Schools.' },
    ],
  }

  const SearchResults: React.FC = () => {
    const classes = useStyles();
    const {query} = useParams<{query: string}>();
    const results = query ? searchData[query] || [] : [];

    return (
        <Container className={classes.resultsContainer}>
            <Typography variant="h5">Results for "{query}"</Typography>
            {results.length > 0 ? (
                results.map((result: { title: any; url: any; description: any; }, index: any) => (
                    <ResultItem key={index} title={result.title} url={result.url} description={result.description} />
                ))
            ) : (
                <Typography>No results found.</Typography>
              )}
            </Container>
          );
        };
        
export default SearchResults;