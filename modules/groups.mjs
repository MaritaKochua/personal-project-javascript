import { pupil, pupils } from './pupils.mjs';

class Groups{
    constructor(m){
        this.m = new Map();
    }
    add(room){
        for (let value of this.m.values()) {
            if(value.room === room){
                throw new Error('This room is busy!')
            }
        };
        if (typeof room !== 'number'){
            throw new Error('Room must be a number')
        } else{
            let group = {room};
            group.id = (0|Math.random()*6.04e7).toString(36);
            group.pupils = new Map();
            this.m.set(group.id, group);
            return group.id
        }
    }
    remove(id){
        if(!this.m.has(id) || this.m.get(id) === undefined) {
            throw new Error ('Group does not exist');
        } else{
            this.m.delete(id);
            return true;
            }
    }
    read(id){
        if(!this.m.has(id) || this.m.get(id) === undefined) {
            throw new Error ('Group does not exist');
        } else{
        return this.m.get(id)
        }
    }
    readAll(x){
        if(!!x) {
            throw new Error("Parameter can't be passed");
        } else {
            let arr = [];
            for (let value of this.m.values()) arr.push(value);
            // console.log('arr');
            return arr;
        }
    }
    update(id, updated){
        if(!this.m.has(id) || this.m.get(id) === undefined) {
            throw new Error("Id does not exist");
        } else if(typeof updated !== 'object'){
            throw new Error("Updated entry must be an object");
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
        } else if(typeof pupil !== 'object'){
            throw new Error ('Pupil must be an object!');
        } else{
            let group = this.m.get(id);
            group.pupils.set(pupil.id, pupil);
        }
    }
    removePupil(id, pupil){
        if(!this.m.has(id) || this.m.get(id) === undefined) {
            throw new Error ('Group does not exist');
        } else if(!this.m.get(id).pupils.has(pupil)){
            throw new Error ('Pupil is not in this group!');
        } else{
            let group = this.m.get(id);
            group.pupils.delete(pupil);
            return true;
        }
    }
}
const room = 236;
const room2 = 206;

const groups = new Groups();

const groupId = groups.add(room);
const groupId2 = groups.add(room2);


groups.addPupil(groupId, pupil);


export{ groups, pupil, groupId };