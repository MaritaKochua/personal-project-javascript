function dataValidator(teacher){
    if (
        (teacher.name.first === undefined || typeof teacher.name.first !== 'string') ||
        (teacher.name.last === undefined || typeof teacher.name.last !== 'string')
    ){
        throw new Error("Teacher must have a full name");
    } else if(teacher.image === undefined || typeof teacher.image !== 'string'){
        throw new Error("Teacher must have an image");
    } else if(teacher.dateOfBirth === undefined || typeof teacher.dateOfBirth !== 'string'){
        throw new Error("You must enter a valid date of birth");
        // add validator for date
    } else if(
        teacher.emails === undefined || 
        teacher.emails[0].email === undefined ||
        typeof teacher.emails[0].email !== 'string' ||
        teacher.emails[0].primary === undefined ||
        typeof teacher.emails[0].primary !== 'boolean'
        ){
        console.log(typeof teacher.emails[0].email);
        throw new Error("Teacher must have a valid email address");
    } else if(
        teacher.phones === undefined || 
        teacher.phones[0].phone === undefined ||
        typeof teacher.phones[0].phone !== 'string' ||
        teacher.phones[0].primary === undefined ||
        typeof teacher.phones[0].primary !== 'boolean'
        ){
        throw new Error("Teacher must have a valid phone number");
    } else if(teacher.sex === 'male' || typeof teacher.sex === 'female'){
        throw new Error("Teacher must have a sex chosen");
    } else if(teacher.subjects === undefined || typeof teacher.subjects[0].subject !== 'string'){
        throw new Error("Teacher must have a subject");
    } else if(typeof teacher.description !== 'string' && teacher.description !== undefined){
        throw new Error("Description must be text");
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
        console.log(this.m.get(id));
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
            console.log(deleted);
            return true;
        }
    }
}

const teachers = new Teachers();

const data = {
  "name": {
    "first": "Marita",
    "last": "Kochua"
  },
  "image": 'url',
  "dateOfBirth": "string", 
  "emails": [
    {
      "email": "maritakochua@gmial.com",
      "primary": true,
    }
  ],
  "phones": [
    {
      "phone": "5694598382",
      "primary": true
    }
  ],
  "sex": "female", // male or female
  "subjects": [
    {
      "subject": "math",
      "subject": 'notmath'
    }
  ]
}

const updatedProfile = {
    "name": {
      "first": "NotMarita",
      "last": "Kochua"
    },
    "image": 'url2',
    "dateOfBirth": "st2ring", 
    "emails": [
      {
        "email": "maritakochua@gmial.com",
        "primary": true,
      }
    ],
    "phones": [
      {
        "phone": "no",
        "primary": true
      }
    ],
    "sex": "female", // male or female
    "subjects": [
      {
        "subject": "math",
        "subject": 'notmath'
      }
    ]
  }

const teacherId = teachers.add(data);

// teachers.read(teacherId)

teachers.read(teacherId);
teachers.update(teacherId, updatedProfile);
teachers.read(teacherId);

export{teachers, teacherId}