import "./App.css";
import Body from "./components/Body";

import { store } from "./utils/Appstore";
import { Provider } from "react-redux";
import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const Error = lazy(() => import("./components/Error"));
const Login = lazy(() => import("./components/Login"));
const Register = lazy(() => import("./components/Register"));
const Browse = lazy(() => import("./components/Browse"));
const Home = lazy(() => import("./components/Home"));
const Contact = lazy(() => import("./components/Contact"));
const About = lazy(() => import("./components/About"));
const VideoDetail = lazy(() => import("./components/Youtubemain"));
const Watchlist = lazy(() => import("./components/Watchlistmovies"));
const Youtubesearchresult = lazy(() =>
  import("./components/Youtubesearchresult")
);
import { SkeletonDemo } from "./components/Skeletonui";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Body />}>
          <Route
            index
            element={
              <Suspense fallback={<SkeletonDemo count={10} />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="contact"
            element={
              <Suspense fallback={<SkeletonDemo count={10} />}>
                <Contact />
              </Suspense>
            }
          />
          <Route
            path="/watchlist"
            element={
              <Suspense fallback={<SkeletonDemo count={10} />}>
                <Watchlist />
              </Suspense>
            }
          />
          <Route
            path="/video/:id"
            element={
              <Suspense fallback={<SkeletonDemo count={20} />}>
                <VideoDetail />
              </Suspense>
            }
          />
          <Route
            path="movie/:id"
            element={
              <Suspense fallback={<SkeletonDemo count={10} />}>
                <About />
              </Suspense>
            }
          />
          <Route
            path="login"
            element={
              <Suspense fallback={<SkeletonDemo count={10} />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="register"
            element={
              <Suspense fallback={<SkeletonDemo count={10} />}>
                <Register />
              </Suspense>
            }
          />
          <Route
            path="browse"
            element={
              <Suspense fallback={<SkeletonDemo count={10} />}>
                <Browse />
              </Suspense>
            }
          />
          <Route
            path="youtubesearch"
            element={
              <Suspense fallback={<SkeletonDemo count={10} />}>
                <Youtubesearchresult />
              </Suspense>
            }
          />

          <Route
            path="*"
            element={
              <Suspense fallback={<SkeletonDemo count={10} />}>
                <Error />
              </Suspense>
            }
          />
        </Route>
      </>
    )
  );

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
