function dataValidator(pupil){
    const date = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
      if (
          (pupil.name.first === undefined || typeof pupil.name.first !== 'string') ||
          (pupil.name.last === undefined || typeof pupil.name.last !== 'string')
      ){
          throw new Error("Pupil must have a full name");
      } else if(pupil.image === undefined || typeof pupil.image !== 'string'){
          throw new Error("Pupil must have an image");
      } else if(
        pupil.dateOfBirth === undefined || 
        typeof pupil.dateOfBirth !== 'string' ||
        !(date.test(pupil.dateOfBirth))){
          throw new Error("You must enter a valid date of birth");
      } else if(
          pupil.phones === undefined || 
          pupil.phones[0].phone === undefined ||
          typeof pupil.phones[0].phone !== 'string' ||
          pupil.phones[0].primary === undefined ||
          typeof pupil.phones[0].primary !== 'boolean'
          ){
          throw new Error("Pupil must have a valid phone number");
      } else if(
              pupil.sex.toLowerCase() !== 'male' && 
              pupil.sex.toLowerCase() !== 'female'
              ){
          throw new Error("Pupil must have a sex chosen");
      }  else if(typeof pupil.description !== 'string' && pupil.description !== undefined){
          throw new Error("Description must be text");
      }

      let primaryCount2 = 0;
      for(let i = 0; i < pupil.phones.length; i++){
        if (pupil.phones[i].primary === true){
          primaryCount2++
        }
      }
      if (primaryCount2 > 1){
        throw new Error("You can't have more than one primary phone numbers!");
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
        dataValidator(updated);
        updated.id = id;
        this.m.set(id, updated);
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
    "image": "ulr",
    "dateOfBirth": "10/12/1997", // format date
    "phones": [
      {
        "phone": "324912321",
        "primary": true
      }
    ],
    "sex": "female", // male OR female
  }

const pupils = new Pupils();

// add pupil
const pupil = pupils.add(data);

export{pupils, pupil};

