import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import categories from './CategoriesList';
import { useEffect } from 'react';

function Categories(props){
  const navigate = useNavigate();

    return(
        <div className='cat-container d-flex'>
          <div className='pr-3'>All Categories</div>
          <div>
            { categories && categories.length > 0 && categories.map((item,index)=>{
              return(
                <span className='category' onClick={()=> navigate('/category/' + item)} key={index}>{item }</span>
              )
            })}
          </div>
        </div>
    )
}
export default Categories; 