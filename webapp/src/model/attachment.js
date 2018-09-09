export default class{
    constructor(codAttachment, name, status, required = false, download = false) {
        this.codAttachment = codAttachment;
        this.name = name;
        this.required = required;
        this.status = status;
        this.download = download;
    }
}