import { GroupDetails } from "./GroupDetails";
import { LocalisationDetails } from "./LocalisationDetails";

export class UserDetails {
    name : String | undefined ;
    firstname : String | undefined;
    birthDate : String | undefined;
    email : String | undefined;
    phone : String | undefined;
    role : String | undefined;
    category : Number | undefined;
    localisation : LocalisationDetails | undefined;
    groups : Array<GroupDetails> | undefined;
}