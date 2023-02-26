import { useAuthContext } from 'context/AuthContext'
import { useChatContext } from 'context/ChatContext'
import React, { useEffect, useState } from 'react'
import { GroupSerializer } from 'types/GroupSerializer'
import ApiService from 'utils/ApiService'
import Group from './Group'

type Props = {
  groups:GroupSerializer[]
}

const ListGroups = (props: Props) => {
  const {groups} = props;
  const [_groups,_setGroups] = useState(groups)
  return (
    <>
      {_groups.map((group:GroupSerializer,index:number) => (
        <Group group={group} key={index}/>
      ))}
    </>
  )
}

export default ListGroups