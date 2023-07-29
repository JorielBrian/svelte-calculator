import { json } from "@sveltejs/kit"

export async function POST({ request }){
    const { equation, operations } = await request.json();

    //calculate every operations using MDAS rule
    operations.forEach( () => {
        let x = null;
        let y = null;
        let equals = null;
        let operator = null;
        //if both multiplication and division is present, identify which comes first then perform calculation for them first
        if(equation.indexOf('x') !== -1 && equation.indexOf('/') !== -1){
            equation.indexOf('x') < equation.indexOf('/') ? operator = 'x' : operator = '/';
            x = equation[equation.indexOf(operator) - 1];
            y = equation[equation.indexOf(operator) + 1];

            operator === 'x' ? equals = x*y : equals = x/y;
            equation[equation.indexOf(operator) - 1] = equals;
            equation.splice(equation.indexOf(operator), 2);
        //if only one of multiplication or division is present, calculate for them first
        } else if(equation.indexOf('x') !== -1 || equation.indexOf('/') !== -1){
            equation.indexOf('x') !== -1 ? operator = 'x' : operator = '/';
            x = equation[equation.indexOf(operator) - 1];
            y = equation[equation.indexOf(operator) + 1];

            operator === 'x' ? equals = x*y : equals = x/y;
            equation[equation.indexOf(operator) - 1] = equals;
            equation.splice(equation.indexOf(operator), 2);
        //if both addition and subtraction is present, identify which comes first then perform calculation for them
        } else if(equation.indexOf('+') !== -1 && equation.indexOf('-') !== -1){
            equation.indexOf('+') < equation.indexOf('-') ? operator = '+' : operator = '-';
            x = equation[equation.indexOf(operator) - 1];
            y = equation[equation.indexOf(operator) + 1];

            operator === '+' ? equals = x+y : equals = x-y;
            equation[equation.indexOf(operator) - 1] = equals;
            equation.splice(equation.indexOf(operator), 2);
        //if only one of addition or subtraction is present, calculate for them
        } else if(equation.indexOf('+') !== -1 || equation.indexOf('-') !== -1){
            equation.indexOf('+') !== -1 ? operator = '+' : operator = '-';
            x = equation[equation.indexOf(operator) - 1];
            y = equation[equation.indexOf(operator) + 1];

            operator === '+' ? equals = x+y : equals = x-y;
            equation[equation.indexOf(operator) - 1] = equals;
            equation.splice(equation.indexOf(operator), 2);
        }
    })

    return json(equation);
}