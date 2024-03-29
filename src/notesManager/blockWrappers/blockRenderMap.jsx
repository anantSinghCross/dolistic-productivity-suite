import { Map } from 'immutable'
import H1 from "./H1";
import H2 from "./H2";
import H3 from "./H3";
import BlockQuote from './BlockQuote';

export const blockRenderMap = Map({
  'custom-h1': {
    element: 'h1',
    wrapper: <H1/>
  },
  'custom-h2': {
    element: 'h2',
    wrapper: <H2/>
  },
  'custom-h3': {
    element: 'h2',
    wrapper: <H3/>
  },
  'custom-blockquote': {
    element: 'blockquote',
    wrapper: <BlockQuote/>
  }
})