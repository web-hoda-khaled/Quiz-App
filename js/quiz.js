export class Quiz{
   constructor(finalReslut){
      this.finalReslut  = finalReslut ;
      this.numOfques =  finalReslut.length
      this.score = 0
      this.currentIndex = 0
      this.nextQues = document.getElementById("next")
      this.tryAgain = document.getElementById("tryBtn")

   // add event on nexxt button 
      this.nextQues.addEventListener("click" , this.getNextQues.bind(this) )

   // add event on tryAgin to swap t setting section
      this.tryAgain.addEventListener("click" , function(){
         $("#finish").fadeOut(500 , _ => {
            $("#setting").fadeIn(500)
         } )
      })
   
   // invoked display()
      this.display()
   }

// random Array
   shuffle(array) {
      let currentIndex = array.length,  //4  [1, 2 ,3, 4]   => [4, 2, 3, 1]
         randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex != 0) { //1

          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex); //0
          currentIndex--; //0

          // And swap it with the current element.
         [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
      }

      return array;
}
   
//desplay function
   display(){
   document.getElementById("question").innerHTML = this.finalReslut[this.currentIndex].question;
   document.getElementById("currentQuestion").innerHTML = this.currentIndex + 1
   document.getElementById("totalNumberOfQuestions").innerHTML = this.numOfques 

// array of answar
   
   let answer = [ this.finalReslut[this.currentIndex].correct_answer, ...this.finalReslut[this.currentIndex].incorrect_answers]
   console.log(answer);


//invoked suffle(array)
   this.shuffle(answer) ;
   
   console.log(answer);

//display in inner html
   let html = ""
   for (let i = 0; i < answer.length; i++) {
      html +=
      `<label class="form-check-label ps-5">
      <input type="radio" class="form-check-input" name="answer" value="${answer[i]}">
      ${answer[i]}
      </label> <br/>`
      }
   document.getElementById("rowAnswer").innerHTML = html

   }


// getNextQues
   getNextQues(){

if (Array.from( document.getElementsByName("answer")).filter(elem => elem.checked) != 0) {
   let correctAnswer = this.finalReslut[this.currentIndex].correct_answer;
   let answerValue = Array.from( document.getElementsByName("answer")).filter(elem => elem.checked)[0].value;
      // invoked checkUserAnswer()
      this.checkUserAnswer(correctAnswer , answerValue)

      this.currentIndex++
   if (this.numOfques > this.currentIndex) {
   // invoked display()
      this.display()
   }

   else{
      $("#score").text(this.score)
      $("#quiz").fadeOut(500 , _ =>{
         $("#finish").fadeIn(500 )
      })
   }

   $("#alert").fadeOut(500)

}
else{
   $("#alert").fadeIn(500)
}

   }

//checkUserAnswer
   checkUserAnswer(correct_answer , userAnswer){
      if (correct_answer == userAnswer) {
         $("#Correct").fadeIn(600).fadeOut(600)
         this.score++
      }
      else{
         $("#inCorrect").fadeIn(600).fadeOut(600)
         
      }
   }
}