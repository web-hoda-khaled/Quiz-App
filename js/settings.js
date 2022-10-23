import { Quiz } from './quiz.js';

export class Settings {
   constructor (){

   //select element 
      this.categoryElement = document.getElementById("category") ;
      this.difficultyElement = document.getElementsByName("difficulty") ; 
      this.numberOfQuestionsElement = document.getElementById("numberOfQuestions") ; 
      this.startBtn = document.getElementById("startBtn") ; 


   //event on button (startBtn)
      this.startBtn.addEventListener("click" , this.startQuiz.bind(this))

   }

//function it will be start when user clicked the button
   async startQuiz(){
      let categoryValue = this.categoryElement.value ; 
      let difficultyValue = Array.from(this.difficultyElement).filter( elem => elem.checked)[0].value;
      let numberOfQuestionsValue = this.numberOfQuestionsElement.value;
      let API = `https://opentdb.com/api.php?amount=${numberOfQuestionsValue}&category=${categoryValue}&difficulty=${difficultyValue}`
   
   //invoked fetchAPI(API)
   let finalReslut = await this.fetchAPI(API)


   if(numberOfQuestionsValue == ""){
      $("#alert1").slideDown(300)
   }

   if(finalReslut.length> 0){
      $("#setting").fadeOut(500 , () =>{
         $("#quiz").fadeIn(500)
      }) 

      let quiz = new Quiz(finalReslut)
   }

   }

//fetchAPI
   async fetchAPI(API){
      let response = await fetch(API);
         response = await response.json()
      // return finalResult
         return response.results
   }
}