import { Input } from "@chakra-ui/react";

const SearchBar = ({ value, onChange, width, isAttached }: any) => {
  return (
    <Input
      type="search"
      w={width}
      maxW="30rem"
      style={isAttached ? {borderTopRightRadius: "0", borderBottomRightRadius: "0"} : {}}
      placeholder="Search for a movie"
      value={value}
      onChange={onChange}
   
    />
  );
};

export default SearchBar;