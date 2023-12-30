import {
  Modal,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormControl,
  FormLabel,
  Image,
  Stack,
  useBoolean,
  Spinner,
  Checkbox,
  SimpleGrid,
  Text,
  CheckboxGroup,
  AspectRatio,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllGenres } from "../../api/genres";
import { useToast } from "../../context/toast";
import { INewMovie } from "../../utils/interfaces";
import { createMovie } from "../../api/movies";
type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isOpen: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClose: any;
  token: string;
};
interface IGenre {
  title: string;
  id: string;
  checked: boolean;
}
const DEFAULT_NEWMOVIE: INewMovie = {
  title: "",
  poster: "",
  genres: [],
};
const AddMovieModel = ({ isOpen, onClose, token }: Props) => {
  const [newMovie, setNewMovie] = useState<INewMovie>(DEFAULT_NEWMOVIE);
  const [isImgBroken, setIsImgBroken] = useBoolean(true);
  const [checkedGenres, setCheckedGenres] = useState<IGenre[] | null>(null);
  const queryClient = useQueryClient();
  const toast = useToast();
  const { isError, isLoading, isSuccess } = useQuery({
    queryKey: ["genres"],
    queryFn: getAllGenres,
    onSuccess: (genres) => {
      setCheckedGenres(
        genres.map((genre) => ({
          id: genre.id,
          title: genre.title,
          checked: false,
        }))
      );
    },
    refetchOnWindowFocus: false,
  });
  const { mutate, isLoading: isCreatingMovie } = useMutation({
    mutationFn: createMovie,
    onSuccess: (response) => {
      toast({
        title: "Movie Created",
        description: `Movie \"${response.title}\" added to the list.`,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-left",
      });
      onClose();
      setNewMovie(DEFAULT_NEWMOVIE);
      setCheckedGenres((prev) => {
        if (prev) {
          return prev.map((item) => ({ ...item, checked: false }));
        } else {
          return prev;
        }
      });
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
    onError: (err: any) => {
      const toastConfig = {
        title: "Something Wrong",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-left",
      };
      if (err.response.data.error) {
        return toast({ ...toastConfig, description: err.response.data.error });
      }
      toast({ ...toastConfig, description: err.message });
    },
  });
  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setNewMovie((prev: INewMovie) => ({ ...prev, [name]: value }));
  };
  const handleCheckboxChange = (position: number) => {
    setCheckedGenres(
      (prev) =>
        prev &&
        prev.map((genre, i) => {
          if (i !== position) return genre;
          return { ...genre, checked: !genre.checked };
        })
    );
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (checkedGenres) {
      const isCheckedGenres = checkedGenres
        .slice(0)
        .filter((genre) => genre.checked);
      const genresIds = isCheckedGenres.map((genre) => genre.id);
      mutate([{ ...newMovie, genres: genresIds }, token]);
    }
  };
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
    >
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>Add your Movie</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <FormControl isRequired>
                <FormLabel>Movie Name:</FormLabel>
                <Input
                  name="title"
                  value={newMovie.title}
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Movie Poster URL:</FormLabel>
                <Input
                  name="poster"
                  value={newMovie.poster}
                  onChange={handleChange}
                  borderWidth="2px"
                  required
                />
                <AspectRatio
                  ratio={2 / 3}
                  mx="auto"
                  mt="1rem"
                  w="15rem"
                  display={!isImgBroken ? "block" : "none"}
                >
                  <Image
                    src={newMovie.poster}
                    onError={setIsImgBroken.on}
                    onLoad={setIsImgBroken.off}
                  />
                </AspectRatio>
              </FormControl>
              <FormControl>
                <FormLabel onClick={(event) => event.preventDefault()}>
                  Genre
                </FormLabel>
                <SimpleGrid p="1rem" columns={isLoading ? 1 : 3}>
                  {isLoading ? <Spinner mx="auto" /> : null}
                  {isSuccess && checkedGenres ? (
                    <CheckboxGroup>
                      {checkedGenres.map((genre, i) => (
                        <Checkbox
                          key={genre.id}
                          isChecked={checkedGenres[i].checked}
                          onChange={() => handleCheckboxChange(i)}
                          p=".5rem"
                        >
                          {genre.title}
                        </Checkbox>
                      ))}
                    </CheckboxGroup>
                  ) : null}
                  {isError ? <Text>failed</Text> : null}
                </SimpleGrid>
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              disabled={isError || isLoading || isImgBroken}
              colorScheme="linkedin"
              mr={3}
              type="submit"
              isLoading={isCreatingMovie}
            >
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
export default AddMovieModel;