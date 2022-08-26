// const submit = document.querySelector(".form");
// const ticketForm = document.getElementsByClassName("test")[0];
const btnAddTicket = document.querySelector(".btn-add");
const btnCancelForm = document.querySelector(".btn-cancel-form");
const formTicket = document.querySelector(".form-ticket");
const formTypeSelector = document.querySelector(".form-type");
const formDurationSelector = document.querySelector(".ticket-duration");
const foodTokenRadioBtn = document.querySelectorAll("input[name='food_token']");
const mainSubmitBtn = document.querySelector(".btn-main-submit");

// Fixed value
const FOOD_PRICE = 500;

//Place order btn click
mainSubmitBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    console.log("btn click")
    const value = totalCostCalculator();
    const modalClass = document.getElementById("myModal");
    modalClass.style.display = "block";
    // setTimeout(modalClose,5000);
    

});

window.onclick = function(event) {
    const modal = document.getElementById("myModal");
    if (event.target == modal) {
      modal.style.display = "none";
    }
}


// Ticket type Selector value changed
formTypeSelector.addEventListener("change", (e) => {
  e.preventDefault();
  //   let ticketCost = 0;
  //   const selectedTicketType =
  //     document.getElementsByClassName("form-type")[0].value;
  // //   console.log("selectedTicketType: ", selectedTicketType);
  //   const ticketTypeObject = ticketTypeChecker(selectedTicketType);
  //   console.log("ticketTypeObject: ", ticketTypeObject);
  //   // Intial Cost
  //   const initialCost = ticketTypeObject.initialCost;
  //   ticketCost = ticketCost + initialCost;

  //   const isAnnualMember = annualMemberChercker(ticketTypeObject);
  //   const radioBtnsFD = document.querySelectorAll("input[name='food_token']");

  //   console.log(isAnnualMember);
  //   console.log("isAnnualMember == true", isAnnualMember == true)
  //   if (!isAnnualMember) {
  //     debugger
  //     // Removing the restrictions/enabling fields
  //     const ticketDurationField =
  //       document.getElementsByClassName("ticket-duration")[0];
  //     console.log(ticketDurationField);

  //     ticketDurationField.disabled =false; // Ticket time duration field disabled
  //     radioBtnsFD[0].disabled =false; // ticket radio button  field disabled
  //     radioBtnsFD[1].disabled =false;// ticket radio button  field disabled

  //     debugger;
  //     // Duration Cost
  //     const selectedTicketDuration =
  //       document.getElementsByClassName("ticket-duration")[0].value;
  //     const durationCost = ticketDurationCherker(
  //       ticketTypeObject,
  //       selectedTicketDuration
  //     );
  //     ticketCost = ticketCost + durationCost;
  //     //Food token cost from radio btns

  //     const isFoodToken = foodTokenChecker(radioBtnsFD);

  //     if (isFoodToken) ticketCost = ticketCost + FOOD_PRICE;

  //   } else {
  //     debugger
  //     // Restrictions
  //     const ticketDurationField =
  //     document.getElementsByClassName("ticket-duration")[0];
  //   console.log(ticketDurationField);

  //   ticketDurationField.disabled =true; // Ticket time duration field disabled
  //   radioBtnsFD[0].disabled =true; // ticket radio button  field disabled
  //   radioBtnsFD[1].disabled =true;// ticket radio button  field disabled

  //   }

  //   const amount = document.getElementsByClassName("tickect-amount")[0];
  //   amount.innerHTML = `${ticketCost}.00`;
  ticketCostCalculator();
});

//radioButtons
foodTokenRadioBtn[0].addEventListener("click", (e) => {
//   e.preventDefault();
  console.log("foodTokenRadioBtn[0]",foodTokenRadioBtn[0])
//   foodTokenRadioBtn[0].checked = true;
//   foodTokenRadioBtn[1].checked = false;
  ticketCostCalculator();
});

foodTokenRadioBtn[1].addEventListener("click", (e) => {
//   e.preventDefault();
//   foodTokenRadioBtn[1].checked = true;
//   foodTokenRadioBtn[0].checked = false;
  ticketCostCalculator();
});

// Duration period selector value changed
formDurationSelector.addEventListener("change", (e) => {
  e.preventDefault();
  ticketCostCalculator();
});

