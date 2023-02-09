const axios = require('axios');
const {Suggestions} = require('actions-on-google');
const {Suggestion, Card} = require("dialogflow-fulfillment");
const {WebhookClient,Image}=require("dialogflow-fulfillment");
const { request, response } = require("express");
const express=require("express");
const app=express();

app.post("/webhook",express.json(),(request,response)=>{          //fulfillment mai bhi url mai /webhook lagana huga
    
    const agent = new WebhookClient({ request, response });

  
    function welcome(agent) {
      agent.add(`Hola soy GuachiBOT (EMOJI), ¿Puedo ayudarte con nuestros servicios?`);
      agent.add('¿Cuál es su nombre?');
    }
  
    function name(agent){
      let name = agent.parameters.person;
      console.log(name.name)
      agent.add(`Gracias, ${name.name}`);
      agent.add('¿Nombre de empresa?')
    }

    function company(agent){
      console.log(agent.parameters.any)      
      agent.add('Necesito tu número de whatsapp');
    }

    function whatsapp(agent){
      console.log(agent.parameters['phone-number'])
      agent.add("¿Tiene cuenta con nosotros?")
    }

    function WhatsappYes(agent){
      agent.add(new Card({
        title: `AYUDA SOPORTE`,
        text: `(Contamos con un sistema de Ticketing para darte un soporte eficaz + image before link website):`,
        buttonText: 'ir al sitio',
        buttonUrl: 'https://whatsappmarketing.zendesk.com/hc/es/requests/new'
      }));
      
      agent.add(new Card({
        title: `CASO DE ÉXITO`,
        text: `(Small text + image before link website):`,
        buttonText: 'ir al sitio',
        buttonUrl: 'https://www.whatsmarketing.es/galeria-casos-exito/'
      }));

      agent.add(new Card({
        title: `¿Quiere ser Distribuidor?`,
        text: `(Small text + image before link website):`,
        buttonText: 'ir al sitio',
        buttonUrl: 'https://www.whatsmarketing.es/distribuidores-api-whatsapp-marketing/'
      }));  
    
    }

    function WhatsappNo(agent){

      agent.add(new Card({
        title: `Hola`,
        text: `un gusto poder conversar sobre nuestros servicios`,
        buttonText: 'ir al sitio',
        buttonUrl: ' whatsmarketing.es/servicios/'
      }));  

      agent.add(new Card({
        title: `CASOS DE ÉXITO:`,
        text: `(Small text + image before link website):`,
        buttonText: 'ir al sitio',
        buttonUrl: ' whatsmarketing.es/galeria-casos-exito/'
      }));  

      agent.add(new Card({
        title: `REGISTARSE DEMO 18 Créditos sin Costo`,
        text: `(Small text + image before link website):`,
        buttonText: 'ir al sitio',
        buttonUrl: 'whatsmarketing.es/registro-usuarios-whatsapp-marketing/'
      }));

      agent.add(new Card({
        title: `SOLICITAR CITA COMERCIAL`,
        text: `(Puedes elegir un día horario para concertar una reunión virtual vía Google Meet:`,
        buttonText: 'ir al sitio',
        buttonUrl: 'https://calendly.com/whatsMarketing'
      }));

      agent.add(new Card({
        title: `COMPRAR CREDITOS`,
        text: `(Small text + image before link website):`,
        buttonText: 'ir al sitio',
        buttonUrl: 'whatsmarketing.es/shop/'
      }));

    }

    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('name',name);
    intentMap.set('company name',company);
    intentMap.set('whatsapp number',whatsapp)
    intentMap.set('whatsapp number - yes',WhatsappYes)
    intentMap.set('whatsapp number - no',WhatsappNo)
    
    
    agent.handleRequest(intentMap);
  
})

const port = process.env.PORT || 4000;

app.listen(port,()=>{
    console.log("server is up on 4000");
})

