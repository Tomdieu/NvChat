import { ProSidebarProvider } from 'react-pro-sidebar'
import Routes from './routes'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {

  return (
    <ProSidebarProvider>

   <Routes />
    </ProSidebarProvider>
  )
}

export default App
