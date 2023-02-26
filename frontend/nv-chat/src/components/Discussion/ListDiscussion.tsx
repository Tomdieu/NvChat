import React from 'react'
import { Conversation } from 'types/ConversationSerializer'
import Discussion from './Discussion'

type Props = {
    conversations:Array<Conversation>;
}

const ListDiscussion = (props: Props) => {
  const {conversations} = props
  return (
    <>
    {conversations.length>0 && conversations?.map((conversation:Conversation,index:number)=>(
      <Discussion conversation={conversation} key={index}/>
    ))}
    </>
  )
}

export default ListDiscussion