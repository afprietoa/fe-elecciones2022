import { Candidate } from "./candidate.model";
import { Table } from "./table.model";

export class Vote {
    _id?: string;
    election_type?: string;
    elective_position?: string;
    year?: string;
    candidate: Candidate;
    table: Table;
}
