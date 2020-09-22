export default function() {


 /*    this.get('/projects', () => {
        return {
          data: [
            { id: 1, type: 'projects', attributes: { title: 'Welcome project',
                                                     description: 'Demo research project' }}
                                                    ]
        };
      }); */


      
    this.get('/projects');
    this.post('/projects');
    this.get('/projects/:id');
    this.resource('tasks');
    this.resource('forms');
    this.resource('responses');
 

    // this.resource('templates');
    this.resource('formTemplates');
    this.resource('actions');
}
