import{ groups, pupil , groupId} from './modules/groups.mjs';
import{ teachers, teacherId } from './modules/teachers.mjs';
import{ lms, history } from './modules/lms.mjs';
class Gradebooks{
    constructor(groups, teachers, lms, m){
        this.groups = groups;
        this.teachers = teachers;
        this.lms = lms;
        this.m = new Map();
    }
    add(level, groupId){
        if (typeof level !== 'number' || typeof level === undefined){
            throw new Error("Must add level of grade");
        } else{
            
            const group = this.groups.read(groupId);
            let journal = {level, group};
            journal.id = (0|Math.random()*6.04e7).toString(36);
            this.m.set(journal.id, journal);
            return journal.id;
        }
    }
    addRecord(gradebookId, record){
        if(!this.m.has(gradebookId) || this.m.get(gradebookId) === undefined) {
            throw new Error ('Journal does not exist');
        } else if(typeof record !== 'object' || record === undefined){
            throw new Error ('Entered record is invalid');
        } 

        const pupils = this.m.get(gradebookId).group.pupils;

        if(record.pupilId === undefined || !pupils.has(pupilId)){
            throw new Error ('Pupil is not in this journal');
        } 
        else if( record.teacherId === undefined || !this.teachers.read(record.teacherId)){
            throw new Error ('Teacher does not exist');
        }
        else if(record.subjectId === undefined || !this.lms.verify(record.subjectId)){
            throw new Error ('Subject does not exist');
        } else if(record.mark === undefined || typeof record.mark !== 'number'){
            throw new Error (`The mark must be a number!`)
        }
        const subject = this.lms.m.get(record.subjectId);
        const teacher = this.teachers.read(teacherId);
        if(subject.title.toLowerCase() !== teacher.subjects[0].subject.toLowerCase()){
            throw new Error (`This teacher does not teach ${subject.title}`)
        } else if(typeof record.lesson !== 'number' || record.lesson <= 0){
            throw new Error (`Lesson amount must be a number!`)
        } else if(subject.lessons < record.lesson){
            throw new Error (`There's only ${subject.lessons} lessons in class! `)
        }
        pupils.get(record.pupilId).records = [];
        const newRecord = {
            teacher: teacher.name.first + " " + teacher.name.last,
            subject: this.lms.m.get(record.subjectId).title,
            lesson: record.lesson,
            mark: record.mark
        };
        pupils.get(record.pupilId).records.push(newRecord);
    }
    read(gradebookId, pupilId){
        const pupils = this.m.get(gradebookId).group.pupils;
        const grades = pupils.get(pupilId).records;
        const records = {
            name: pupils.get(pupilId).name.first + " " + pupils.get(pupilId).name.last,
            records: grades
        }
        console.log(records);
        return records;
    }
    readAll(gradebookId){
        if(!this.m.has(gradebookId) || gradebookId === undefined) {
            throw new Error("parameter can't be passed");
        } else {
            const pupils = this.m.get(gradebookId).group.pupils;
            let arr = [];
            for (let value of pupils.values()) arr.push(value);
            return arr;
        }
    }
}


const pupilId = pupil.id;
const level = 1;
const gradebooks = new Gradebooks(groups, teachers, lms);
const gradebookId = gradebooks.add(level, groupId);

const record = {
    pupilId: pupilId,
    teacherId: teacherId,
    subjectId: history.id,
    lesson: 1,
    mark: 9
  };

  gradebooks.addRecord(gradebookId, record);
  const oliver = gradebooks.read(gradebookId, pupilId);

  const students = gradebooks.readAll(gradebookId); // It will return the array of objects