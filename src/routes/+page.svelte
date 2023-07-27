<script>
    import "../app.css";

    let num1 = null;
    let num2 = null;
    let display = null;
    let output = null;
    let operation = null;

    const handleNumbers = value =>{
        if(output !== null){
            return;
        }else if(operation === null){
            num1 === null ? num1 = value : num1 += value;
            display = `${num1}`;
        } else {
            num2 === null ? num2 = value : num2 += value;
            display = `${num1} ${operation} ${num2}`;
        }
    }

    const handleOperation = operator =>{
        if(output !== null){
            num1 = output;
            operation = operator;
            num2 = null;
            output = null;
            display = `${num1} ${operation}`;
        }else if(num1 === null || operation !== null){
            return;
        } else if(num1 !== null){
            operation = operator;
            display = `${num1} ${operation}`;
        } else {
            return;
        }
    }

    const handleClear = () =>{
        [display, output, num1, num2, operation ] = [null, null, null, null, null]
    }

    const handleDelete = () =>{
        if(operation !== null && num2 === null){
            operation = null;
            display = `${num1}`;
            output = null;
        } else if (num2 !== null){
            num2 = num2.toString().slice(0,-1);
            display = `${num1} ${operation} ${num2}`
            num2.length === 0 ? num2 = null : num2;
            output = null;
        } else {
            num1 = num1.toString().slice(0,-1);
            display = `${num1}`;
            num1.length === 0 ? num1 = null : num1;
            output = null;
        }
    }

    async function handleEquals(){
        const response = await fetch('./api/posts.json', {
            method: 'POST',
            body: JSON.stringify({ num1, num2, operation }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        output = await response.json();
    }

</script>

<div class="calculator-container">
    <div class="calculator text-white bg-gray-600 w-1/3 my-10 mx-auto p-10 rounded-3xl">
        <div class="calculator-output w-full h-60 flex relative m-auto bg-green-700 rounded-xl mb-5">
            <input type="text" bind:value={ output } id="calculator-output" class="absolute font-bold text-6xl bg-transparent px-5 overflow-hidden" placeholder="Answer"/>
            <input type="text" bind:value={ display } id="calculator-input" placeholder="0" class="font-bold absolute text-8xl bottom-8 right-10 w-full text-end bg-transparent overflow-hidden" />
        </div>
        <div class="calculator-buttons w-full h-1/2 m-auto grid grid-cols-4 gap-3 place-content-center text-center font-bold text-4xl" >
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
        height: 100px;
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