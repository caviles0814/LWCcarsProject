import { LightningElement ,wire,track,api} from 'lwc';
import {getRecord} from 'lightning/uiRecordApi';

import CAR_ID from '@salesforce/schema/Car__c.Id';
import CAR_NAME from '@salesforce/schema/Car__c.Name';
import CAR_MILEAGE from '@salesforce/schema/Car__c.Mileage__c';
import CAR_PER_DAY_RENT from '@salesforce/schema/Car__c.Per_Day_Rent__c';
import CAR_PICTURE from '@salesforce/schema/Car__c.Picture__c';
import CAR_CONTACT__NAME from '@salesforce/schema/Car__c.Contact__r.Name';
import CAR_CONTACT__EMAIL from '@salesforce/schema/Car__c.Contact__r.Email';
import CAR_CONTACT__PHONE from '@salesforce/schema/Car__c.Contact__r.Phone';
import CAR_CARTYPE__NAME from '@salesforce/schema/Car__c.Car_Type__r.Name';
import { publish,subscribe,unsubscribe,createMessageContext,releaseMessageContext, MessageContext } from 'lightning/messageService';
import myChannel from "@salesforce/messageChannel/carMessageChannel__c";



const fields =[
 CAR_ID ,
 CAR_NAME ,
 CAR_MILEAGE,  
 CAR_PER_DAY_RENT , 
 CAR_PICTURE ,
 CAR_CONTACT__NAME  ,
 CAR_CONTACT__EMAIL , 
 CAR_CONTACT__PHONE  ,
 CAR_CARTYPE__NAME
];


export default class CarDetails extends LightningElement {
     carId;
    @wire(getRecord,{recordId: '$carId',fields})
    car;
    //a027i000005h5yzAAA
    @track  selectedTabValue;
    context = createMessageContext();
    @wire(MessageContext) msgContext;
    subscription =null;

    connectedCallback(){
        if(this.subscription){
            console.log('Empty Message');
            return;
        } 
        
        this.subscription  = subscribe(this.msgContext,myChannel,(c)=>{
            this.carId = c.Id;
        });
        console.log("Car Id from Message channel: "+this.carId);

         
    }
   /* callMethod(){
        this.subscription  = subscribe(this.msgContext,myChannel,(cId)=>{
            this.carId = cId.msg;
        });
        console.log("Car Id from Message channel: "+JSON.stringify(this.carId));

    } */
    renderedCallback(){
        console.log('rendered method car Details');
        
         
    }
    disconnectedCallback(){
        console.log('disconnected method car Details');
         
       unsubscribe(this.subscription);
        this.subscription = null; 
       
    }

    tabChangeHandler(event){
        this.selectedTabValue = event.target.value;
    }
    get carFound(){
        if(this.car.data){

            return true;
        }
        return false;
    }

    experienceAddedHandler(){

        const carExperienceComp = this.template.querySelector("c-car-experiences");
        if(carExperienceComp){
            carExperienceComp.getCarExperiences();
            
        }
        this.selectedTabValue= 'viewexperience';

    }
}