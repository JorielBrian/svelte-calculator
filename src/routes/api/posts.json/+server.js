import { json } from "@sveltejs/kit"

export async function POST({ request }){
    /*const { display } = await request.json();
    let output = null; //initializing the output to null
    let equation = [];
    const MD = ['*','/'];
    const AS = ['+','-'];   
    let operations = [];

    //converting string of numbers and pushing all operators in the operations array to determine the number of operators
    display.split(" ").forEach(digit => {
        if(!isNaN(Number(digit))){
            equation.push(Number(digit));
        } else {
            equation.push(digit);
            operations.push(digit);
        }
    })

    //for each operators it will run a computation
    operations.forEach( () => {
        let x = null;
        let y = null;
        let equals = null;
        let operator = null;
        if(equation.indexOf('*') !== -1 && equation.indexOf('/') !== -1){
            equation.indexOf('*') < equation.indexOf('/') ? operator = '*' : operator = '/';
            x = equation[equation.indexOf(operator) - 1];
            y = equation[equation.indexOf(operator) + 1];

            operator === '*' ? equals = x*y : equals = x/y;
            equation[equation.indexOf(operator) - 1] = equals;
            equation.splice(equation.indexOf(operator), 2);
        } else if(equation.indexOf('*') !== -1 || equation.indexOf('/') !== -1){
            equation.indexOf('*') !== -1 ? operator = '*' : operator = '/';
            x = equation[equation.indexOf(operator) - 1];
            y = equation[equation.indexOf(operator) + 1];

            operator === '*' ? equals = x*y : equals = x/y;
            equation[equation.indexOf(operator) - 1] = equals;
            equation.splice(equation.indexOf(operator), 2);
        } else if(equation.indexOf('+') !== -1 && equation.indexOf('-') !== -1){
            equation.indexOf('+') < equation.indexOf('-') ? operator = '+' : operator = '-';
            x = equation[equation.indexOf(operator) - 1];
            y = equation[equation.indexOf(operator) + 1];

            operator === '+' ? equals = x+y : equals = x-y;
            equation[equation.indexOf(operator) - 1] = equals;
            equation.splice(equation.indexOf(operator), 2);
        } else if(equation.indexOf('+') !== -1 || equation.indexOf('-') !== -1){
            equation.indexOf('+') !== -1 ? operator = '+' : operator = '-';
            x = equation[equation.indexOf(operator) - 1];
            y = equation[equation.indexOf(operator) + 1];

            operator === '+' ? equals = x+y : equals = x-y;
            equation[equation.indexOf(operator) - 1] = equals;
            equation.splice(equation.indexOf(operator), 2);
        }
    })

    return json(equation);*/

    const { equation, operations } = await request.json();
    let output = null; //initializing the output to null

    operations.forEach( () => {
        let x = null;
        let y = null;
        let equals = null;
        let operator = null;
        if(equation.indexOf('x') !== -1 && equation.indexOf('/') !== -1){
            equation.indexOf('x') < equation.indexOf('/') ? operator = 'x' : operator = '/';
            x = equation[equation.indexOf(operator) - 1];
            y = equation[equation.indexOf(operator) + 1];

            operator === 'x' ? equals = x*y : equals = x/y;
            equation[equation.indexOf(operator) - 1] = equals;
            equation.splice(equation.indexOf(operator), 2);
        } else if(equation.indexOf('x') !== -1 || equation.indexOf('/') !== -1){
            equation.indexOf('x') !== -1 ? operator = 'x' : operator = '/';
            x = equation[equation.indexOf(operator) - 1];
            y = equation[equation.indexOf(operator) + 1];

            operator === 'x' ? equals = x*y : equals = x/y;
            equation[equation.indexOf(operator) - 1] = equals;
            equation.splice(equation.indexOf(operator), 2);
        } else if(equation.indexOf('+') !== -1 && equation.indexOf('-') !== -1){
            equation.indexOf('+') < equation.indexOf('-') ? operator = '+' : operator = '-';
            x = equation[equation.indexOf(operator) - 1];
            y = equation[equation.indexOf(operator) + 1];

            operator === '+' ? equals = x+y : equals = x-y;
            equation[equation.indexOf(operator) - 1] = equals;
            equation.splice(equation.indexOf(operator), 2);
        } else if(equation.indexOf('+') !== -1 || equation.indexOf('-') !== -1){
            equation.indexOf('+') !== -1 ? operator = '+' : operator = '-';
            x = equation[equation.indexOf(operator) - 1];
            y = equation[equation.indexOf(operator) + 1];

            operator === '+' ? equals = x+y : equals = x-y;
            equation[equation.indexOf(operator) - 1] = equals;
            equation.splice(equation.indexOf(operator), 2);
        }
    })

    //return json(equation);
    return json(equation);
}