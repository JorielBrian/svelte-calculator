import { json } from "@sveltejs/kit"

export async function POST({ request }){
    const { numbers, operations } = await request.json();
    let output = null; //initializing the output to null
    
    //will run a function for each numbers
    numbers.forEach(number =>{
        /*if the output is empty the first number will be the output, else if the output is not it will continue to the equation
        on each equation will remove a operator inside the operations array to proceed to the next operator*/
        if(output === null){
            output = number;
        } else {
            switch(operations[0]){
                case '*':
                    output *= number ;
                    operations.shift();
                    break;
                case '/':
                    output /= number;
                    operations.shift();
                    break;
                case '+':
                    output += number;
                    operations.shift();
                    break;
                case '-':
                    output -= number;
                    operations.shift();
                    break;
                default:
                    return;
            }
        }
    })
    return json( output ); //returning the output to the UI
}