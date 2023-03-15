import Login from "pages/auth/Login/Login";
import Register from "pages/auth/Register/Register";
import Home from "pages/home/Home";
import React from "react";
import { Route, Routes } from "react-router-dom";

import Group from "pages/chat/Group";
import { GroupContextProvider } from "Context/GroupContext";

type Props = {};

const index = (props: Props) => {
  return (
    <Routes>
      <Route path="/">
        <Route path="auth/">
          <Route path="" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="" element={<Home />} />
        <Route
          path="groups"
          element={
            <GroupContextProvider>
              <Group />
            </GroupContextProvider>
          }
        />
      </Route>
    </Routes>
  );
};

export default index;