// Closing and Submition of the ticket form
formTicket.addEventListener("submit", (e) => {
  e.preventDefault();
//   console.log("formTicket submitted:");

  const obj = valueReader();
  console.log("Obj: ");
  console.log(obj);

  document.getElementsByClassName("no-ticket")[0].style.display = "none";
  document.getElementsByClassName("purchase")[0].style.display = "flex";

  let ticketCost = 0;

  const selectedTicketType = ticketTypeChecker(obj.ticketType);
  console.log(selectedTicketType);
  ticketCost = ticketCost + selectedTicketType.initialCost;

  const isAnnualMember = annualMemberChercker(selectedTicketType);
  console.log("isAnnualMember",isAnnualMember);
  let duraionCost = 0;
  let foodCost =0;

  if(!isAnnualMember){
  duraionCost = ticketDurationCherker(selectedTicketType,obj.ticketDuration);
  ticketCost =ticketCost +duraionCost;
  const isFoodToken = obj.isFoodToken;
  if(isFoodToken) {
    foodCost = FOOD_PRICE;
    ticketCost = parseInt(ticketCost) +foodCost;
}
  }

//   const addedTicketObj = {
//     ticketType: selectedTicketType.type,
//     ticketDuration: obj.ticketDuration,
//     isFoodToken:obj.isFoodToken,
//     selectedTicketType: selectedTicketType,
//     initialCost:selectedTicketType.initialCost,
//     duraionCost:duraionCost,
//     foodCost: foodCost,
//     totalCost:ticketCost,
//   }
const createdObj = addedTicketObjectConstructor(selectedTicketType,obj,duraionCost,foodCost);
addedTicketArray.push(createdObj);
console.log(addedTicketArray);
createCard();
const totalAmount = totalCostCalculator();
document.getElementsByClassName("total-ticket-amount-numeric")[0].innerHTML =totalAmount;

document.getElementsByClassName("selection")[0].style.display = "none";
// document.getElementsByClassName("btn-cancel-form-item")[0].style.display = "none";
btnAddTicket.style.display = "flex";

ticketFormResetor();

 
});





// Opening (displaying) the Ticket form
btnAddTicket.addEventListener("click", (e) => {
  e.preventDefault();
//   console.log("btnAddTicket : click ");
//   console.log(e);

  const selectionContainer = document.getElementsByClassName("selection")[0];
  selectionContainer.style.display = "flex";
  btnAddTicket.style.display = "none";
});

// Cancel button of the Ticket form
btnCancelForm.addEventListener("click", (e) => {
  e.preventDefault();
//   console.log("btnCancelForm : click");
//   console.log(e);
  const selectionContainer = document.getElementsByClassName("selection")[0];
  selectionContainer.style.display = "none";
  btnAddTicket.style.display = "flex";
  ticketFormResetor();
});

const valueReader = () => {
  const obj = {};
  let ticketTypeValue = document.getElementsByClassName("form-type")[0].value;
  obj.ticketType = ticketTypeValue;
  let ticketDurationValue =
    document.getElementsByClassName("ticket-duration")[0].value;
  obj.ticketDuration = ticketDurationValue;
  let radioBtns = document.querySelectorAll("input[name='food_token']");

  let statementOne =
    radioBtns[0].checked == true && radioBtns[1].checked == false; // Food token needed
  let statementTwo =
    radioBtns[0].checked == false && radioBtns[1].checked == true; // Food token not needed

  if (statementOne) {
    obj.isFoodToken = true;
  } else if (statementTwo) {
    obj.isFoodToken = false;
  } else {
    obj.isFoodToken = null;
  }

  return obj;
};



// Checking ticket type and returning
const ticketTypeChecker = (selectedTicketType) => {
  const selectedObj = {
    type: null,
    name: null,
    initialCost: null,
    isAdditionalCharge: null,
    durationCharge: {},
  };

  costArray.map((obj) => {
    if (selectedTicketType == obj.type) {
      selectedObj.type = obj.type;
      selectedObj.name = obj.name;
      selectedObj.initialCost = obj.initialCost;
      selectedObj.isAdditionalCharge = obj.isAdditionalCharge;
      selectedObj.durationCharge = obj.durationCharge;

      return selectedObj;
    }
  });
  //   console.log("selectedObj");
  //   console.log(selectedObj);
  return selectedObj;
};

