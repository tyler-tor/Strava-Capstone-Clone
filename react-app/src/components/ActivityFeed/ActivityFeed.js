import React from 'react'

function ActivityFeed({routes}) {
    // console.log(routes)


  return (
    <div className='activity-feed-container'>
        {routes.map(route => {
            return (
                <div className='af-posts-container'
                key={route.id}>
                    <div className='post-info-container'>
                    {route.title}
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default ActivityFeed
