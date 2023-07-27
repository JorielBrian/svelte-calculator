import { json } from "@sveltejs/kit"

export async function POST({ request }){
    const { num1, num2, operation } = await request.json();
    switch(operation){
        case '+':
            return json( num1 + num2 );
            break;
        case '-':
            return json( num1 - num2 );
            break;
        case '*':
            return json( num1 * num2 );
            break;
        case '/':
            return json( num1 / num2 );
            break;
        default:
            return json ( num1 );
    }
}