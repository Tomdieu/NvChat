// import { ProSidebarProvider } from "react-pro-sidebar";
import Routes from "./routes";
import "@fontsource/roboto/400.css";
import AuthProvider from "provider/AuthProvider";
import ChatProvider from "provider/ChatProvider";
// import { ProSidebarProvider } from "react-pro-sidebar";

function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <Routes />
      </ChatProvider>
    </AuthProvider>
  );
}

export default App;
