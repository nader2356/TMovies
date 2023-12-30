import { Button, Flex, Spinner, Text, Box, Wrap } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getAllGenres } from "../../api/genres";
import { motion } from "framer-motion";
const Genres = () => {
  const navigate = useNavigate();
  const genreParam = useParams().genre ?? "";
  const {
    data: genres,
    isError,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: getAllGenres,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
  const Underline = (
    <Box
      as={motion.div}
      layoutId="underline"
      h=".1rem"
      w="70%"
      mx="auto"
      bg="black"
      _dark={{ bg: "white" }}
    />
  );

  return (
    <>
 
      <Flex maxW="90rem" mx="auto" pb=".5rem">
        {isLoading ? (
          <Box py="1rem" mx="auto">
            <Spinner size="md" />
          </Box>
        ) : null}
        {isError ? <Text mx="auto">failed</Text> : null}
        {isSuccess ? (
          <Wrap py="1rem" mx="auto" justify="center">
            <Box>
              <Button variant="ghost" onClick={() => navigate(`/`)}>
                All
              </Button>
              {!genreParam ? Underline : null}
            </Box>
            {genres.map((genre) => (
              <Box key={genre.id}>
                <Button
                  variant="ghost"
                  onClick={() => navigate(`/${genre.title}`)}
                >
                  {genre.title}
                </Button>
                {genre.title === genreParam ? Underline : null}
              </Box>
            ))}
          </Wrap>
        ) : null}
      </Flex>
    </>
  );
};
export default Genres;