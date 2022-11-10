import { LightningElement, wire,api } from 'lwc';
import {createRecord} from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import NAME_FIELD from '@salesforce/schema/Car_Experience__c.Name';

import EXP_FIELD from '@salesforce/schema/Car_Experience__c.Experience__c';

import CAR_FIELD from '@salesforce/schema/Car_Experience__c.Car__c';

import EXP_OBJ from '@salesforce/schema/Car_Experience__c';


export default class AddCarExperience extends LightningElement {

      expTitle='';
      expDescription='';
      @api carId;
     



    addExperience(){
      const fields={}
      fields[NAME_FIELD.fieldApiName] = this.expTitle;
      fields[EXP_FIELD.fieldApiName] = this.expDescription;
      fields[CAR_FIELD.fieldApiName] = this.carId;
      console.log("Add Experience method carId: " +this.carId);
      const recordInput ={apiName:EXP_OBJ.objectApiName,fields}
      createRecord(recordInput).then(carExp =>{
        this.showToast('Success','Experience Updated','success');
        const navigateTo = new CustomEvent('experienceadded');
        this.dispatchEvent(navigateTo);
      }).catch( error =>{
        this.showToast('Error',error.body.message,'error');
      });
      
      this.handleCancel();
    }

    titleChange(event){
        this.expTitle= event.target.value;
    }
    handleDescription(event){
        this.expDescription= event.target.value;
    }
    showToast(title,msg,variant){
      const evt = new ShowToastEvent({
          title:title,
          message:msg,
          variant:variant

      });
      this.dispatchEvent(evt);

  }
  handleCancel(){
    
    this.template.querySelectorAll('lightning-input').forEach(element => {
      
        element.value = null;
           
    });
    this.template.querySelectorAll('lightning-input-rich-text').forEach((input) => {
      input.setRangeText("", 0, input.value.length, "start");
    });
    console.log("Reseting input box  1");

  }
}