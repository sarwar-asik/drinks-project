console.log('hi from coktaildb');

const loadDrinks = async(searchUrl) =>{
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchUrl}`;
const res = await fetch(url);
const data = await res.json();
displayDrinks(data.drinks);

}
const displayDrinks = drinks =>{
            // console.log(drinks)
const drinksonstainer = document.getElementById("drinks-constainer" );
drinksonstainer.textContent = '';
drinks.forEach(drink => {
    // console.log(drink)
const drinksDiv = document.createElement('div');
drinksDiv.classList.add('col');
drinksDiv.innerHTML=`

<div class="card h-100 p-5 shadow-lg">
<img src="${drink.strDrinkThumb}" class="card-img-top" alt="...">
<div class="card-body">
  <h5 class="card-title">${drink.strIngredient2}</h5>
  <h6>Types: ${drink.idDrink}</h6>
  <p class="card-text">${drink.strInstructions.slice(0,30)}.</p>
  <button onclick="drinksDetail('${drink.idDrink}')" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Detail</button>
</div>

</div>

`;
drinksonstainer.appendChild(drinksDiv);

});
toggleSpiner(false);
}

/////this commmon function is for loader and show all button////
// const processSearch2 = ()=>{
  
//   const searchField = document.getElementById("search-field");
//   const searchText = searchField.value;
//   loadPhone(searchText)
  
// }

// for search /////
const processSearch = () =>{
  toggleSpiner(true);
  const searchField = document.getElementById("search-field");
  const searchFieldValue = searchField.value;
  
  loadDrinks(searchFieldValue);
  loadDrinks(searchFieldValue);
  searchField.value ='';
}

// for click button ///
document.getElementById("btn-search").addEventListener('click',function(){
  processSearch()
 
})

// for enter key ////
document.getElementById("search-field").addEventListener('keypress',function(mykey){

  if(mykey.key ==='Enter'){
    processSearch()
  }
})



// loading/////
const toggleSpiner = isLoading =>{
  const loaderSection = document.getElementById("loader");
  if(isLoading){
      loaderSection.classList.remove('d-none');
  }
  else{
      loaderSection.classList.add('d-none')
  }
}

const drinksDetail = async id =>{

  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayDrinksDetail(data.drinks)
}

const displayDrinksDetail = drink2 =>{
  drink2.forEach(drink =>{
  // console.log(drink)
  const detailContainer = document.getElementById("modal-container");
  const newDiv =document.createElement('div');
  newDiv.innerHTML = `
  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
  aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Drinks Name:${drink.strGlass}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div class="">
      <img src="${drink.strDrinkThumb}" alt="" class="img-fluid"></div>
      </div>
      <p><b>Elements</b> 1.${drink.strIngredient1},  2.${drink.strIngredient2},  3.${drink.strIngredient3}, </p>
      <p>${drink.strInstructions}</p>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

      </div>
    </div>
  </div>
</div>
  
  `;
detailContainer.appendChild(newDiv);
})

}


loadDrinks('a')

