import { LightningElement,track,wire } from 'lwc';
import getCarTypesMethod from '@salesforce/apex/CarSearchFormController.getCarTypesMethod';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class CarSearchForm extends NavigationMixin(LightningElement) {

@track carTypes;

    @wire (getCarTypesMethod)
    wiredCarTypes({data,error}){
        if(data){
            this.carTypes =[{value:'',label:'All types'}];
            data.forEach(element => {
                const carType={};
                carType.label= element.Name;
                carType.value = element.Id;
                this.carTypes.push(carType);
            });
        }
        else if(error){
            this.showToast("Error", error.body.message, "error");
        }
    }
    handleCarTypesChange(event){
        
        const carTypeId = event.detail.value;
        const carTypeSelectionEvnt = new CustomEvent('cartypeselect',{detail:carTypeId} );

        this.dispatchEvent(carTypeSelectionEvnt);


    }
    createdNewCarType(){
        this[NavigationMixin.Navigate]({
            type:'standard__objectPage',
            attributes:{
                objectApiName:'Car_Type__c',
                actionName:'new'
            }

        })

    }
    showToast(title,msg,variant){
        const evt = new ShowToastEvent({
            title:title,
            message:msg,
            variant:variant

        });
        this.dispatchEvent(evt);

    }
}