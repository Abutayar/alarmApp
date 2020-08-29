import { Injectable } from '@angular/core';
import { DBInterface, DBInsertInterface, DBUpdateInterface } from '../../_interfaces/db.interface';
import { generateRandomId } from '../../_helper/helper';
import { writeObjectToLS, rewriteObjectToLS, removeObjectFromLS, readObjectFromLS } from '../../_helper/localStorage.helper';

@Injectable({
  providedIn: 'root'
})
export class DbServiceService {
  private key = 'dataset'
  constructor() { }

  read(): DBInterface {

    return readObjectFromLS(this.key);
  }

  insert(data: DBInsertInterface) {
    const id = generateRandomId();
    const dataToInsert:DBInterface = {
      [id] : {...data, ...{id}}
    }
    return writeObjectToLS(this.key,dataToInsert);
  }

  update(id:string, data: DBUpdateInterface) {
    return rewriteObjectToLS(this.key,id,{...data, ...{id}})
  }

  delete(id: string) {
    return removeObjectFromLS(this.key,id)
  }

  hasEditWithId(id: string) {
    const Dataset = this.read();
    return !!(Dataset && Dataset[id])
  }

  getAlarmMetaById(id: string): DBInsertInterface{
    const Dataset = this.read();
      if(!Dataset) return null;
      return Dataset[id];
  }

  updateStatus(id,status: boolean){
    const Dataset = this.read();
      if(!Dataset) return null;
      Dataset[id].status = status;
      this.update(id,Dataset[id]);
  }

  updateNextTrigger(id,nextTrigger: string){
    console.log()
    const Dataset = this.read();
      if(!Dataset) return null;
      Dataset[id].nextTrigger = nextTrigger;
      this.update(id,Dataset[id]);
  }

  updateMinutes(id,minute: string){
    console.log()
    const Dataset = this.read();
      if(!Dataset) return null;
      Dataset[id].minute = minute;
      this.update(id,Dataset[id]);
  }
}
