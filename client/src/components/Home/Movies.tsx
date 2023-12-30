import {
    Spinner,
    Text,
    Grid,
    Heading,
    Box,
    Divider,
    Flex,
  } from "@chakra-ui/react";
  import { useQuery } from "@tanstack/react-query";
  import { useParams } from "react-router-dom";
  import MovieCard from "./MovieCard";
  

  import { AnimatePresence, motion } from "framer-motion";
  import { useEffect } from "react";
import { IMovie } from "../../utils/interfaces";
import { getAllMovies } from "../../api/movies";
  
  const Movies = () => {
    const genre = useParams().genre;

  

    const {
      data: movies,
      isSuccess,
      isLoading,
      isError,
      refetch,
    } = useQuery({
      queryKey: ["movies"],
      queryFn: () => getAllMovies(genre),
    });

    useEffect(() => {
        refetch();
      }, [genre]);

    return (
      <Box mb="2rem" maxW="90rem" mx="auto" px="2rem">
        <Heading as="h2" size="lg">
          Movies
        </Heading>
        <Divider my="1rem" />
        {isLoading ? (
          <Flex w="full" justify="center">
            <Spinner size="xl" />
          </Flex>
        ) : null}
        {isError ? <Text mx="auto">failed</Text> : null}
   
        {isSuccess ? (
          <Grid
            templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            gridAutoRows="auto"
            w="full"
            rowGap="3rem"
            columnGap="1rem"
          >
            <AnimatePresence>
              {movies.length > 0 ? (
                <>
                  {movies.map((movie: IMovie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </>
              ) : (
                <Text
                  as={motion.p}
                  initial={{ scale: 0 }}
                  animate={{
                    scale: 1,
                    transition: { delay: 0.2, duration: 0.3 },
                  }}
                  textAlign="center"
                >
                  NO MOVIES FOUND
                </Text>
              )}
            </AnimatePresence>
          </Grid>
        ) : null}
        <Divider as={motion.hr} layout my="1rem" />
      </Box>
    );
  };
  export default Movies;