//html root dom seclector
const root = document.querySelector("#root");

//create element div
const container = document.createElement("div");
container.setAttribute("class", "container");
root.appendChild(container);

//calculator body
const containerDiv = document.querySelector(".container");

const calculator_body = document.createElement("div");
calculator_body.setAttribute("class", "calculator-body");
containerDiv.appendChild(calculator_body);

//calculator body element
const calcuBody = document.querySelector(".calculator-body");
//create output div and keybord div
// output
const outputDiv = document.createElement("div");
outputDiv.setAttribute("id", "output");
calcuBody.appendChild(outputDiv);

// keybord
const keybordDiv = document.createElement("div");
keybordDiv.setAttribute("id", "keybord");
calcuBody.appendChild(keybordDiv);

// output and keybord bordey
const output = document.querySelector("#output");
const keybord = document.querySelector("#keybord");

// output bordy
const historyDiv = document.createElement("div");
historyDiv.setAttribute("class", "history");
output.appendChild(historyDiv);
historyDiv.appendChild(document.createElement("p"));

const resultDiv = document.createElement("div");
resultDiv.setAttribute("class", "result");
output.appendChild(resultDiv);
resultDiv.appendChild(document.createElement("p"));

//keybord body
const create_button = (content, className, idName) => {
  const button = document.createElement("button");
  button.setAttribute("class", className);
  button.setAttribute("id", idName);
  keybord.appendChild(button);
  button.innerHTML = content;
};

create_button("C", "operator", "clear");
create_button("CE", "operator", "backspace");
create_button("%", "operator", "%");
create_button("&#247;", "operator", "/");
create_button("7", "number", "7");
create_button("8", "number", "8");
create_button("9", "number", "9");
create_button("&times;", "operator", "*");
create_button("4", "number", "4");
create_button("5", "number", "5");
create_button("6", "number", "6");
create_button("-", "operator", "-");
create_button("1", "number", "1");
create_button("2", "number", "2");
create_button("3", "number", "3");
create_button("+", "operator", "+");

create_button("0", "number", "0");

create_button("=", "operator", "=");



// javascript working the mechin

// this funcation history div p value
function getHistory() {
  return document.querySelector(" .history p").innerText;
}

// this finction recive the peramiter value and change the history div p tag value
function printHistory(num) {
  document.querySelector(" .history p").innerText = num;
}

// this funcation result div p value
function getOutput() {
  return document.querySelector(" .result p").innerText;
}

// this finction recive the peramiter value and change the output div p tag  value
function printOutput(num) {
  if (num == "") {
    document.querySelector(" .result p").innerText = num;
  } else {
    document.querySelector(" .result p").innerText = getFormattedNumber(num);
  }
}

//this function recive the premiter value and this pemiter value convart to sting
function getFormattedNumber(num) {
  if (num == "-") {
    return "";
  }
  var n = Number(num);
  var value = n.toLocaleString("en");

  return value;
}

function reverseNumberFormat(num) {
  return Number(num.replace(/,/g, ""));
}

// this variable stre the array  
var operator = document.getElementsByClassName("operator");

// this loop the oparetors 
for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function () {
    if (this.id == "clear") {
      printHistory("");
      printOutput("");
    } else if (this.id == "backspace") {
      var output = reverseNumberFormat(getOutput()).toString();
      if (output) {
        //if output has a value
        output = output.substr(0, output.length - 1);
        printOutput(output);
      }
    } else {
      var output = getOutput();
      var history = getHistory();
      if (output == "" && history != "") {
        if (isNaN(history[history.length - 1])) {
          history = history.substr(0, history.length - 1);
        }
      }
      if (output != "" || history != "") {
        output = output == "" ? output : reverseNumberFormat(output);
        history = history + output;
        if (this.id == "=") {
          var result = eval(history);
          printOutput(result);
          printHistory("");
        } else {
          history = history + this.id;
          printHistory(history);
          printOutput("");
        }
      }
    }
  });
}
// this number return the array 
var number = document.getElementsByClassName("number");
// this loop doing number aray loop and add the add event listener adding
for (var i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function () {
    var output = reverseNumberFormat(getOutput());
    if (output != NaN) {
      //if output is a number
      output = output + this.id;
      printOutput(output);
    }
  });
}
