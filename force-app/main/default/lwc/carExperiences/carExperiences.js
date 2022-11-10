import { LightningElement,api,track,wire} from 'lwc';
import getCarExperiences from '@salesforce/apex/CarExperiences.carExperiencesList';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import {NavigationMixin} from 'lightning/navigation';
import { getDataConnector } from 'lightning/analyticsWaveApi';
export default class CarExperiences extends NavigationMixin(LightningElement ){

    privateCarId;
   // @api carId;
    @track carExp =[];
   /* @wire (getCarExperiences,{carId:'$carId'})
    carExperiencesWire({data,error}){
        if(data){
            
            this.carExp = data;
            console.log('Wire Car Experiences: '+ JSON.stringify(this.carExp));
          }
          else if(error){
          this.showToast("Error",error.body.message,'error')
          }

    }*/
   
    connectedCallback(){
      //console.log('Making imperative call from the connected callback');
      this.getCarExperiences();
    }
    renderedCallback(){
         
    }
    @api
    getCarExperiences(){
       
        getCarExperiences({carId:this.privateCarId}).then((exp) =>{
            this.carExp= exp;
             
        }).catch((error)=>{
            this.showToast('Error',error.body.message,'success');
        });
        
    }
    userClickHandler(event){
        
        const userId = event.target.getAttribute('data-userid');
        this[NavigationMixin.Navigate]({

            type:"standard__recordPage",
            attributes:{
                recordId: userId,
                objectApiName:"User",
                actionName:"view"
            }
         }); 
    }


    showToast(title,msg,variant){
        const evt = new ShowToastEvent({
            title:title,
            message:msg,
            variant:variant
  
        });
        this.dispatchEvent(evt);
  
    }

    get hasExperiences(){

        if(this.carExp.length){
            return true;
        }
        return false;
    }
    @api
    get carId(){
        return this.privateCarId;
    }
    set carId(value){
        this.privateCarId=value;
        this.getCarExperiences();
        console.log('Change the values from set method')
    }
}