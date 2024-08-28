import { Injectable, inject } from '@angular/core';
import { Note } from '../interfaces/note.interface';
import { Firestore, collection, doc, onSnapshot } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class NoteListService {

  trashNotes: Note[] = [];
  normalNotes: Note[] = [];

  unsubNotes;
  unsubTrash;

  firestore: Firestore = inject(Firestore);

  constructor() { 
    this.unsubNotes = this.subNotesList();
    this.unsubTrash = this.subTrashList();
  }

  subNotesList() {
    return onSnapshot(this.getNotesRef(), (list) => {
      this.normalNotes = [];
      list.forEach(element => {
        this.normalNotes.push(this.setNoteObject(element.data(), element.id));
        
      });
    });
  }

  subTrashList() {
    return onSnapshot(this.getTrashRef(), (list) => {
      this.trashNotes = [];
      list.forEach(element => {
       this.trashNotes.push(this.setNoteObject(element.data(), element.id));
        
      });
    });
  }

  ngonDestroy() {
    this.unsubNotes();
    this.unsubNotes();
  }

  setNoteObject(obj: any, id:string) {
    return {
      id: id || "",
      type: obj.type || "note",
      title: obj.title || "",
      content: obj.content || "",
      marked: obj.marked || false,
  }
  }

  getNotesRef() {
    return collection(this.firestore, "notes");
  }

  getTrashRef() {
    return collection(this.firestore, "trash");
  }

  getSingleDocRef(colId:string, docId:string) {
    return doc(collection(this.firestore, colId), docId);
  }

}
