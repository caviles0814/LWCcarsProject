public with sharing class CarExperiences {

    @AuraEnabled
    public static List<Car_Experience__c> carExperiencesList( String carId){

        return [Select Name,Id,	Experience__c,
        CreatedDate,CreatedBy.Name,
        CreatedBy.SmallPhotoUrl,
        CreatedBy.CompanyName,LastModifiedDate
        
        from Car_Experience__c
        where Car__c = :carId
        Order by CreatedDate desc];
    }
}
