import {
    Image,
    Heading,
    Badge,
    SimpleGrid,
    AspectRatio,
    Skeleton,
    chakra,
    shouldForwardProp,
    Text,
  } from "@chakra-ui/react";
  import { motion, isValidMotionProp } from "framer-motion";
  import { IMovie } from "../../utils/interfaces";
  type Props = {
    movie: IMovie;
  };
  const ChakraBox = chakra(motion.div, {
    shouldForwardProp: (prop) =>
      isValidMotionProp(prop) || shouldForwardProp(prop),
  });
  const MovieCard = ({ movie }: Props) => {
    return (
      <ChakraBox
        as={motion.div}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{
          duration: ".5",
        }}
        layout
        w="full"
        pb=".5rem"
        px=".1rem"
        rounded="md"
        borderBottomWidth="2px"
        borderTopWidth="1px"
        boxShadow="md"
      >
        <AspectRatio ratio={2 / 3}>
          <Image
            src={movie.poster}
            alt={movie.title}
            fallback={<Skeleton />}
            rounded="md"
          />
        </AspectRatio>
        <Heading
          as="h3"
          size="md"
          textAlign="center"
          py="1rem"
          px="1rem"
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {`${movie.title[0].toUpperCase()}${movie.title.slice(1)}`}
        </Heading>
        <SimpleGrid
          px=".5rem"
          columns={
            {
              0: 1,
              1: 1,
              2: 2,
            }[movie.genres.length] || 3
          }
          spacing={3}
          textAlign="center"
        >
          {movie.genres.length > 0 ? (
            <>
              {movie.genres.slice(0, 2).map((genre) => (
                <Badge key={genre.id}>{genre.title}</Badge>
              ))}
              {movie.genres.length > 2 ? (
                <Badge as="button" variant="outline" cursor="pointer">
                  more...
                </Badge>
              ) : null}
            </>
          ) : (
            <Badge>no genres</Badge>
          )}
        </SimpleGrid>
      </ChakraBox>
    );
  };
  export default MovieCard;