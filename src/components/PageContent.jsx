import React from 'react'
import AppRouter from './AppRouter';

const PageContent = ({locale}) => {
  return (
    <div className='pagecontent'>
      <AppRouter locale={locale} />
    </div>
  )
}

export default PageContent;
