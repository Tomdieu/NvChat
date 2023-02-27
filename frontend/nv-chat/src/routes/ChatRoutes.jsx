import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";

import { Container } from "layouts/index.tsx";

import DiscussionPage from "pages/chat/discussion"
import ProtectedRoute from "components/ProtectedRoute";

const ChatRoutes = () => {
  return (
    <>
      <Container>
        <Routes>
          <Route path="" element={<div>Welcome</div>} />
          <Route path="discussion/:id" element={<ProtectedRoute><DiscussionPage/></ProtectedRoute>} />
          <Route path="group/:id" element={<div>Group Id</div>} />
        </Routes>

        <Outlet />
      </Container>
    </>
  );
};

export default ChatRoutes;
