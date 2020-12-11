import { pupil } from './pupils.mjs';

class Groups{
    constructor(m){
        this.m = new Map();
    }
    add(room){
        if (typeof room !== 'number'){
            throw new Error('Room must be a nubmer')
        } else{
            let group = {room};
            group.id = (0|Math.random()*6.04e7).toString(36);
            this.m.set(group.id, group);
            return group.id
        }
    }
    remove(id){
        if(!this.m.has(id) || this.m.get(id) === undefined) {
            throw new Error ('Group does not exist');
        } else{
            this.m.delete(id);
            console.log(deleted);
            return true;
            }
    }
    read(id){
        console.log(this.m.get(id));
        return this.m.get(id)
    }
    readAll(x){
        if(!!x) {
            throw new Error("Parameter can't be passed");
        } else {
            let arr = [];
            for (let value of this.m.values()) arr.push(value);
            console.log(arr);
            return arr;
        }
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
    addPupil(id, pupil){
        if(!this.m.has(id) || this.m.get(id) === undefined) {
            throw new Error ('Group does not exist');
        } else{
            let group = this.m.get(id);
            group[pupil.id] = pupil;
        }
    }
    removePupil(id){
        if(!this.m.has(id) || this.m.get(id) === undefined) {
            throw new Error ('Group does not exist');
        } else{
            this.m.delete(id);
            console.log(deleted);
            return true;
        }
    }
}
const room = 236;

const groups = new Groups();

const groupId = groups.add(room);

groups.addPupil(groupId, pupil);

groups.update(groupId, {
    room: 237
  });

groups.readAll();

export{ groups };