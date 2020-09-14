

class ElementWrapper {
    constructor(type){
        this.root = document.createElement(type);
    }
    setAttribute(name,value){
        this.root.setAttribute(name,value);
    }
    appendChild(component){
        this.root.appendChild(component.root)
    }
}
export class Component{
    constructor(type){
        this.props = Object.create(null);
        this.children = [];
        this._root = null;
    }   
    setAttribute(name,value){
        this.props[name] = value;
    }
    appendChild(component){
        this.children.push(component)
    }
    get root(){
        if(!this._root){
            this._root = this.render().root;
        }
        return this._root;
    }
}
class TextWrapper {
    constructor(content){
        this.root = document.createTextNode(content);
    }

}

export function createElement(tag, attributes, ...children) {
    let a = "";
    if (typeof tag === "string") {
        a = new ElementWrapper(tag);       
    } else {

        a = new tag;
    }

    for (let p in attributes) {
        a.setAttribute(p, attributes[p]);
    }
    let inserChildren = (children )=>{
        for (let child of children) {
            if (typeof child === "string") {
                child = new TextWrapper(child);
            }
            if(typeof child === "object" && child instanceof Array ){
                    inserChildren(child);
            }else{
                a.appendChild(child);
            }

        }
    }


    // let inserChildren = (children) => {
    //     for(let child of children){
    //         if(typeof child === "string"){
    //             child = new TextWrapper(child);
    //         }
    //         if(typeof child === "object" && child instanceof Array){
    //             inserChildren(child);
    //         }else{
    //             a.appendChild(child)
    //         }
    //     }
    // }
    inserChildren(children);
    return a;
}
export function render(component,parentElement){
    parentElement.appendChild(component.root)
}
