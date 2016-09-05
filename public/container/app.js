import React from 'react'
import {WholeSearch, AlertPanel,HandlePanel,CheckItemGroupPanelBox,ServiceDetailModal,ServerDetailModal,NotificationPanel} from '../components/healthComponents'

var App=React.createClass({

	render: function()
	{
        
		return(
          <div>
			<div className="row">
				<div className="col-lg-3 col-md-6">
					<WholeSearch />
				</div>
				<div className="col-lg-1 col-md-6"></div>
				<div className="col-lg-3 col-md-6">
					<AlertPanel  alertCheckItems={this.props.alertCheckItems}/>
				</div>
				<div className="col-lg-3 col-md-6">
					<HandlePanel />
				</div>
			</div>
			<hr />
			<div className="row">
				<div className="col-lg-8">
					
					<CheckItemGroupPanelBox groups={this.props.groups}  checkItemStructure={this.props.checkItemStructure} />
					
				</div>
				
				<div className="col-lg-4">
					<NotificationPanel  data={this.props.notificationsContent} totalAlerts={this.props.totalAlerts}/>
					
				</div>
				
			</div>
			<ServiceDetailModal />
			<ServerDetailModal />
			
        </div>

			)
	}
})

export {App}


/*<div className="row">
				<div className="col-lg-8">
					
					<CheckItemGroupPanelBox />
					
				</div>
				
				<div className="col-lg-4">
					<NotificationPanel />
					
				</div>
				
			</div>
			<ServiceDetailModal />
			<ServerDetailModal />
*/