// import { ProSidebarProvider } from "react-pro-sidebar";
import Routes from "./routes";
import "@fontsource/roboto/400.css";
import AuthProvider from "provider/AuthProvider";
import ChatProvider from "provider/ChatProvider";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ChatProvider>
          <Routes />
        </ChatProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
