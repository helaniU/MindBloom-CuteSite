import { StrictMode } from 'react'  //helps detect potential problems in React code during development
import { createRoot } from 'react-dom/client'   //used to create a React root for rendering the app
import App from './App.jsx'

createRoot(document.getElementById('root')).render(

  // Find the HTML element with id="root" and attach React app inside it
  <StrictMode>
    <App />
  </StrictMode>,
)
