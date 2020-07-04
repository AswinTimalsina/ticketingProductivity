import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Comment from '../comment/comment';
import {db} from '../../services/firebase';
import {withRouter} from 'react-router-dom';


class comments extends Component{
    state={
        commens : null
    }

    componentDidMount(){
        db.collection('tickets')
        .doc(this.props.match.params.id)
        .collection('comment')
        .orderBy('time', 'desc')
        .get().then(snapshot=>{
            const comms = [];
            snapshot.forEach(doc=>{
                let com = doc.data();
                comms.push(com);
            })
            this.setState({commens:comms})
        })
    }


    render(){
        const camments = this.state.commens && this.state.commens.map(comms=>{
            return(
                <div style={{display: 'flex'}}>
                <Comment usersComment={comms.comment} commentTime={comms.time}/><a href=''>edit</a></div>
            )
        })
        return(
            <Aux>
               {camments}
            </Aux>
        )
    }
}

export default withRouter(comments);