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

class CastomTab extends React.Component {
    render() {
        return (
            <Tab label={
            <div >
                1<br />
                <span style={{ fontSize: "smaller" }}>ПН</span>
            </div>
            } sx={castomtab}/>
        )
    }
}

export default CastomTab;