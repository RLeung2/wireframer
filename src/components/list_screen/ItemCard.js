import React from 'react';
import {Button, Icon} from 'react-materialize';

const button_style = 
{
    position: 'absolute',
    left: '91.2%',
    top: '10%'
};

const hover_button = 
    <Button style = {button_style}
    floating
    fab={{direction: 'left'}}
    className="amber darken-2"
    large
    >
    <Button floating icon={<Icon children = 'wc' />} className="blue" />
    <Button floating icon={<Icon children = 'airline_seat_individual_suite' />} className="pink darken-4" />
    <Button floating icon={<Icon children = 'child_care' />} className="red" />
    </Button>;

/*
<div className="card z-depth-0 todo-list-link pink-lighten-3">
    <div className="card-content grey-text text-darken-3">
        <span className="card-title">{item.description}</span>
        <span className="card-assigned">{item.assigned_to}</span>
        <span className="card-due">{item.due_date}</span>
        <span className="card-completed">{item.completed}</span>
    </div>
</div>
*/

class ItemCard extends React.Component {
    render() {
        const { item } = this.props; 
        const status = item.completed ? "Completed" : "Pending";
        const color = item.completed ? {color: 'green'} : {color: 'red'};
        return (
            <div className="card z-depth-0 list_item_card">
                <div className="card-content grey-text text-darken-3">
                    <div className="list_item_card_description">{item.description}</div>
                    <div className='list_item_card_assigned_to'>
                    Assigned To: <strong className='assigned_to'>{item.assigned_to}</strong>
                    </div>
                    <div className='list_item_card_due_date'>
                        {item.due_date}
                    </div>
                    <div className='list_item_card_completed' style={color}>{status}</div>
                    {hover_button}
                </div>
            </div>
        );
    }
}
export default ItemCard;