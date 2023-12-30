import { Spinner, Center } from "@chakra-ui/react";

const FullPageSpinner = () => {
  return (
    <Center w="100vw" h="100vh">
      <Spinner size="xl" />
    </Center>
  );
};

export default FullPageSpinner;