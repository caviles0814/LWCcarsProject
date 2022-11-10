public with sharing class CarSearchResult {
   @AuraEnabled(cacheable=true)
   public static List<Car__c> getCars(String CarTypeId){
    try {
        if(String.isEmpty(CarTypeId)){
            return [Select Id,Name 
            ,Contact__r.Name,Geolocation__latitude__s,
            Geolocation__longitude__s,Available_For_Rent__c
            from Car__c
             where Available_For_Rent__c=true];
        }
        else{
            return [Select Id,Name 
            ,Contact__r.Name,Geolocation__latitude__s,
            Geolocation__longitude__s,Available_For_Rent__c
            from Car__c
             where  Available_For_Rent__c=true AND Car_Type__c =:CarTypeId];
        }
         
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
   }
}
