import Widget from './Widget';
import { createPortal } from 'react-dom';

const App = () => {
  return (
    createPortal(
      <Widget />,
      document.getElementById('ecowiser-verified')
    )
  )
}

export default App