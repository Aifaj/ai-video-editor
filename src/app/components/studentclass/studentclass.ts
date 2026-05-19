import { Component } from '@angular/core';
import { Stuclass } from '../../services/stuclass';

@Component({
  selector: 'app-studentclass',
  imports: [],
  templateUrl: './studentclass.html',
  styleUrl: './studentclass.scss',
})
export class Studentclass {


  constructor(private stuclass: Stuclass) { }

  ngOnInit() {
  this.getAllStudent();
  this.getStudentClassView();
  this.getSCByProcedure();
  }

  getAllStudent() {

    this.stuclass.getAllStudent('/getAllStudent').subscribe({
      next: (data) => {
        console.log(data)
      }, error: (err) => {
        console.log(err)
      }
    })

  }

  getStudentClassView(){

    this.stuclass.getStudentClassView('/getStudentClassView').subscribe({
      next: (data) => {
        console.log(data)
      }, error: (err) => {
        console.log(err)
      }
    })
  }


  getSCByProcedure(){

    this.stuclass.getSCByProcedure('/getSCByProcedure').subscribe({
      next: (data) => {
        console.log(data)
      }, error: (err) => {
        console.log(err)
      }
    })

  }

}
