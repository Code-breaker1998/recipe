// function Ani(){
//     this.eveg=true;
//     this.eme=false;
// }

// function H(){}
//     H.prototype=new Ani();

//     function c(){
//         this.eme=true;
//     }
//     c.prototype=new Ani();
// var rab=new H();
// var be =new c();

// console.log(rab.eme);
// console.log(be.eme);


mealsEi=document.querySelector('#meal')
searchbtn=document.getElementById('search-btn')
searchterm=document.getElementById('search-term')
closebtn=document.getElementById('meal-btn1');
nonemeal=document.getElementById('meal-container');
mealid1=document.getElementById('meal-header2');


getrandomMeal();


async function getrandomMeal(){
        const resp=await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
        const reps=await resp.json();
        const respmeal=reps.meals[0]
        
        addmeal(respmeal,true)
}

async function getmealbysearch(term){
        const resp=await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + term);
        const reps=await resp.json();
        const respmeal=reps.meals;

        return respmeal
}

function addmeal(mealdata,random=false){
   //console.log(mealdata)

            const meal=document.createElement('div')
            meal.classList.add('meal')
            
            meal.innerHTML=`
            <div class="meal-header">
                ${
                    random
                        ? `
                <span class="random"> Random Recipe </span>`
                        : ""
                }
                <img
                    src="${mealdata.strMealThumb}"
                    alt="${mealdata.strMeal}"
                />
            </div>
            <div class="meal-body">
                <h4>${mealdata.strMeal}</h4>
                <button class="fav-btn">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
        `;
        const btn=meal.querySelector('.meal-body .fav-btn')



        btn.addEventListener('click',()=>{
            if (btn.classList.contains('active')){
                removeMealLS(mealdata.idMeal)
                btn.classList.remove('active');
            }else{
                addMealLS(mealdata.idMeal)
                btn.classList.add('active');
            }
        });

        mealsEi.appendChild(meal)

        meal.addEventListener("click", () => {
                nonemeal.classList.remove('hidden');
                showmeal(mealdata);
            });
}

function addMealLS(mealid1){
        const mealID=getmealLS()
        localStorage.setItem('mealIDs',JSON.stringify([...mealID,mealid1]))
}

function removeMealLS(mealid1){
        const mealID=getmealLS()
        localStorage.setItem('mealIDs',JSON.stringify(mealID.filter((id)=> id!==mealid1)));
}

function getmealLS(){
        const mealIDs=JSON.parse(localStorage.getItem('mealIDs'));

        return mealIDs === null ? []:mealIDs;
}

searchbtn.addEventListener('click',async()=>{
        mealsEi.innerHTML=''

        const search=searchterm.value;
        const meals=await getmealbysearch(search)

        if(meals){
            meals.forEach((meal) => {
                addmeal(meal);
            });
        }
});

closebtn.addEventListener('click',()=>{
        nonemeal.classList.add('hidden');
});

function showmeal(meal){
            mealid1.innerHTML=''

            mealE1=document.createElement('div');

            const ingredient=[];

            for (i=0;i<=20;i++){
                if(meal['strIngredient'+i]){
                    ingredient.push(`${meal['strIngredient'+i]}-${meal['strMeasure'+i]}`)
                }
            }

            mealE1.innerHTML=  `<h1 class='meal-name'>${meal.strMeal}</h1>
                                <img src='${meal['strMealThumb']}',alt='None'>
                                <p>${meal['strInstructions']}</p>
                                <ul class='meal-underline'>
                                ${ingredient
                                    .map(
                                        (ing) => `
                                <li>${ing}</li>
                                `
                                    )
                                    .join("")}
                                </ul>
                                </div> 
                                </div>`
         //nonemeal.appendChild(mealE1);
            mealid1.appendChild(mealE1);

            nonemeal.classList.remove('hidden');
}