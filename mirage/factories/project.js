import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({

    title(i){
        let title  = ["Welcome Project","Bird Survey", "Crop Research","Capture-Release", "Iris"]
        title = title[i]       
        return title
     },

    description(i){
        let description  = ["Demo project","Bird surveys in Lanark area",
                            "Sampling for crop research",
                            "Capture-Release snails to estimate population density", 
                            "Collect iris data for machine learning dataset"]
        description = description[i]       
        return description
    },

    startDate(){
        return faker.date.past();
    },

    afterCreate(project, server){
        server.createList('task', 5, { project });
    }

});
