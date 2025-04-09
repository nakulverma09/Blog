import React from 'react'

const TeamMember = ({user}) => {
  return (
    <div className='h-[200px] w-[200px] flex flex-col items-center justify-evenly border-b-2 border-gray-300'>
        <div className='flex flex-col items-center justify-center'>
            <span className='font-bold text-2xl'>{user.name}</span>
            <span className='text-sm font-medium'>{user.position}</span>
        </div>
        <div className='flex flex-col items-center justify-center'>
            <span className='font-medium text-base'>{user.username}</span>
            <span className='font-medium text-base'>{user.emailId}</span>
        </div>
    </div>
  )
}

export default TeamMember