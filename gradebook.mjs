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
        for(let value of this.m.values()){
            if(value.group.id === groupId){
                throw new Error("This group already has a journal!");
            }
        }
        if (typeof level !== 'number' || typeof level === undefined){
            throw new Error("Must add level of grade");
        } 
        // else if(this.m.get.group.has(groupId)){

        // } 
        else{
            const group = this.groups.read(groupId);
            let journal = {level, group};
            journal.id = (0|Math.random()*6.04e7).toString(36);
            this.m.set(journal.id, journal);
            for(let value of group.pupils.values()){ value.records = []};
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
        else if(record.subjectId === undefined || record.subjectId !== this.lms.m.get(record.subjectId).id){
            console.log(this.lms.verify(record.subjectId));
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
        const newRecord = {
            name: pupils.get(pupilId).name.first + " " + pupils.get(pupilId).name.last,
            records: grades
        };
        return newRecord;
    }
    readAll(gradebookId){
        if(!this.m.has(gradebookId) || gradebookId === undefined) {
            throw new Error("parameter can't be passed");
        } else {
            const pupils = this.m.get(gradebookId).group.pupils;
            let arr = [];
            for (let key of pupils.keys()){
                let temp = this.read(gradebookId, key);
                arr.push(temp);
            };
            return arr;
        }
    }
}


const pupilId = pupil.id;
const level = 1;
const gradebooks = new Gradebooks(groups, teachers, lms);
const gradebookId = gradebooks.add(level, groupId);
// const gradebookId2 = gradebooks.add(3, groupId);

const record = {
    pupilId: pupilId,
    teacherId: teacherId,
    subjectId: history.id,
    lesson: 1,
    mark: 9
  };
  const record2 = {
    pupilId: pupilId,
    teacherId: teacherId,
    subjectId: history.id,
    lesson: 10,
    mark: 9
  };
  gradebooks.addRecord(gradebookId, record);
  gradebooks.addRecord(gradebookId, record2);

  const oliver = gradebooks.read(gradebookId, pupilId);

  const students = gradebooks.readAll(gradebookId);
  console.log(students);

console.log(students[0]);