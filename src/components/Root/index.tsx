// Root file for handling app routes and eveyrthing common for each route like snackbar
import React, { Suspense } from 'react';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';

import { useRoot } from 'context/RootContext';
import { CustomSnackbar } from 'components/Snackbar';
import { Main } from 'components/Layout';
// Assume that in real app we will have anonymous routes or maybe admin specific
import { authorizedRoutes, anonymousRoutes } from 'utils/routes';
import { RouteType } from 'utils/types';
import theme from 'utils/theme';

const Root = () => {
  const { notifications } = useRoot();
  const isLoggedIn = true; // Could take this from RootContext but also from the same auth service we get it in RootContext

  const renderComponents = (routesToRender: Array<RouteType>) => (
    <Routes>
      {routesToRender.map((route, i) => (
        <Route key={i} path={route.path} element={route.Component()} />
      ))}
    </Routes>
  );

  return (
    <Container>
      <Suspense fallback={<LinearProgress />}>
        {isLoggedIn ? (
          <Main>{renderComponents(Object.values(authorizedRoutes))}</Main>
        ) : (
          renderComponents(Object.values(anonymousRoutes))
        )}
      </Suspense>
      <CustomSnackbar items={notifications} />
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  background-color: ${theme.colors.background};
`;

export default Root;
