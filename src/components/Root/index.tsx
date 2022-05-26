// Root file for handling app routes and eveyrthing common for each route like snackbar

import { Suspense } from 'react';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';

import { useRoot } from 'context/RootContext';
import { CustomSnackbar } from 'components/Snackbar';
import { Main } from 'components/Layout';
import { authorizedRoutes, anonymousRoutes } from 'utils/routes'; // Assume that in real app we will have anonymous routes or maybe admin specific
import { RouteType } from 'utils/types';
import theme from 'utils/theme';

const Root = () => {
  const { notifications } = useRoot();
  const isLoggedIn = true; // Could take this from RootContext but also from the same auth service we get it in RootContext

  const renderComponents = (routesToRender: Array<RouteType>) => (
    <Routes>
      {routesToRender.map((r, i) => (
        <Route key={i} path={r.path} element={r.Component()} />
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
