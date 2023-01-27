const axios = require('axios');
const {Suggestions} = require('actions-on-google');
const {Suggestion} = require("dialogflow-fulfillment");
const {WebhookClient,Image, Card}=require("dialogflow-fulfillment");
const { request, response } = require("express");
const express=require("express");
const app=express();


async function makeRequest(WorkPhone,LastDigits) {
    const config = {
        method: 'get',
        url: `https://track-my-repair.triarom.co.uk/api/v1/work_order/${WorkPhone}?phone=${LastDigits}`,
        headers: { 'text': 'application/json' }
    }

    let res = await axios(config)
    let message = `Status= ${res.data.status} , Message = ${res.data.job_notes[0].text}`
    return message
}

async function makeRequestPostCode(postCode) {
    const config = {
        method: 'get',
        url: `https://check-availability.broadband.triarom.co.uk/api/v1/addresses/${postCode}`,
        headers: { 'text': 'application/json' }
    }
    let res = await axios(config)
    return res.data
}


async function makeRequestPostCodeId(id) {
    const config = {
        method: 'get',
        url: `https://check-availability.broadband.triarom.co.uk/api/v1/address/${id}/products`,
        headers: { 'text': 'application/json' }
    }
    let res = await axios(config)
    console.log(res.data)
    productsData.push(res.data)
    console.log("done")
    return res.data
}

var WrokPhonedata = [];
var Apidata=[];
var productsData=[];


app.post("/webhook",express.json(),(request,response)=>{          //fulfillment mai bhi url mai /webhook lagana huga 
    const agent=new WebhookClient({request:request,response:response});
     

    function welcome(agent){
        agent.add("👋 Hello there! Thank you for reaching us 💡 Please use our bot assistant to verify your submission. You can request Live Support at any time if you have a question, request or concern 💬")
        agent.add(new Suggestion("Get Live Support"))
        agent.add(new Suggestion("Verify Submission"))
        agent.add(new Suggestion("Submit NFT Project"))
        agent.add(new Suggestion("Promote Nft Project"))
    }

    function verifySubmission(agent){
        agent.add("Thank you for submitting your project on NFT Drops Calendar 🌟")
        agent.add("Your project is now VERIFIED ✅ ")
        agent.add("NFT Projects get reviewed and approved within:- 6 hours (Premium Listing) ⚡ - 3 days (Regular Listing) 🕒")
        agent.add("We will send you a confirmation message as soon as your NFT project is approved!")
        agent.add("Feel free to reach us should you have any question, request or concern.")
        agent.add(new Suggestion("↩️ Back to Menu"))
        agent.add(new Suggestion("💬 Get Live Support"))
        agent.add(new Suggestion("Pay for Premium Listing 🔖"))
        agent.add(new Suggestion("Book my Featured Spot 🌟"))   
    }

    function verifySubmissionFollowGetLivePremium(agent){
        agent.add("Hello There !")
        agent.add("This is Tiffany, Marketing Manager @nftdropscal")
        agent.add("🔍 I just reviewed and approved your project in priority queue!")
        agent.add("We can publish your listing as soon as you pay your Premium Listing fee (0.1 ETH).")
        agent.add("Please send your payment to the following ERC20 wallet address 👇")
        agent.add("0x9cD7C96873FD4c8F39852a2DAC4f94BabeCF770b")
    }

    function verifySubmissionFollowGetLiveSupport(agent){
        agent.add("Hello There !")
        agent.add("This is Ryan, Community Manager @nftdropscal")
        agent.add("How can I help you ?")
    }

    function getLiveSupport(agent){
        agent.add("Hello There !")
        agent.add("This is Ryan, Community Manager @nftdropscal")
        agent.add("How can I help you ?")
    }
    
    function PromoteNftProject(agent){
        agent.add("Looking to promote your NFT Collection? Check our top advertising services to help you boost your NFT Project's visibility 👇")
        agent.add(new Suggestion("🌟  Website Promotion"))
        agent.add(new Suggestion("🐦 Twitter Posts Package"))
        agent.add(new Suggestion("↩️ Back to Menu"))
        agent.add(new Suggestion("💬 Get Live Support"))
    }

    function websitePromotion(agent){
        agent.add(new Image('https://www.linkpicture.com/q/2_808.png'))
        agent.add(new Image('https://www.linkpicture.com/q/3_365.png'))
        agent.add(new Image('https://www.linkpicture.com/q/4_240.png'))
        agent.add(new Suggestion("👍 Interested"))
        agent.add(new Suggestion("👎 Not Interested"))
    }

    function SubmitNftProject(agent){
        agent.add(new Card({
            title: 'Submit An NFT',
            imageUrl: 'https://www.linkpicture.com/q/1_694.png',
            buttonText: 'Submit  Nft Project',
            buttonUrl: 'https://www.nftdropscalendar.com/submit-nft'
          })
        );  
        agent.add(new Suggestion("↩️ Back to Menu"))
        agent.add(new Suggestion("💬 Get Live Support"))
    }

    function WebPromoIntrested(agent){
        agent.add("Hello there")
        agent.add("This is Tiffany, Marketing Manager @nftdropscal")
        agent.add("Could you please confirm which service are you interested in, and specify your desired period, so I can book you a spot?")
    }

    function WebPromoNotIntrested(agent){
        agent.add("Fair enough!")
        agent.add("Let us know if you have any other request or question, we'll be glad to assist you!")
        agent.add(new Suggestion("↩️ Back to Menu"))
        agent.add(new Suggestion("💬 Get Live Support"))
    }

    function TwitterPost(agent){
        agent.add(new Image('https://www.linkpicture.com/q/5_204.png'))
        agent.add(new Image('https://www.linkpicture.com/q/6_162.png'))
        agent.add(new Suggestion("👍 Interested"))
        agent.add(new Suggestion("👎 Not Interested"))
    }

    const delay = (delayInms) => {
        return new Promise(resolve => setTimeout(resolve, delayInms));
    }


    let intentMap= new Map();
    intentMap.set("Default Welcome Intent",welcome)
    intentMap.set("verifySubmission",verifySubmission);
    intentMap.set("verifySubmission -getLiveSupport",verifySubmissionFollowGetLiveSupport)
    intentMap.set("verifySubmission - payPremium",verifySubmissionFollowGetLivePremium)
    intentMap.set("getSupport",getLiveSupport)
    intentMap.set("SubmitNftProject",SubmitNftProject)
    intentMap.set("PromoteNftProject",PromoteNftProject)
    intentMap.set("WebsitePromotion",websitePromotion)
    intentMap.set("WebsitePromotion -Intrested",WebPromoIntrested)
    intentMap.set("WebsitePromotion - NotIntrested",WebPromoNotIntrested)
    intentMap.set("TwitterPost",TwitterPost)
    intentMap.set("TwitterPost - intrested", WebPromoIntrested)
    intentMap.set("TwitterPost - NotIntrested",WebPromoNotIntrested)
    agent.handleRequest(intentMap)
})

const port = process.env.PORT || 4000;

app.listen(port,()=>{
    console.log("server is up on 4000");
})

