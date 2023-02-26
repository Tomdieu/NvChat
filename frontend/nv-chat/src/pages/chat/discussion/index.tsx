import TopChatBar from 'components/TopChatBar'
import React from 'react'
import { useParams } from 'react-router-dom'

type Props = {}

const index = (props: Props) => {
  const {id} =useParams()
  return (
    <TopChatBar
              chatType={selectedChatType}
              name={selectedDiscussion.title}
            />
            {/* Chat Message Contents */}
            <MessageContainer messages={selectedDiscussion.messages}/>
            {/* Chat Input Component */}
            <InputMessageContainer />
  )
}

export default index