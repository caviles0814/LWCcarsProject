import { LightningElement,api,track, wire} from 'lwc';
import { publish,subscribe,unsubscribe,createMessageContext,releaseMessageContext, MessageContext} from 'lightning/messageService';
import myChannel from "@salesforce/messageChannel/carMessageChannel__c";

export default class CarTile extends LightningElement {
    @api car;
    @api  carSelectedId;
    context = createMessageContext();
    @wire(MessageContext) msgContext;
     

    //
    subscription =null;
    //

    handleCarSelect(event){
      
        event.preventDefault(); //default action of this anchor will be prevented

        const carId= this.car.Id;
        const carSelc = new CustomEvent('carselect',{detail:carId});
        this.dispatchEvent(carSelc);
       
        const payload = {
            msg:carId
        }
        publish(this.msgContext,myChannel,this.car) ;
        
    }

     
    /*
    get isCarSelect(){

        if(this.car.Id===carSelectedId){
            return 'tile selected'
        }
        return 'tile';
    } */
}
// chages made today November 10