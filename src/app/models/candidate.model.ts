import { PoliticalParty } from "./political-party.model";

export class Candidate {
    _id?: string;
    name?: string;
    last_name?: string;
    personal_id?: number;
    political_party?: PoliticalParty
}
