import {createElement,Component,render} from './toy-react'



class Mycomponent extends Component{
    render(){
        return <div> my component
            {this.children}
        </div>
    }
}



let a = <Mycomponent id ='a' class="nihao">
    <div>abc</div>
    <div></div>
</Mycomponent>
render(a,document.body)