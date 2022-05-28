import { Component, Input, OnInit } from '@angular/core';
import { EstablishmentDetails } from 'src/app/models/out/EstablishmentDetails';

@Component({
  selector: 'app-establishment-card',
  templateUrl: './establishment-card.component.html',
  styleUrls: ['./establishment-card.component.scss'],
})
export class EstablishmentCardComponent implements OnInit {

  @Input() establishment!: EstablishmentDetails;

  commentCount!: number;
  establishmentNote: any;
  shortDescription!: string;

  //notation related variables
  maxNote: number = 5;
  noteInnerWidth:number = 0;
  moodId: string = "";

  constructor() { }
 
  establishmentImgUrl: string = "../../../assets/images/default_establishment_image.jpg";

  ngOnInit(): void {
    if (this.establishment.comments) {
      this.commentCount = this.establishment.comments.length;
    }
    this.getShortDescription();
    this.getNotes();
  }

  getNotes() {
    if (this.establishment.category) {
      this.moodId = this.establishment.category.id;
    } else {
      this.moodId = "1";
    }
    const percentage = (this.establishment.note.note / this.maxNote) * 100;
    this.noteInnerWidth = percentage;
  }

  getShortDescription() {
    if (this.establishment.description) {
      if (this.establishment.description.length > 300) {
        this.shortDescription = `${this.establishment.description.substring(0, 220)} [...]`;
      } else {
        this.shortDescription = this.establishment.description.toString();
      }
      console.log(this.shortDescription)
    }
  }
}