
import { LightningElement, track, wire } from 'lwc';
 
import { CurrentPageReference } from 'lightning/navigation';
import LL from '@salesforce/resourceUrl/Leaflet';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { publish,subscribe,unsubscribe,createMessageContext,releaseMessageContext, MessageContext} from 'lightning/messageService';
import myChannel from "@salesforce/messageChannel/carMessageChannel__c";
export default class CarLocation extends LightningElement {
    @track car;

    @wire(CurrentPageReference) pageRef;

    leafletLoaded = false;
    leafletMap;
    @wire (MessageContext) msgContext;
    connectedCallback(){
        subscribe(this.msgContext,myChannel,(payload)=>{
            this.fetchCarDetails(payload);
            console.log('Connected callback carLocatiopn comp payload'+ payload);
       })
    }

    disconnectedCallback(){
        unsubscribe(this.subscription);
        this.subscription= null;
    }

    renderedCallback(){
        if(!this.leafletLoaded){
            Promise.all([
                loadStyle(this, LL+'/leaflet.css'),
                loadScript(this, LL+'/leaflet-src.js')
            ]).then(() =>{
                this.leafletLoaded = true;
            }).catch((error =>{
                this.showToast('ERROR', error.body.message, 'error');
            }));
        }
    }


    fetchCarDetails(payload){
        this.car = payload;

        if(this.leafletLoaded){
            if(!this.leafletMap){
                const map = this.template.querySelector('.map');
                if(map){
                    this.leafletMap = L.map(map, {zoomControl : true} ).setView([42.356045, -71.085650], 13);
                    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {attribution : 'Tiles For Rent A Car'}).addTo(this.leafletMap);
                }
            }
                if(this.car){
                    const location = [this.car.Geolocation__Latitude__s, this.car.Geolocation__Longitude__s];

                    const leafletMarker = L.marker(location);
                    leafletMarker.addTo(this.leafletMap);
                    this.leafletMap.setView(location);
                }
            
        }
    }

    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }

    get hasCar(){
        if(this.car){
            return 'slds-is-expanded';
        }
        return 'slds-is-collapsed';
    }

}