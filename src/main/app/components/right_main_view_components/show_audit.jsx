import React from 'react';
import TreeActions from '../../actions/tree_actions.js';

class ShowAudit extends React.Component {
    constructor(props){
        super(props);
        TreeActions.getaudit(this.props.workingNode);
    }

    render() {
        let node = this.props.workingNode;
        let auditList;
        if (node.audit) {
            auditList = node.audit.entries.map((el, index) => {
                return (
                  <li key={el.id}>
                      Event Date : {new Date(el.eventDate).toString()} <br/>

                      Log Date : {new Date(el.logDate).toString()} <br/>

                      Principal Name : {el.principalName} <br/>

                      Event ID : {el.eventId} <br/>

                      comment : {el.comment} <br/><br/>
                  </li>
                );
            })
        }
        return (
            <div className="right-main-view-show-working-button">
                <ul>
                    {auditList}
                </ul>
            </div>
        )
    }
}

module.exports = ShowAudit;