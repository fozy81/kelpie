import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({

    title(i){
        let title  = ["Date and Time", "Bird survey", "Snail count","Iris", "Soil moisture"]
        title = title[i % 5]       
        return title 
    },

    description(i){
        let title  = ["Date and time details", "10 minute bird survey", "Catch and relase snail count",
        "Collect iris species mesurements", "Record soil moisture"]
        title = title[i % 5]       
        return title 
    }
    ,

    afterCreate(form, server){
        server.createList('response', 2, { form });
    }

});
