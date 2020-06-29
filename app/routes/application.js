import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {

    model() {
  
 this.store.push({
    data: {
      id: '1',
      type: 'project',
      attributes: {
        title: 'Example project',
        description: 'Showcasing some features'
      },
      relationships: {
        tasks: {
          data: [
            {
              id: '2',
              type: 'task'
            },
            {
              id: '3',
              type: 'task'
            },
            {
              id: '4',
              type: 'task'
            }
          ]
        }
      }
    },
    included: [
      {
        id: '2',
        type: 'task',
        attributes: {
          title: 'Field Site 1'
        },
      relationships: {
        forms: {
          data: [
            {
              id: '5',
              type: 'form'
            }]
          }
        }
          },
      {
        id: '3',
        type: 'task',
        attributes: {
          title: 'Woodlands site 2'
        }
      },
      {
        id: '4',
        type: 'task',
        attributes: {
          title: 'Shoreline Site 3'
        }
      },
      {
      id: '5',
      type: 'form',
      attributes: {
      title: 'Wildlife',
      description: 'Record wildlife species observed'
      },
      relationships: {
        responses: {
          data: [
            {
              id: '6',
              type: 'response'
            }]
          }
        }
      },
    {
      id: '6',
      type: 'response',
      attributes: {
      question: 'Species',
      response: '',
      multiEntry: true,
      type: 'select',
      rep: 1
    }
  }
  ]
  });


this.store.push({
    data: {
      id: '7',
      type: 'template',
      attributes: {
        title: 'Wildlife',
        description: 'Record wildlife species'
      },      
      relationships: {
        actions: {
          data: [
            {
              id: '8',
              type: 'action'
            }
          ]
          }
    }
  },
  included: [
    {
    id: '8',
    type: 'action',
    attributes: {      
        question: 'Species',
        response: '',
        multiEntry: true,
        type: 'select',
        rep: '1'
    }
}]
  });

 
  
  return this.store.findAll('project', 1);


}
}