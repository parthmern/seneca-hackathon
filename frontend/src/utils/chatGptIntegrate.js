const API_KEY = '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' ;


export const chatGptIntegration = async ({que}) => {

    console.log(que);

    const options = {

        method : 'POST',
        
        headers : {
            'Authorization': `Bearer ${API_KEY}` ,
            'Content-Type': 'application/json'
        },
        
        body : JSON.stringify({
            model : 'gpt-3.5-turbo',
            messages : [{role: "user", content: que}],
            max_tokens : 200 
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

