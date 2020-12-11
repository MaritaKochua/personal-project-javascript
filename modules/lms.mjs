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
            throw new Error("must be an object");
        } else{
            this.m.set(sub.subjectId, sub);
        }
    }
    remove(sub){
        if(!this.m.has(sub.title) || this.m.get(sub.title) === undefined) {
            throw new Error ('user does not exist');
        } else{
            this.m.delete(sub);
            // console.log('deleted');
            return true;
        }
    }
    verify(sub){
            // console.log(this.m.has(sub.title))
            return this.m.has(sub);
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

const history = new Subject({
    title: 'History',
    lessons: 24
  });
  const history2 = new Subject({
    title: 'Arts',
    lessons: 24
  });

// // lms.remove(history);
lms.add(history);
lms.add(history2);

// console.log(history);


export{lms, history};