import { Box } from '@mui/material'
import React from 'react'
import Message from './Message'

const messages= [
  {
    id:1,
    sender:{
      "user":{
        "username": "ivantom"
      }
    },
    group:1,
    "message":{
      "text": "Hello",
      "resourcetype": "TextMessage",
      "created_at": "2023-02-24T10:25:22.494586Z",
    }
  },
  {
    id:1,
    sender:{
      "user":{
        "username": "ivantom"
      }
    },
    group:1,
    "message":{
      "text": "Hello",
      "resourcetype": "TextMessage",
      "created_at": "2023-02-24T10:25:22.494586Z",
    }
  },
  {
    id:1,
    sender:{
      "user":{
        "username": "navi"
      }
    },
    group:1,
    "message":{
      "text": "Hello",
      "resourcetype": "TextMessage",
      "created_at": "2023-02-24T10:25:22.494586Z",
    }
  }
]

const MessageList = () => {
  return (
    <Box sx={(theme)=>({padding:theme.spacing(2)})}>
      {messages?.map((msg,index)=>(
        <Message style={{float:"left",backgroundColor:'red'}} msg={msg} key={index}/>
      ))}
    </Box>
  )
}
  
export default MessageList