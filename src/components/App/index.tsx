import { BrowserRouter } from 'react-router-dom';

import Root from 'components/Root';
import { RootProvider } from 'context/RootContext';

const App = () => {
  return (
    <RootProvider>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </RootProvider>
  );
};

export default App;
