import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";

import { Container } from "layouts/index.tsx";

const ChatRoutes = () => {
  return (
    <>
      <Container>
        <Routes>
          <Route path="" element={<div>Welcome</div>} />
          <Route path="discussion/:id" element={<div>Hello World discussion</div>} />
          <Route path="group/:id" element={<div>Group Id</div>} />
        </Routes>

        <Outlet />
      </Container>
    </>
  );
};

export default ChatRoutes;
