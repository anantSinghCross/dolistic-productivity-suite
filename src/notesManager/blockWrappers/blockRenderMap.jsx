import H1 from "./H1";
import { Map } from 'immutable'

export const blockRenderMap = Map({
  'custom-h1': {
    element: 'h1',
    wrapper: <H1/>
  }
})