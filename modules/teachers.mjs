function dataValidator(teacher){
  const date = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
    if (
        (teacher.name.first === undefined || typeof teacher.name.first !== 'string') ||
        (teacher.name.last === undefined || typeof teacher.name.last !== 'string')
    ){
        throw new Error("Teacher must have a full name");
    } else if(teacher.image === undefined || typeof teacher.image !== 'string'){
        throw new Error("Teacher must have an image");
    } else if(
      teacher.dateOfBirth === undefined || 
      typeof teacher.dateOfBirth !== 'string' ||
      !(date.test(teacher.dateOfBirth))){
        throw new Error("You must enter a valid date of birth");
    } else if(
        teacher.emails === undefined || 
        teacher.emails[0].email === undefined ||
        typeof teacher.emails[0].email !== 'string' ||
        teacher.emails[0].primary === undefined ||
        typeof teacher.emails[0].primary !== 'boolean'
        ){
        throw new Error("Teacher must have a valid email address");
    } else if(
        teacher.phones === undefined || 
        teacher.phones[0].phone === undefined ||
        typeof teacher.phones[0].phone !== 'string' ||
        teacher.phones[0].primary === undefined ||
        typeof teacher.phones[0].primary !== 'boolean'
        ){
        throw new Error("Teacher must have a valid phone number");
    } else if(
            teacher.sex.toLowerCase() !== 'male' && 
            teacher.sex.toLowerCase() !== 'female'
            ){
        throw new Error("Teacher must have a sex chosen");
    } else if(
        teacher.subjects[0].subject === undefined ||
        teacher.subjects[0].subject === "" ||
        teacher.subjects === undefined || 
        typeof teacher.subjects[0].subject !== 'string'){
        throw new Error("Teacher must have a subject");
    } else if(typeof teacher.description !== 'string' && teacher.description !== undefined){
        throw new Error("Description must be text");
    }

    let primaryCount = 0;
    for(let i = 0; i < teacher.emails.length; i++){
      if (teacher.emails[i].primary === true){
        primaryCount++
      }
    }
    if (primaryCount > 1){
      throw new Error("You can't have more than one primary email!");
    }

    let primaryCount2 = 0;
    for(let i = 0; i < teacher.phones.length; i++){
      if (teacher.phones[i].primary === true){
        primaryCount2++
      }
    }
    if (primaryCount2 > 1){
      throw new Error("You can't have more than one primary phone numbers!");
    }

}

class Teachers{
    constructor(m){
        this.m = new Map();
    }
    add(teacher){
        dataValidator(teacher);
        teacher.id = (0|Math.random()*6.04e7).toString(36);
        this.m.set(teacher.id, teacher);
        return teacher.id
    }
    read(id){
        if(!this.m.has(id)){
          throw new Error("Teacher does not exist");
        } else{
          return this.m.get(id)
        }
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
            return true;
        }
    }
}



const teachers = new Teachers();

// teachers

const data = {
    "name": {
      "first": "Lasha",
      "last": "GvariArmaxsovs"
    },
    "image": 'url2',
    "dateOfBirth": "10/02/1990", 
    "emails": [
      {
        "email": "someemail@gmail.com",
        "primary": true,
      }
    ],
    "phones": [
      {
        "phone": "45253242",
        "primary": true
      }
    ],
    "sex": "male", // male or female
    "subjects": [
      {
        "subject": "hisTory",
      }
    ]
  }


const teacherId = teachers.add(data);

export {teachers, teacherId};