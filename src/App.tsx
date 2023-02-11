import React, { Suspense } from "react";
import { BrowserRouter as Router,
  Routes,
  Route,
  Navigate } from "react-router-dom";
import { Header, Modal } from "./components";

import { useAppSelector } from "./hooks/redux";
import routes from "./routes";


const App: React.FC = () => {

  const isAuth = useAppSelector(state => state.state.isAuth);

  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          {isAuth ? (
            <>
              {routes.private.map((route) => (
                <Route key={route.path} path={route.path} element={(
                  <Suspense fallback={(<span>Loading...</span>)}>
                    <route.element />
                  </Suspense>
                )} />
              ))}
            </>
          ) : (
            <>
              {routes.public.map((route) => (
                <Route key={route.path}  path={route.path} element={(
                  <Suspense fallback={(<span>Loading...</span>)}>
                    <route.element />
                  </Suspense>
                )} />
              ))}
            </>
          )}
          <Route path='*' element={<Navigate to={isAuth ? '/home' : '/login'} />} />
        </Routes>
      </Router>
      <Modal />
    </div>
  );
};

export default App;