const ticketDurationCherker = (ticketTypeObject, selectedTicketDuration) => {
  const timeRange = ticketTypeObject.durationCharge;

    // debugger;
  let timeCost = "";
  for (let index in timeRange) {
    console.log(index, timeRange);
    console.log("index == selectedTicketDuration ",index == selectedTicketDuration);
    if (index == selectedTicketDuration) {
      let durationPrice = timeRange[index];
      console.log("durationPrice",durationPrice);
      timeCost = durationPrice;
      return timeCost;
    }
  }
  return timeCost;
};

const foodTokenChecker = (radioBtnsFD) => {
//   console.log(radioBtnsFD);
  let statementOne =
    radioBtnsFD[0].checked == true && radioBtnsFD[1].checked == false; // Food token needed
  let statementTwo =
    radioBtnsFD[0].checked == false && radioBtnsFD[1].checked == true; // Food token not needed

  let isFoodToken;
  if (statementOne) {
    isFoodToken = true;
  } else if (statementTwo) {
    isFoodToken = false;
  } else {
    isFoodToken = false;
  }

  return isFoodToken;
};

const annualMemberChercker = (selectedTicketType) => {
//   debugger;
  let isAnnualMember = false;
//   console.log("selectedTicketType", selectedTicketType);
//   console.log("costArray[4].type", costArray[4].type);
//   console.log("costArray[5].type ", costArray[5].type);
//   debugger;

  let statementOne =
    costArray[4].type == selectedTicketType.type ||
    costArray[5].type == selectedTicketType.type;

  console.log("statementOne", statementOne);
  if (statementOne) {
    isAnnualMember = true;
    return isAnnualMember;
  } else {
    return isAnnualMember;
  }
};

const createCard = () =>{

    const ticketObj= addedTicketArray[addedTicketArray.length -1];
        const ticketList = document.getElementsByClassName("selected-ticket-list")[0];
        let newDivTag = document.createElement("div");

        
       
        
        newDivTag.innerHTML = `<div class="card">
        <div class="card-container">

        <div class="card-item">Ticket Id <span> ${ticketObj.ticketId} </span> </div>
        <div class="card-item">Ticket Type <span> ${ticketObj.ticketType} </span> </div>
        <div class="card-item"> Duration: <span> ${ticketObj.ticketDuration} </span> </div>
        <div class="card-item"> Food Token:  <span>${ticketObj.isFoodToken}  </span></div>
        <div class="card-item"> Ticket price: <span> ${ticketObj.totalCost}</span></div>
        <div class="card-remove">
        <button class="btn-remove" onClick="(()=> console.log(${ticketObj.ticketNumber}))()">&times;</button>
        </div>    
        </div>
                          <div>`;
        ticketList.append(newDivTag);
       
        
    

} 

// const removeFromList = (ticketNumber) => {
//     console.log()
//     addedTicketArray.map((tcketObj,index)=>{
//         if(index == ticketNumber){

//         }
//     })
// }

const modalClose = () =>{
    console.log("modal close")
    const modalClass = document.getElementsByClassName("modal")[0];
    modalClass.style.display = "none";
    
}


const ticketCostCalculator = () => {
    let ticketCost = 0;
    const selectedTicketType =
      document.getElementsByClassName("form-type")[0].value;
    //   console.log("selectedTicketType: ", selectedTicketType);
    const ticketTypeObject = ticketTypeChecker(selectedTicketType);
  //   console.log("ticketTypeObject: ", ticketTypeObject);
    // Intial Cost
    const initialCost = ticketTypeObject.initialCost;
    ticketCost = ticketCost + initialCost;
  
    const isAnnualMember = annualMemberChercker(ticketTypeObject);
    const radioBtnsFD = document.querySelectorAll("input[name='food_token']");
  
  //   console.log(isAnnualMember);
  //   console.log("isAnnualMember == true", isAnnualMember == true);
    if (!isAnnualMember) {
    //   debugger;
      // Removing the restrictions/enabling fields
      const ticketDurationField =
        document.getElementsByClassName("ticket-duration")[0];
      // console.log(ticketDurationField);
  
      ticketDurationField.disabled = false; // Ticket time duration field not disabled
      radioBtnsFD[0].disabled = false; // ticket radio button  field not  disabled
      radioBtnsFD[1].disabled = false; // ticket radio button  field not disabled
  
    //   debugger;
      // Duration Cost
      const selectedTicketDuration =
        document.getElementsByClassName("ticket-duration")[0].value;
      const durationCost = ticketDurationCherker(
        ticketTypeObject,
        selectedTicketDuration
      );
      ticketCost = ticketCost + durationCost;
      //Food token cost from radio btns
  
      const isFoodToken = foodTokenChecker(radioBtnsFD);
  
      // console.log(
      //   "ticketCost",
      //   typeof parseInt(ticketCost),
      //   "FOOD_PRICE",
      //   typeof FOOD_PRICE
      // );
      if (isFoodToken) ticketCost = parseInt(ticketCost) + FOOD_PRICE;
    } else {
    //   debugger;
      // Restrictions
      const ticketDurationField =
        document.getElementsByClassName("ticket-duration")[0];
      // console.log(ticketDurationField);
  
      ticketDurationField.disabled = true; // Ticket time duration field disabled
      radioBtnsFD[0].disabled = true; // ticket radio button  field disabled
      radioBtnsFD[1].disabled = true; // ticket radio button  field disabled
    }
  
    const amount = document.getElementsByClassName("tickect-amount")[0];
    amount.innerHTML = `${ticketCost}.00`;
  };

