import { EstablishmentDetails } from "./EstablishmentDetails";

export class InvitationDetails {
    invitationDate : String | undefined;
    status : Number | undefined;
    establishment : EstablishmentDetails | undefined;
    // UserDetails crée une boucle
    receivers : Array<any> | undefined;
    organizer : Object | undefined;
}