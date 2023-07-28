<script>
    import "../app.css";

    //initializing variables
    let numbers = [];
    let operations = [];
    let display = null;
    let output = null;
    let prevOutput = null;
    //clicking numbers
    const handleNumbers = value =>{
        //if the output is not empty it will proceed to the next equation
        if(output !== null){
            handleClear();
            display = value;
        } else {
            display === null ? display = value : display += value; //if the display is null this the number will be the display, else it will add to the display
        }
    }
    //clicking operators
    const handleOperation = operator =>{
        /*if the display is null it means there is no number, it will not do anything
        the previews output will be the first number and will continue to the equation*/
        if(display === null){
            return;
        } else if(output !== null){
            prevOutput = output;
            handleClear();
            display = `${prevOutput} ${operator} `
        }else {
            display += ` ${operator} `; //adding the operator to the display with spaces from the start and end
        }
    }
    const handleClear = () =>{
        [ display, output, prevOutput, numbers, operations ] = [ null, null, null, [], []] //clearing variables
    }
    //clicking del function
    const handleDelete = () =>{
        display = display.toString().slice(0,-1);
    }
    async function handleEquals(){
        //splitting numbers and operators and pushing them to numbers and operations variables
        display.split(" ").forEach(digit => !isNaN(Number(digit)) ? numbers.push(Number(digit)) : operations.push(digit));
        //posting numbers and operations array to the server
        const response = await fetch('./api/posts.json', {
            method: 'POST',
            body: JSON.stringify({ numbers, operations }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        output = await response.json(); //getting the output response
    }
</script>

<div class="calculator-container">
    <div class="calculator text-white bg-gray-600 w-1/2 my-10 mx-auto p-10 rounded-3xl">
        <div class="calculator-output w-full h-40 flex relative m-auto bg-green-700 rounded-xl mb-5">
            <input type="text" bind:value={ output } id="calculator-output" class="absolute font-bold text-4xl bg-transparent px-5 overflow-hidden" placeholder="Answer"/>
            <input type="text" bind:value={ display } id="calculator-input" placeholder="0" class="font-bold absolute text-6xl bottom-8 right-10 w-full text-end bg-transparent overflow-hidden" />
        </div>
        <div class="calculator-buttons w-full h-[60vh] m-auto grid grid-cols-4 gap-3 place-content-center text-center font-bold text-4xl" >
            <button on:click= { handleClear } class="col-span-3 bg-blue-600">CLEAR</button>
            <button on:click= { handleDelete } class="bg-slate-950">DEL</button>
            <button on:click= { () => handleNumbers('9') }  class="numbers ">9</button>
            <button on:click= { () => handleNumbers('8') }  class="numbers">8</button>
            <button on:click= { () => handleNumbers('7') }  class="numbers">7</button>
            <button on:click= { () => handleOperation('/') }  class="operations">/</button>
            <button on:click= { () => handleNumbers('6') }  class="numbers">6</button>
            <button on:click= { () => handleNumbers('5') }  class="numbers">5</button>
            <button on:click= { () => handleNumbers('4') }  class="numbers">4</button>
            <button on:click= { () => handleOperation('*') }  class="operations">x</button>
            <button on:click= { () => handleNumbers('3') }  class="numbers">3</button>
            <button on:click= { () => handleNumbers('2') }  class="numbers">2</button>
            <button on:click= { () => handleNumbers('1') }  class="numbers">1</button>
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