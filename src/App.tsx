import { createGlobalStyle } from 'styled-components';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import { store } from './redux/store';

import SearchFilesView from './pages/search-files/search-files-view';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background-color: #ecf0f1;
  }
`;

function App() {
  return (
    <Provider store={store}>
      <SearchFilesView />
      <GlobalStyles />
    </Provider>
  );
}

export default hot(App);
