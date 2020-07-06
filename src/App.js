import React, { useEffect } from 'react';
import Recipe from'./Recipe';
import './App.css';



const App= () => {

  const APP_ID="dbe23781";
  const APP_KEY="c21381e26566870fc6abe47a1c003831";
 
  const[recipes,setRecipes]= React.useState([]);
  const[search, setSearch]=React.useState("");
  const[query, setQuery]=React.useState('chicken')
  
  useEffect(() => {
   getreceipes();
  },[query]);

  const getreceipes= async() => {
    const response= await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
    const data= await response.json();
    setRecipes(data.hits);

    console.log(data.hits);


    

  };

const updatesearch=e=>{
setSearch(e.target.value);

}

const getSearch=e=>{
e.preventDefault();
setQuery(search);
setSearch('');
}


return(
<div className="mainclass">
<form onSubmit={getSearch} className="search-form" >
  <input  className="search-bar" type="text" value={search} onChange={updatesearch}/>
  <button className="search-button" type="submit">Search</button>
  
</form>
<div className="individual-Recipe-box">
{recipes.map(recipe=>(
  <Recipe 
  key={recipe.recipe.label}
  title={recipe.recipe.label} 
  calorie={recipe.recipe.calories}
  image={recipe.recipe.image}
  ingredients={recipe.recipe.ingredients}
  
  />

))}
</div>
</div>
);
};


export default App;
