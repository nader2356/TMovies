import { Box } from "@chakra-ui/react";
import { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import FullPageSpinner from "../../components/FullPageSpinner";

const Genres = lazy(() => import("../../components/Home/Genres"));
const Movies = lazy(() => import("../../components/Home/Movies"));

const Home = () => {
  const q = useParams().q;

  return (


    <Box as="main" w="full" pt={q ? "8rem" : "5rem"}>
      <Suspense>{!q ? <Genres /> : null}</Suspense>
      <Suspense fallback={<FullPageSpinner />}>
        <Movies searchQuery={q} />
      </Suspense>

    </Box>
  );
};

export default Home;