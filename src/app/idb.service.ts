import {Injectable} from '@angular/core';
import idb from 'idb';
import {Observable, Subject} from 'rxjs';
import { ObjectFile } from './model/ObjectFile';



@Injectable({
  providedIn: 'root'
})
export class IdbService {
// tslint:disable-next-line:variable-name
private _dataChange: Subject<ObjectFile> = new Subject<ObjectFile>();
// tslint:disable-next-line:variable-name
private _dbPromise;

constructor() {
}

// tslint:disable-next-line:typedef
connectToIDB() {
  this._dbPromise = idb.open('documents', 1, UpgradeDB => {
    if (!UpgradeDB.objectStoreNames.contains('Files')) {
      UpgradeDB.createObjectStore('Files', {keyPath: 'id', autoIncrement: true});
    }
    if (!UpgradeDB.objectStoreNames.contains('Sync-Files')) {
      UpgradeDB.createObjectStore('Sync-Files', {keyPath: 'id', autoIncrement: true});
    }
  });
}

// tslint:disable-next-line:typedef
addItems(target: string, value: ObjectFile) {
  this._dbPromise.then((db: any) => {
    const tx = db.transaction(target, 'readwrite');
    tx.objectStore(target).put(value);
    this.getAllData('Files').then((items: ObjectFile) => {
    this._dataChange.next(items);
  });
    return tx.complete;
  });
}

// tslint:disable-next-line:typedef
deleteItems(target: string, value: ObjectFile) {
  this._dbPromise.then((db: any) => {
    const tx = db.transaction(target, 'readwrite');
    const store = tx.objectStore(target);
    store.delete(2);
    this.getAllData(target).then((items: ObjectFile) => {
      this._dataChange.next(items);
    });
    return tx.complete;
  });
}

// tslint:disable-next-line:typedef
getAllData(target: string) {
  return this._dbPromise.then((db: any) => {
    const tx = db.transaction(target, 'readonly');
    const store = tx.objectStore(target);
    return store.getAll();
  });
}

getItem(target: string, value: string): ObjectFile {
  return this._dbPromise.then((db: any) => {
    const tx = db.transaction(target, 'readonly');
    const store = tx.objectStore(target);
    return store.get(value);
  });
}

dataChanged(): Observable<ObjectFile> {
    return this._dataChange;
  }
  }
