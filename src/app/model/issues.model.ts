export class Issues {
    severity: string;
    updateDate: string;
    line: string;
    author: string;
    rule: string;
    project: string;
    effort: string;
    message: string;
    creationDate: string;
    type: string;
    tags: string[];
    component: string;
    organization: string;
    debt: string;
    key: string;
    hash: string;
    status: string;
    static Resp = class {
        total: number;
		issues: Issues[];
    }
}
