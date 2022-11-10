import { LightningElement,api } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';

export default class CarDetail extends NavigationMixin(LightningElement) {
 
    @api car;

    fullDetails(){

     this[NavigationMixin.Navigate]({

        type:"standard__recordPage",
        attributes:{
            recordId: this.car.data.fields.Id.value,
            objectApiName:"Car__c",
            actionName:"view"
        }
     });
    }
    get carName(){
        try{
            return this.car.data.fields.Name.value;
        }
        catch(error){
            return "N/A";
        }
    }
    get ownerName(){
       
        try{
            return this.car.data.fields.Contact__r.value.fields.Name.value;
        }
        catch(error){
            return "N/A";
        }
    }
    get carMileage(){
        try{
            return this.car.data.fields.Mileage__c.value;
        }
        catch(error){
            return "N/A";
        }
    }
    get carPerDayRent(){
        try{
            return this.car.data.fields.Per_Day_Rent__c.value;
        }
        catch(error){
            return "N/A";
        }
    } 
    get carType(){
        try{
            return this.car.data.fields.Car_Type__r.value.fields.Name.value;
        }
        catch(error){
            return "N/A";
        }
    }
    get carContactName(){
        try{
            return this.car.data.fields.Contact__r.Name.value;
        }
        catch(error){
            return "N/A";
        }
    }
    get carContactEmail(){
        try{
            return this.car.data.fields.Contact__r.Email.value;
        }
        catch(error){
            return "N/A";
        }
    }
     get carContactPhone(){
        try{
            return this.car.data.fields.Contact__r.Phone.value;
        }
        catch(error){
            return "N/A";
        }
    }
    get carPicture(){
        try{
            return this.car.data.fields.Picture__c.value;
        }
        catch(error){
            return "N/A";
        }
    }


}