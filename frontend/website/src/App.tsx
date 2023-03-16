import Home from "pages/home/Home";
import Group from "pages/chat/Group";
import { GroupContextProvider } from "Context/GroupContext";
import Login from "pages/auth/Login/Login";
import Register from "pages/auth/Register/Register";

import Routes from "routes";
type Props = {};

const App = (props: Props) => {
  return (
    <>
      {/* <Home /> */}
      {/* <GroupContextProvider>
        <Group />
      </GroupContextProvider> */}
      {/* <Login /> */}
      {/* <Register /> */}
      <Routes />
    </>
  );
};

export default App;
