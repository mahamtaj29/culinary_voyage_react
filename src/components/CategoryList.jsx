import React from 'react'

export const CategoryList = ({title, onSelectCategory}) => {
   
    return (
    <>
        <h1 className='category-title'></h1>
        <div className="categories-row">
          {/* 
            categories.map((item)=> (
              <div className='category' key={item.id} onClick={()=>onSelectCategory(item.name)}>
                  <p>{item.name}</p>
              </div>
            ))
           */}
        </div>
    </>
  )
}
