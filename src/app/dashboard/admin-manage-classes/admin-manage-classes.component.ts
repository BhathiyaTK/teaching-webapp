import { Component, OnInit, ViewChild } from '@angular/core';
import { ClassApprovalsComponent } from './class-approvals/class-approvals.component';

@Component({
  selector: 'app-admin-manage-classes',
  templateUrl: './admin-manage-classes.component.html',
  styleUrls: ['./admin-manage-classes.component.css']
})
export class AdminManageClassesComponent implements OnInit {

  constructor() { }

  hasPendingRequest: boolean = false;

  @ViewChild('classApprovals', {static: false}) classApprovals: ClassApprovalsComponent

  ngOnInit(): void {
  }

  toggleRedBubbleVisibility(newVal) {
    this.hasPendingRequest = newVal;
  }

}
