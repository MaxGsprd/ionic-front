import { LocalisationDetails } from "./LocalisationDetails";
import { CommentDetails } from "./CommentDetails";

export class EstablishmentDetails {
    id : Number | undefined;
    name : String | undefined;
    description : String | undefined;
    address : LocalisationDetails | undefined;
    images : Array<any> | undefined;
    note : any | undefined;
    comments : Array<CommentDetails> | undefined;
    category : any | undefined;

    //Temporary
    imageTemp?: string;
}