const API_KEY = process.env.REACT_APP_CHATGPT_API_KEY ;


export const chatGptIntegration = async ({que}) => {

    console.log(que);
    // console.log("API_KEY", API_KEY);

    const options = {

        method : 'POST',
        
        headers : {
            'Authorization': `Bearer ${API_KEY}` ,
            'Content-Type': 'application/json'
        },
        
        body : JSON.stringify({
            model : 'gpt-3.5-turbo',
            messages : [{role: "user", content: que}],
            max_tokens : 300 
        }) 
    }

    try{
        const response = await fetch('https://api.openai.com/v1/chat/completions',options);
        const data = await response.json() ;
        // console.log(data);

        const ans = data.choices[0].message.content ;

        console.log("ans==",ans);

        return ans ;
        
    }

    catch(error){
        console.log("errorr");
        console.log(error);
    }
}

