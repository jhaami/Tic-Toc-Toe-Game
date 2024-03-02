// all boxes access 
let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");
let newGameBtn=document.querySelector("#new-btn");
let msgContainer= document.querySelector(".msg-container");
let msg=document.querySelector("#msg");




// altrnate game turn=X,O,X,O, it means X player ka turn baad O player, X ke baad click O aane chahiye
let turnO=true; //click O aaega;

// winning pattern store create 2D array aur u r also store string pattern
const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [2,4,6],
    [6,7,8],
    [3,4,5]
];
// boxes jo hain uspar click hone par kux action hona chahiye, eskiye addEventListener use karunga
// sab boxex me click karwana hain action hona chahiye esliye forEach rakhunga

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("yes working")
        // aab value ka acces karna hain jiska turn hain 
        if(turnO){//player O ka turn hain
            box.innerText="O";
            turnO=false;//aab O apna turn karliya X ka turn ke liye
        }
        else{
            box.innerText="X";
            turnO=true;
        }
        // yeh esliye select kiya gaya ki upper wale code se O player wale button pe X player click karta tha aur value change ho jata tha 
        box.disabled=true;//ek bar jab apni turn khel di to aab dubara change nahi kar sakte

        // now, winner check
        checkWinner();

    })
});
//winner ho gaya to box ka disabled karna hai jo phir game na khele
const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};
//again new game ke liye
const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

//show the winner 
const showWinner=(winner)=>{
    msg.innerText=`Congratulation, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const drowMatch=()=>{
    let draw=true;
    for (let box of boxes) {
        if (box.innerText === "") {
            draw = false;
            break;
        }
    }

    if (draw) {
        msg.innerText = "It's a draw!";
        msgContainer.classList.remove("hide");
    }
};
const resetGame=()=>{
    turnO=true;
    enableBoxes();
    msgContainer.classList.add("hide");
}
const checkWinner=()=>{
    for(let pattern of winPatterns){// esse pattern nikelega like:0,1,2; 0,3,6;
        console.log(pattern);// output in array like:[0, 1, 2],[0, 3, 6];
        console.log(pattern[0],pattern[1],pattern[2]);//individual index aab nikala hain aur position check in value like: 0,1,2; 0,3,6;
        console.log(boxes[pattern[0]],boxes[pattern[1]],boxes[pattern[2]])//html ka button acces hoga position ke sath

        let posVal1=boxes[pattern[0]].innerText;
        let posVal2=boxes[pattern[1]].innerText;
        let posVal3=boxes[pattern[2]].innerText;

        if(posVal1!=="" && posVal2!=="" && posVal3!==""){
            if(posVal1===posVal2 && posVal2===posVal3){
                showWinner(posVal1);//who are winner calling
            }
        }
    }
    drowMatch();
};
newGameBtn.addEventListener('click',resetGame);
resetBtn.addEventListener('click',resetGame);



