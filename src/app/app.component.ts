import { Component } from '@angular/core';
// import { randomInt } from 'crypto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
// store member state
export class AppComponent {
  newMemberName = '';
  members: string[] = [];
  errorMessage = '';
  numberOfTeams: number | '' = '';
  // Nested array
  teams: string[][] = [];

  onInput(member: string) {
    this.newMemberName = member;
    console.log(this.newMemberName);
  }
  onNumberOfTeamsInput(value: string) {
    this.numberOfTeams = Number(value);
  }
  addMember() {
    if (!this.newMemberName) {
      this.errorMessage = 'Empty? Input something';
      return;
    }
    this.members.push(this.newMemberName);
    this.newMemberName = '';
  }
  generateTeams() {
    this.teams = [];
    const allMembers = [...this.members];

    if (!this.numberOfTeams || this.numberOfTeams <= 0) {
      this.errorMessage = 'Invalid number of teams';
      return;
    }

    this.errorMessage = '';

    if (this.numberOfTeams > this.members.length) {
      this.errorMessage = 'Greater than the number of members';
      return;
    }
    while (allMembers.length) {
      for (let i = 0; i < this.numberOfTeams; i++) {
        const randomIndex = Math.floor(Math.random());
        // splice() return an array, and remove what it returned
        const member = allMembers.splice(randomIndex, 1)[0];
        if (!member) break;
        // If the team does not exist, then create one.
        if (this.teams[i]) {
          this.teams[i].push(member);
        } else {
          this.teams[i] = [member];
        }
        this.members = [];
      }
    }
  }
}
