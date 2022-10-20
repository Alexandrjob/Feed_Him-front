const React = require("react");
import {
    Tab
} from '@mui/material';

const castomtab = {
    
    borderRadius: '10px',
    border: '2px solid',
    minWidth: 48,
    mr: 1,
    p:0,
  };

class CalenarItem extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            day: props.day,
        }; 
    }

    render() {
        return (
            <Tab label={
            <div >
                {this.state.day}<br />
                <span style={{ fontSize: "smaller" }}>ПН</span>
            </div>
            } sx={castomtab}/>
        )
    }
}

export default CalenarItem;