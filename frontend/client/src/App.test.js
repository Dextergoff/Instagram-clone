import { render, screen } from '@testing-library/react';
import App from './App';
import ReduxTestProvider from 'modules/providers/ReduxTestProvider'
import { BrowserRouter} from "react-router-dom";

test('renders learn react link', () => {
  render(
  <BrowserRouter> 
      <App/>
  </BrowserRouter>
  );
});