const totalCostCalculator = () =>{
    let totalAmount = 0;
    console.log("addedTicketArray",addedTicketArray);
    addedTicketArray.map((ticket)=>{
        // console.log(ticket);
        // debugger
        // console.log("totalAmount",totalAmount);
        totalAmount = parseInt(totalAmount) + parseInt(ticket.totalCost);
        // console.log("totalCost: ",totalAmount);
        // debugger
    });
    // console.log(totalAmount);
    
    return totalAmount;

}


const addedTicketObjectConstructor=(selectedTicketType,obj,duraionCost,foodCost)=>{
    const ticketCost = selectedTicketType.initialCost +duraionCost+foodCost;
    const addedTicketObj = {
        ticketId: (addedTicketArray.length +1),
        ticketType: selectedTicketType.type,
        ticketDuration: obj.ticketDuration,
        isFoodToken:obj.isFoodToken,
        selectedTicketType: selectedTicketType,
        initialCost:selectedTicketType.initialCost,
        duraionCost:duraionCost,
        foodCost: foodCost,
        totalCost:ticketCost,
        ticketNumber:addedTicketArray.length,
      }
      return addedTicketObj;
}

const ticketFormResetor =() =>{
    const ticketFormElement =document.getElementsByClassName("form-ticket")[0];
ticketFormElement.reset();

const radioBtnsFD = document.querySelectorAll("input[name='food_token']");
const ticketDurationField =
        document.getElementsByClassName("ticket-duration")[0];
      // console.log(ticketDurationField);
  
      ticketDurationField.disabled = false; // Ticket time duration field disabled
      radioBtnsFD[0].disabled = false; // ticket radio button  field disabled
      radioBtnsFD[1].disabled = false; // ticket radio button  field disabled

const tickerCostIndicatior =document.getElementsByClassName("tickect-amount")[0];
tickerCostIndicatior.innerHTML =`0.00`;
  
}

const costArray = [
  {
    type: "FAP",
    name: "Foreign Adult Pass",
    initialCost: 5000,
    isAdditionalCharge: true,
    durationCharge: { "3hrs": 0, "12hrs": 500, "24hrs": 1000, "48hrs": 2000 },
  },
  {
    type: "FCP",
    name: "Foreign Child Pass",
    initialCost: 2500,
    isAdditionalCharge: true,
    durationCharge: { "3hrs": 0, "12hrs": 500, "24hrs": 1000, "48hrs": 2000 },
  },
  {
    type: "LAP",
    name: "Local Adult Pass",
    initialCost: 1000,
    isAdditionalCharge: true,
    durationCharge: { "3hrs": 0, "12hrs": 250, "24hrs": 500, "48hrs": 1000 },
  },
  {
    type: "LCP",
    name: "Local Child Pass",
    initialCost: 500,
    isAdditionalCharge: true,
    durationCharge: { "3hrs": 0, "12hrs": 250, "24hrs": 500, "48hrs": 1000 },
  },
  {
    type: "APF",
    name: "Annual Pass-Foreign",
    initialCost: 15000,
    isAdditionalCharge: false,
    durationCharge: { "3hrs": 0, "12hrs": 0, "24hrs": 0, "48hrs": 0 },
  },
  {
    type: "APL",
    name: "Annual Pass-Local",
    initialCost: 4500,
    isAdditionalCharge: false,
    durationCharge: { "3hrs": 0, "12hrs": 0, "24hrs": 0, "48hrs": 0 },
  },
];

const addedTicketArray = [];




