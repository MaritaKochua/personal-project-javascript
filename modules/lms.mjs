class LMS{
    constructor(m){
        this.m = new Map();
    }
    add(sub){
        for (let value of this.m.values()){
            if (value.title === sub.title){
                throw new Error('Subject already exists')
            }
        };
        if (typeof sub !== 'object'){
            throw new Error("Entry must be an object");
        } else{
            this.m.set(sub.subjectId, sub);
        }
    }
    remove(sub){
        if(!this.m.has(sub.title) || this.m.get(sub.title) === undefined) {
            throw new Error ('This subject does not exist');
        } else{
            this.m.delete(sub);
            // console.log('deleted');
            return true;
        }
    }
    verify(sub){
            if(sub === undefined || typeof sub !== 'object'){
                throw new Error ('The entry for verifying is incorrect')
            } 
            for (let value of this.m.values()) {
                if (value.title.toLowerCase()  === sub.title.toLowerCase() ){
                    return true
                } else{
                    return false
                }
            };
    }
    readAll(x){
        if(!!x) {
            throw new Error("parameter can't be passed");
        } else {
            let arr = [];
            for (let value of this.m.values()) arr.push(value);
            return arr;
        }
    }
}

// create subject
class Subject{
  constructor(subject){
      if(
        (typeof subject.title !== 'string'  || subject.title === undefined) ||
        (typeof subject.lessons !== 'number' || subject.lessons === undefined) ||
        (typeof subject.description !== 'string' && subject.description !== undefined)
        ){
            throw new Error ('title, lessons or description are invalid');
        }
    this.subjectId = (0|Math.random()*6.04e7).toString(36);
    this.title = subject.title;
    this.lessons = subject.lessons;
    this.description = subject.description;
  }
  get id(){
      return this.subjectId
  }
}

const lms = new LMS();

// subjects

const history = new Subject({
    title: 'History',
    lessons: 24
  });

  const arts = new Subject({
    title: 'Arts',
    lessons: 2
  });
  
  const math = new Subject({
    title: 'Math',
    lessons: 60
  });

  const notMath = new Subject({
    title: 'notMath',
    lessons: 10
  });
  
    lms.add(history);
    lms.add(arts);
    lms.add(math);



export{ lms, history };