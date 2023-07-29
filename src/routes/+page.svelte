<script>
    import "../app.css";
    //initializing variables
    let display = null; //for the display of inputs
    let output = null; //for the display of output
    let equation = []; //storing inputs
    let operations = []; //storing number of operations
    let number = null; //storing initial number

    //handling clicked numbers, displaying clicked numbers and storing to number variable
    const handleNumbers = value =>{
        if(output !== null){
            handleClear();
            number = value;
            display = number;
        } else if(equation.length === 0){
            number === null ? number = value : number += value;
            display = number;
        } else {
            number === null ? number = value : number += value;
            display += value;
        }
    }
    //handling clicked operators, pushing number to the equation and clicked operator and displaying inputs
    const handleOperation = operator =>{
        equation.push(Number(number));
        equation.push(operator);
        operations.push(operator);
        updateDisplay();
        number = null;
    }
    //handling equal upon clicked, sending equation to the server for computations and displaying response as output
    async function handleEquals(){
        equation.push(Number(number));
        number = null;
        const response = await fetch('./api/posts.json', {
            method: 'POST',
            body: JSON.stringify({ equation, operations }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        output = await response.json();
    }
    //handling upon clicked Clear button, clearing all display and variables
    const handleClear = () =>{
        [ display, output, number, equation, operations ] = [ null, null, null, [], [] ]
    }
    //deleting each display and numbers or operators inside the equation variable
    const handleDelete = () =>{
        if(number !== null){
            number = number.toString().slice(0,-1);
            display = display.toString().slice(0,-1);
        } else {
            number = null;
            equation.pop();
            updateDisplay();
        }
    }
    //updating display from the equation
    const updateDisplay = () =>{
        display = equation.toString().replaceAll(',','');
    }
</script>

<div class="calculator-container">
    <div class="calculator text-white bg-gray-600 w-1/2 my-10 mx-auto p-10 rounded-3xl">
        <div class="calculator-output w-full h-40 flex relative m-auto bg-green-700 rounded-xl mb-5">
            <input type="text" bind:value={ output } id="calculator-output" class="absolute font-bold text-4xl bg-transparent px-5 overflow-hidden" placeholder="Answer"/>
            <input type="text" bind:value={ display } id="calculator-input" placeholder="0" class="font-bold absolute text-6xl bottom-8 right-10 w-full text-end bg-transparent overflow-hidden" />
        </div>
        <div class="calculator-buttons w-full h-[60vh] mt-10 m-auto grid grid-cols-4 gap-3 place-content-center text-center font-bold text-4xl" >
            <button on:click= { handleClear } class="col-span-3 bg-blue-600">CLEAR</button>
            <button on:click= { handleDelete } class="bg-slate-950">DEL</button>
            <button on:click= { () => handleNumbers('7') }  class="numbers">7</button>
            <button on:click= { () => handleNumbers('8') }  class="numbers">8</button>
            <button on:click= { () => handleNumbers('9') }  class="numbers ">9</button>
            <button on:click= { () => handleOperation('/') }  class="operations">/</button>
            <button on:click= { () => handleNumbers('4') }  class="numbers">4</button>
            <button on:click= { () => handleNumbers('5') }  class="numbers">5</button>
            <button on:click= { () => handleNumbers('6') }  class="numbers">6</button>
            <button on:click= { () => handleOperation('x') }  class="operations">x</button>
            <button on:click= { () => handleNumbers('1') }  class="numbers">1</button>
            <button on:click= { () => handleNumbers('2') }  class="numbers">2</button>
            <button on:click= { () => handleNumbers('3') }  class="numbers">3</button>
            <button on:click= { () => handleOperation('-') }  class="operations">-</button>
            <button on:click= { () => handleNumbers('.') }  class="numbers">.</button>
            <button on:click= { () => handleNumbers('0') }  class="numbers">0</button>
            <button id="equals" on:click= { handleEquals } class="bg-green-600">=</button>
            <button on:click= { () => handleOperation('+') }  class="operations">+</button>
        </div>
    </div>
</div>

<style>
    button{
        border-radius: 1rem;
        border: solid #000000;
        height: 80px;
        color: #ffffff;
        box-shadow: 2px 2px 2px #000000;
    }
    button:active{
        transform: translate(2px, 2px);
        box-shadow: 0 0 0;
    }
    .numbers {
        background-color: grey;
    }
    .operations{
        background-color: grey;
    }
    .calculator{
        box-shadow: 10px 10px 10px #000000;
    }
</style>