import Home from "pages/home/Home";
import Group from "pages/chat/Group";
import { GroupContextProvider } from "Context/GroupContext";

type Props = {};

const App = (props: Props) => {
  return (
    <>
      {/* <Home /> */}
      <GroupContextProvider>
        <Group />
      </GroupContextProvider>
    </>
  );
};

export default App;
