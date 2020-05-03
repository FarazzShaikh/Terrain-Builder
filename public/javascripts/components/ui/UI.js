export default class UI {
    constructor() {
        this.objects = {}
    }
    
    addObject(Obj, options) {
        let obj = new Obj(options)
        let name = obj.name
        this.objects[name] = obj
    }
}