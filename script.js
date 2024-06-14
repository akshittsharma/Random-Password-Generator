const inputSlider=document.querySelector("[data-lengthSlider]");
const lengthDisplay=document.querySelector("[data-lengthNumber]");

const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copyBtn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-copyMSg]");
const uppercaseCheck=document.querySelector('#uppercase');
const lowercaseCheck=document.querySelector('#lowercase');
const numbersCheck=document.querySelector('#numbers');
const symbolCheck=document.querySelector('#symbols');

const indicator=document.querySelector("[data-Indicator]");
const generateBtn=document.querySelector(".generate-button");
const allCheckBox=document.querySelectorAll("input[type=checkbox]");
const symbol="!#$%&'()*+,-./:;<=>?@[\]^_`{|}~";


let password="";
let passwordLength=10;
let checkCount=0;
handleSlider();
setIndicator('#ccc')

//set strength circle color to grey



//set length as per slider length
function handleSlider(){
        inputSlider.value=passwordLength;
        lengthDisplay.innerText=passwordLength; 
        
        const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"
      
        
}

function setIndicator(color){
        indicator.style.backgroundColor=color;
        indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;

}


function getRndInteger(min,max){
       return  Math.floor( Math.random()* (max-min))+min;
}

function generateRandomNumber(){
        
       return getRndInteger(0,9);
}

function generateLowerCase(){
        return String.fromCharCode(getRndInteger(97,123));
}

function generateUpperCase(){
        return String.fromCharCode(getRndInteger(65,91));
}

function generateSymbol(){
        const randNum=getRndInteger(0,symbol.length);
        return symbol.charAt(randNum);
}




function strength(){
        let hasUpper=false;
        let hasLower=false;
        let hasNumber=false;
        let hasSymbol=false;
        
        if(uppercaseCheck.checked)       hasUpper=true;
        if(lowercaseCheck.checked)      hasLower=true;
        if(numbersCheck.checked)        hasNumber=true;
        if(symbolCheck.checked)        hasSymbol=true;
        
        
        if(hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength>=8) setIndicator('#0f0');
        else if( (hasLower||hasUpper) && (hasNumber|| hasSymbol) && passwordLength>=6) setIndicator('#ff0');
        else setIndicator('#f00');
        
}

async function copyContent(){
    try{
        await  navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="copied";
    }  
    catch(e){
        copyMsg.innerText="failed";
    }
      
}
copyMsg.classList.add('active');

setTimeout(()=>{copyMsg.classList.remove('active');},2000);



function handleCheckBoxChange(){
        checkCount=0;
        allCheckBox.forEach(
        (checkbox)=>{ if(checkbox.checked) checkCount++; });
        
        if(passwordLength<checkCount){
                passwordLength=checkCount;
                handleSlider();
                
        }

}

function shufflePassword(array){
        for(let i=array.length-1;i>0;i--){
                const j=Math.floor(Math.random()*(i+1));
                const temp=array[i];
                array[i]=array[j];
                array[j]=temp;
        }
        
        let str="";
        array.forEach((el)=>(str+=el));
        return str;

}

inputSlider.addEventListener('input',(e)=>{
        passwordLength=e.target.value;
        handleSlider();

})


copyBtn.addEventListener('click', ()=>{
        if(passwordDisplay.value) copyContent();

})


allCheckBox.forEach((checkbox)=>{checkbox.addEventListener('change',handleCheckBoxChange);})


generateBtn.addEventListener('click',()=>{
        
        
        //none of the checkbox is checked
        
        
        if(checkCount==0) return;
        
        
        if(passwordLength<checkCount){
                passwordLength=checkCount;
                handleSlider();
        }
        
        //remove empty string
        
 
        
        
        // if(uppercaseCheck.checked) password+=generateUpperCase();
        // if(lowercaseCheck.checked) password+=generateUpperCase();
        // if(numbersCheck.checked) password+=generateRandomNumber();
        // if(symbolCheck.checked) password+=generateSymbol();
        
        console.log("starting the journey");
        let funcArr=[];
        if(uppercaseCheck.checked) funcArr.push(generateUpperCase);
        if(lowercaseCheck.checked) funcArr.push(generateLowerCase);
        if(numbersCheck.checked) funcArr.push(generateRandomNumber);
        if(symbolCheck.checked) funcArr.push(generateSymbol);
        
        console.log("CA done");
        //compulsory addition
        password="";
        for(let i=0;i<funcArr.length;i++){
       
                password+=funcArr[i]();    
               
        }
      
        for(let i=0;i<passwordLength-funcArr.length;i++){
        
                let randIndex=getRndInteger(0,funcArr.length);

           
                password+=funcArr[randIndex]();
        }
        
 
        //shuffle the password
        password=shufflePassword(Array.from(password));
        
        console.log("shuffling done");
        passwordDisplay.value=password;
        
        //calculate Strength 
        strength();
        console.log("all done");

})

