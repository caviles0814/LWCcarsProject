import { LightningElement,track,api,wire } from 'lwc';
import getCars from '@salesforce/apex/CarSearchResult.getCars';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
//
import { publish,subscribe,unsubscribe,createMessageContext,releaseMessageContext, MessageContext} from 'lightning/messageService';
import myChannel from "@salesforce/messageChannel/carMessageChannel__c";
//
export default class CarSearchResult extends LightningElement {
    //
    subscription =null;
    //
    @api carTypeId;
    @track cars;
    @track selectedCarId;
    @wire(getCars,{CarTypeId:'$carTypeId'})
    wiredCars({data,error}){

        if(data){
          this.cars = data;
        }
        else if(error){
        this.showToast("Error",error.body.message,'error')
        }
    }
    showToast(title,msg,variant){
        const evt = new ShowToastEvent({
            title:title,
            message:msg,
            variant:variant

        });
        this.dispatchEvent(evt);

    }
   get getCarsFound(){
    if(this.cars){
        return true;
    }
    return false;
   }

   carSelectHandler(event){
    const carId = event.detail;
    this.selectedCarId= carId;
    console.log("Selected car Id1: "+this.selectedCarId);
   
   }

 
}