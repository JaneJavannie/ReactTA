import React from 'react';
import kladr from './kladr.json';

class Dropdown extends React.Component {
    constructor() {
        super();
        this.state = {
            placeholder: "Выберите город",
            allItems: kladr,
            visibleItems: []
        }
    }
    
    handleClickOutside() {
        this.setState({
            listOpen: false
        })
    } 
    
    listChange(event) {
        this.setState({
            inputText: event.target.value
        })
    }

    FilledList(props) {
        return (
            <select className="dd-list" size={props.list.size} multiple name="selectN[]" onChange={props.cb}>
                {props.list.map((item) => (
                    <option className="dd-list-item"  value={item.City} >{item.City}</option>
                ))}
            </select>
        );
    }

    handleChange(event) {
        const visible = event.target.value.length > 0 ? 
            this.state.allItems.filter(item => item.City.toLowerCase().startsWith(event.target.value.toLowerCase())) : [];
            this.setState(prevState => ({
                visibleItems: visible
            }))
    }

    render() {
        const list  = this.state.visibleItems
        const { listOpen, placeholder } = this.state
        

        return (
            <div className="dd-wrapper">
                <div className="dd-header">
                    <div className="dd-header-title">
                        <input type="text" value={this.state.inputText} name="fname"  placeholder={placeholder} 
                        onChange={this.handleChange.bind(this)}/>
                    </div>
                </div>
                {list.length > 0
                    ? <this.FilledList list={list} cb={this.listChange.bind(this)} /> 
                    : <div></div>
                }
            </div>
        )
    }
}

export default Dropdown;