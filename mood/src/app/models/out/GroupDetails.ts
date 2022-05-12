import { InvitationDetails } from "./InvitationDetails";

export class GroupDetails {
    title : String | undefined;
    invitations : Array<InvitationDetails> | undefined;
    users : Array<any> | undefined;
}