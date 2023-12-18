import Genres from "../../components/Home/Genres";
import Movies from "../../components/Home/Movies";
import { lazy, Suspense } from "react";

const Genres = lazy(() => import("../../components/Home/Genres"));
const Movies = lazy(() => import("../../components/Home/Movies"));

const Home = () => {
  return (
    <>
      <Genres />
      <Movies />
      <Suspense>
        <Genres />
        <Movies />
      </Suspense>
    </>
  );
};
export default Home;