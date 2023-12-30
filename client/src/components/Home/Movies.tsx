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

import { getAllMovies } from "../../api/movies";
import { AnimatePresence, motion } from "framer-motion";
import { searchMovies } from "../../api/search";


type Props = {
  searchQuery: string | undefined;
};

const Movies = ({ searchQuery }: Props) => {
  const genre = useParams().genre;

  const {
    data: movies,
    isSuccess,
    isLoading,
    isRefetching,
    isError,
  } = useQuery({
    queryKey: ["movies", genre, searchQuery],
    queryFn: () => {
      if (!searchQuery) return getAllMovies(genre);

      return searchMovies(searchQuery);
    },
    refetchOnWindowFocus: false,
  });

  return (
    <Box mb="2rem" maxW="90rem" mx="auto" px="2rem">
      <Flex justify="space-between" align="center">
        <Heading as="h2" size="lg">
          {searchQuery ? searchQuery : "Movies"}
        </Heading>
        {isRefetching ? <Spinner size="sm" /> : null}
      </Flex>
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
                {movies.map((movie) => (
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