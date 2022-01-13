/*
    - JS code for Memory Card Game Project for ITI-JavaScript Course
    - Team Number 6
    - Team Members :
        Noor .............
        Mohamed Adel Saleh
        Omer .............
        Ahmed Medhart ....
        Eman Hesham ......
    - SuperVisors:
        Mahmoud ElBasha
        Aya Hassan
*/

/* ---------------------------------------------------------------------------------------------------------------------------*/


/************************************************ Getting Elements From HTML *****************************/


let inputSection = document.querySelector(".input_playerData input");  // Player Input Element getting His Name
let StartBtn = document.querySelector(".popup_StartButton button");    // Start Button Element
let startGameDiv = document.querySelector(".popup_reloadScreen");      // The Main Div
let playerScore =document.querySelector(".listOfScores");
let scoreMainList=document.querySelector(".ListContainer");
let listScoreBtn=document.querySelector(".scoreBottomOk button");
/************************************************** Player Data ******************************************/

let ArrOfAddedData =[];

startGameDiv.style.display = 'none';
/************************************ Set Player Data in Array ********************************************/

function setPlayerData (playerName)
{
    let savedData = {
    id:Date.now(),
    text:playerName,
    score:380,
    };
    ArrOfAddedData.push(savedData);
    console.log(ArrOfAddedData);
}

/***************************************** Save Data in Array From localstorge even After Reload *******************************/

if(localStorage.key(0)!=null)
{
    for(let i=0; i<localStorage.length;i++)
    {
        ArrOfAddedData[i]={id:parseInt(localStorage.key(i)),text:JSON.parse(localStorage.getItem(localStorage.key(i)))[0],score:JSON.parse(localStorage.getItem(localStorage.key(i)))[1]};
        if(ArrOfAddedData[i].score >= 0)
        {
            let InitMessage2=document.querySelector(".NoDataMessage")

            if(document.body.contains(document.querySelector(".NoDataMessage")))
            {
                InitMessage2.remove();
            }

            let playerSpan=document.createElement("span");
            let textComp= document.createTextNode(ArrOfAddedData[i].text);
            playerSpan.setAttribute("id",ArrOfAddedData[i].id);
            playerSpan.appendChild(textComp);
            playerSpan.className='dataBox';

            let scoreeData= document.createElement("span");
            let textScore= document.createTextNode(ArrOfAddedData[i].score);
            scoreeData.appendChild(textScore);
            scoreeData.className = 'NumericalScore';

            playerSpan.appendChild(scoreeData);
            playerScore.appendChild(playerSpan);
        }
    }

}

/**************************** Delete From Array *****************************/

function deleteDataWith(DataID)
{
  ArrOfAddedData=ArrOfAddedData.filter(function deleteFromArray(f)
  {
    return f.id!=DataID;
  });
}


/*********************************************** When Press Start The Game ****************************/

function StartGameBtn()
{
    let repeatedName= 0;

    if(inputSection.value ==='')
    {

        Swal.fire(
            `You Didn't Enter Your Name`,
            'Please Enter Your Name First!',
            'error'
            )
    }
    
    else
    {
        for(let i=0;i<ArrOfAddedData.length;i++)
        {
            if(ArrOfAddedData[i].text==inputSection.value)
            {
                repeatedName=1;
                Swal.fire({
                    title: 'You entered Duplicated Name do you want to resume or New Start',
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Resume',
                    denyButtonText: `New Start`,
                    icon: 'warning',
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                    Swal.fire('Resumed', '', 'success')
                    console.log(JSON.parse(localStorage.getItem(localStorage.key(i)))[1]);

                    } else if (result.isDenied) {
                    Swal.fire('You Shold Enter New Name', '', 'info');
                    deleteDataWith(localStorage.key(i));
                    localStorage.removeItem(localStorage.key(i))[0];
                    }
                })
                break;
            }            
        }
        if(!repeatedName)
        {
                setPlayerData(inputSection.value);
                inputSection.value='';
                ArrOfAddedData.forEach((savedData)=>{
                    if(savedData.score == 380)
                    {
                        localStorage.setItem(savedData.id,JSON.stringify([savedData.text,savedData.score]));
                        console.log(savedData.text);
                    }
                });
                startGameDiv.style.display = 'none';
                scoreMainList.style.display = 'inline-block';
            } 
        }
    }

    /******************** When Press Ok on The Score list Ok Button it will disappear ******************************************/

function listScoreBtneffect ()
{
    scoreMainList.style.display = 'none';
    startGameDiv.style.display = 'inline-block';
}

    /****************************************** Events ************************************************************************/

StartBtn.addEventListener('click',StartGameBtn);

listScoreBtn.addEventListener('click',listScoreBtneffect)


/********************************************* Inside The Game  ***************************************************************/




/********************************************** Score Screen *******************************************/