'use client';
import { InstagramEmbed } from 'react-social-media-embed';
import React, { useEffect, useState } from 'react'

export default function InstagramClientBlock( { value }: { value: string }) {
  const [pageLoaded, setPageLoaded] = useState(false)
  useEffect(() => {
      setPageLoaded(true)
  }, [])
  return (
    <aside style={{ display: 'flex', justifyContent: 'center' }}>
      
              <InstagramEmbed url={value} width={328} />
          
</aside>
  )
}
