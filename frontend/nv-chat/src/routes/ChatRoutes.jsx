import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'

const ChatRoutes = () => {
  return (
    <>
        <Routes>
            <Route path='/discussion/:id' element={<div>Hello World</div>} />
            <Route path='/group/:id' element={<div>Group Id</div>} />
        </Routes>

        <Outlet/>
    </>
  )
}

export default ChatRoutes
