function dataValidator(pupil){
    if (
        (pupil.name.first === undefined || typeof pupil.name.first !== 'string') ||
        (pupil.name.last === undefined || typeof pupil.name.last !== 'string')
    ){
        throw new Error("Pupil must have a full name");
    } else if(pupil.image === undefined || typeof pupil.image !== 'string'){
        throw new Error("Pupil must have an image");
    } else if(pupil.dateOfBirth === undefined || typeof pupil.dateOfBirth !== 'string'){
        throw new Error("You must enter a valid date of birth");
        // add validator for date
    } else if(
        pupil.phones === undefined || 
        pupil.phones[0].phone === undefined ||
        typeof pupil.phones[0].phone !== 'string' ||
        pupil.phones[0].primary === undefined ||
        typeof pupil.phones[0].primary !== 'boolean'
        ){
        throw new Error("Pupil must have a valid phone number");
    } else if(pupil.sex === 'male' || typeof pupil.sex === 'female'){
        throw new Error("Pupil must have a sex chosen");
    }  else if(typeof pupil.description !== 'string' && pupil.description !== undefined){
        throw new Error("Description must be text");
    }
}

class Pupils{
    constructor(m){
        this.m = new Map();
    }
    add(pupil){
        dataValidator(pupil);
        pupil.id = (0|Math.random()*6.04e7).toString(36);
        this.m.set(pupil.id, pupil);
        return pupil
    }
    read(id){
        // console.log(this.m.get(id));
        return this.m.get(id)
    }
    update(id, updated){
        if(!this.m.has(id) || this.m.get(id) === undefined) {
            throw new Error("Id does not exist");
        } 
        let newUser = this.m.get(id);
        let newkey = Object.keys(updated)[0];
        let value = Object.values(updated)[0]; 
        newUser[newkey] = value;
        this.m.set(id, newUser)
        return this.m.get(id);
    }
    remove(id){
        if(!this.m.has(id) || this.m.get(id) === undefined) {
            throw new Error ('user does not exist');
        } else{
            this.m.delete(id);
            // console.log('deleted');
            return true;
        }
    }
}

const data = {
    "name": {
      "first": "Marita",
      "last": "Kochua"
    },
    "image": "string",
    "dateOfBirth": "string", // format date
    "phones": [
      {
        "phone": "string",
        "primary": true
      }
    ],
    "sex": "string", // male OR female
    "description": "string"
  }

const pupils = new Pupils();

const pupil = pupils.add(data);


export{pupils, pupil}