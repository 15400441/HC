import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import ReactDOM from 'react-dom';

//------------------------------------------------------------------------------------------------------------------------------------------------
//put all rendered checkItem into this map. Once an checkItem changed,find it from the map and set its state to reredenr it.
//the structure of this map {key:[],key2:[]}




var AlertPanel = React.createClass({
  getInitialState: function() {
    return {checkItems:[],
            totalAlerts:'0'
           };
  },

  componentDidMount: function()
  {
    
      //get alert server
      //get alert checkItem
      //count number
  },


  render: function() {

     var checkItems = this.state.checkItems.map(function(s) {

        return (
          <CheckItem data={s} key={s.id}  ref={"ref"+s.id}  location="alertPanel"/>
           );

      });

     

    return (
      <div className="panel panel-red">
        <div className="panel-heading">
          <div className="row">
            <div className="col-xs-12 text-left">{this.state.totalAlerts} New alerts {this.props.title} !</div>
          </div>
        </div>
        <div className="panel-body">
           
           {checkItems} 
           
          content here
            
        </div>
        <a href="#">
          <div className="panel-footer">
            <span className="pull-left">View Details</span> <span className="pull-right"> <i className="fa fa-arrow-circle-right"></i> </span>
            <div className="clearfix"></div>
          </div> </a>
    </div>
    )
  }
});



var HandlePanel = React.createClass({
  getInitialState: function() {
    return null;
  },

  componentDidMount: function()
  {
    //get handling server

    //get handling checkItem

    // count number
  },


  render: function() {

    return (
      <div className="panel panel-danger">
        <div className="panel-heading">
          <div className="row">
            <div className="col-xs-6 text-left">2 is handling!</div>
          </div>
        </div>
        <div className="panel-body">
        
         
          content here
        
        </div>
        <a href="#">
          <div className="panel-footer">
            <span className="pull-left">View Details</span> <span className="pull-right"><i className="fa fa-arrow-circle-right"></i> </span>
            <div className="clearfix"></div>
          </div> </a>
  </div>
    )
  }
});






class CheckItem extends Component{

  constructor(props)
  {
    super(props);
    this.detailClick=this.detailClick.bind(this);
  }

  
  detailClick()
  {

   
      var content=this.state.checkItem;
      var params={'id':content.id};
      
      //get detail checkItem
    
      $.ajax({
          url: "/api/checkItem/detail",
          dataType: 'json',
          type:'get',
          data:params,
          cache: false,
          success: function(data) {
            // console.log("here");
             
            if("service"==data.type)
            {
            $('#serviceDetailModal').modal('show');
            serviceDetailModalIns.setState({content:data});
           
            }

            if("server"==data.type)
            {
            $('#serverDetailModal').modal('show');
            //serverDetailModalIns.setState({content:data});

            }
           
             
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(status);
          }.bind(this)
        }); 

  }


  render() {
 
    var checkItem = this.props.data
    var statusStyle='btn btn-success btn-sm dropdown-toggle';
    var wholeStyle={marginTop:'5px',marginLeft:'5px'};


    if ('danger'==checkItem.status)
    {
       statusStyle="btn btn-danger btn-sm dropdown-toggle";
      
    }

    if ('ok'==this.state.checkItem.status)
    {
      statusStyle="btn btn-success btn-sm dropdown-toggle";
      
    }

    // 

    return (
     
      <div className="btn-group" style={wholeStyle}>
        <button type="button" className={statusStyle} data-toggle="dropdown" style={{
        padding: '3px 6px'
      }}>
          {checkItem.name} <span className="addNotifyRed"> {checkItem.todayAlertTimes}   </span>
        </button>
        <ul className="dropdown-menu pull-right" role="menu">
          <li><a href="#">Action</a></li>
          <li><a href="#">Email</a></li>
          <li><a href="#">Pause</a></li>
          <li><a href="#">Handle</a></li>
          <li className="divider"></li>
          <li><a  onClick={this.detailClick}>Show detail</a></li>
        </ul>
     </div>
     

      );
  }
};




class CheckItemGroupPanel extends Component{
  constructor(props)
  {
     super(props);


  }

 

  render() {
      var typeObj = this.props.group;
      var items=this.props.checkItemStructure[typeObj.type][typeObj.groupName]

      var checkItems = items.map(function(s) {

        return (
          <CheckItem data={s} key={s.id}  ref={"ref"+s.id} location="groupPanel"/>
          );

      });
    

    return (

      <div className="panel panel-default">
        <div className="panel-heading">
        
          {typeObj.groupName}
          
          <div className="pull-right">
            <div className="btn-group">
              <button type="button" className="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
                Actions <span className="caret"></span>
              </button>
              <ul className="dropdown-menu pull-right" role="menu">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another action</a></li>
                <li><a href="#">Something else here</a></li>
                <li className="divider"></li>
                <li><a href="#">Separated link</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="panel-body">
           {checkItems}
            <div>myContent:bulbs</div>  
        </div>
        
      </div>

    )
  }
}






class CheckItemGroupPanelBox extends Component{
  constructor(props)
  {
    super(props);
  }
  
  render() {
    const {groups, checkItemStructure}= this.props;

    var checkItemGroups =  groups.map(function(group) {
      //alert("render:"+group);
      return (
        <CheckItemGroupPanel group={group} checkItemStructure={checkItemStructure}  />

        );

    });

    return (
      <div>
          {checkItemGroups}
      </div>
    )
  }
};








var ServiceDetailContent = React.createClass({

  render: function() {
    var signalStyle={backgroundColor:'#5cb85c',padding:'10px'};
    if("danger"==this.props.content.status)
        {
           signalStyle={backgroundColor:'#d9534f',padding:'10px'}
        }

     
    return(
   <div>
  <div className="row">
    <div className="col-md-4">  <label  className="col-sm-3 control-label">IP: </label>   {this.props.content.ip} </div>
    <div className="col-md-3"><label  className="col-sm-3 control-label">Port:</label>  {this.props.content.port}</div>
    <div className="col-md-5"><label  className="col-sm-5 control-label">Current status:</label> {this.props.content.status}</div>
    
  </div>
  <div className="row">
    <div className="col-md-4"><label  className="col-sm-3 control-label">Signal:</label> <div className="col-md-5" style={signalStyle}></div></div>
   
    <div className="col-md-3"><label  className="col-sm-4 control-label">Server:</label>  {this.props.content.serverName}</div>
     <div className="col-md-5"><label  className="col-sm-6 control-label">Today alert times:</label>  {this.props.content.todayAlertTimes}</div>
    
  </div>
  <div className="row">
    <div className="col-md-6"><label className="col-sm-5 control-label">Responsible person:</label>Dylan</div>
  </div>
  <br />
  <div className="row" style={{height: '300px',overflow: 'auto'}}>
  <table className="table table-hover" >
    <thead>
      <tr>
        
        <th>Time</th>
        <th>IS HC Time</th>
        <th>Status</th>
        <th>Message</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
        <td>@mdo</td>
      </tr>
      <tr>
        
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
        <td>@fat</td>
      </tr>
      <tr>
        
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
        <td>@fat</td>
      </tr>
      <tr>
        
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
        <td>@fat</td>
      </tr>
    </tbody>
  </table>
  </div>
</div>
)


  }

});



var Temperature = React.createClass({
  
  render: function() {
  var divStyle={borderColor: 'green'};
    return(
  <div className="tempStatBox">
  <div className="tempStat" style={divStyle}>13°</div>
  <br />
  <div style={{textAlign:'center'}}>
    <span >CPU Temperature</span>
  </div>
  
</div>
)


  }

});


var ServerDetailContent = React.createClass({
  getInitialState: function()
  {
      
      return null;
  },
  
  render: function() {

    //the content used in here can be the state of the parent of this node
    return(
  <div>
  <div className="row">
    <div className="col-md-3">IP:</div>
    <div className="col-md-3">Name:{this.props.content.name}</div>
    <div className="col-md-3">Responsible person:</div>
    <div className="col-md-3">Current status:</div>
  </div>
  <div className="row">
    <div className="col-md-3">Signal:</div>
    <div className="col-md-3">ServerLoad:{this.props.content.serverLoad}</div>
    <div className="col-md-3">Today alert times:</div>
    <div className="col-md-3">Located Address:</div>
  </div>
  <br />
    <hr />
    <div className="row">
    <div className="col-md-6">
        <div id="diskUsage" style={{height: '300px',overflow: 'auto'}}></div>
    </div>
    <div className="col-md-6">
        <Temperature />
    </div>
    </div>
  


</div>
)

  }

});



var ServiceDetailModal = React.createClass({
  getInitialState: function() {
    return {content:""};
  },
  render: function() {
    var solution='';
    //if the checkItem alert, show solution button
    if(true)
    {
     solution= <a type="button" href={'/solutions'} className="btn btn-primary">Find solution</a>
    }
    return (
      <div className="modal fade bs-example-modal-lg"  role="dialog"  id="serviceDetailModal">
        <div className="modal-dialog modal-lg " role="document">
          <div className="modal-content modal-lg">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 className="modal-title">{this.state.content.name}</h4>
            </div>
            <div className="modal-body">

              <ServiceDetailContent  content={this.state.content}/>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
               {solution}
             
            </div>
          </div>
      </div>
  </div>
    )
  }
});




var ServerDetailModal = React.createClass({
  getInitialState: function() {
    return {content:""};
  },
  render: function() {
     var solution='';
    //if the server alert, show solution button
    if(true)
    {
     solution= <a type="button" href={'/solutions'}   className="btn btn-primary">Find solution</a>
    }
    return (
      <div className="modal fade bs-example-modal-lg"  role="dialog"  id="serverDetailModal">
        <div className="modal-dialog modal-lg " role="document">
          <div className="modal-content modal-lg">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 className="modal-title">{this.state.content.name}</h4>
            </div>
            <div className="modal-body">

              <ServerDetailContent  content={this.state.content} />

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              {solution}
            </div>
          </div>
      </div>
  </div>
    )
  }
});



var NotificationPanel=React.createClass({

  getInitialState: function()
  {
    
    return {
           data:{}

           };
  },

  componentDidMount:function()
  {
     // get counts, put results in state, update data in <a>
  },

  render: function(){
    return(
       <div className="panel panel-default">
        <div className="panel-heading">
          <i className="fa fa-bell fa-fw"></i> Notifications Panel
        </div>
        <div className="panel-body">
          <div className="list-group">
            <a href="#" className="list-group-item"> <i className="fa fa-warning fa-fw"></i> CheckItem: <font color="red">{this.state.data.serviceAbnormalCount}</font>/<font color="green">{this.state.data.serviceCount}</font> <span className="pull-right text-muted small"><em>4 minutes ago</em> </span> </a> 
            <a href="#" className="list-group-item"> <i className="fa fa-warning fa-fw"></i> Server: <font color="red">{this.state.data.serverAbnormalCount}</font>/<font color="green">{this.state.data.serverCount}</font> <span className="pull-right text-muted small"><em>4 minutes ago</em> </span> </a> 
           </div>
          <a href="#" className="btn btn-default btn-block">View All Alerts</a>
        </div>
</div> 
         
      )
  }
});




var WholeSearch=React.createClass({

  handelChange: function(e)
  {
      var targetValue=e.target.value.trim();
     
         checkItemComponentMap.forEach(function(value,key,obj){

           for(var i=0;i<value.length;i++)
           {
             var style={marginTop:'5px',marginLeft:'5px'};
             
             if(value[i].state.checkItem.name.indexOf(targetValue)==-1)
             {
                style={display:'none'};
                 
              
             }

             value[i].setState({wholeStyle:style});
           }



         });
        
      
  },

  render: function()
  {
    return(
         <div className="input-group custom-search-form">
              <input type="text" className="form-control" placeholder="Search..."  onChange={this.handelChange}  />
              <span className="input-group-btn">
              <button className="btn btn-default" type="button">
                  <i className="fa fa-search"></i>
              </button>
             </span>
         </div>

      )
  }


})




export{WholeSearch, AlertPanel,HandlePanel,CheckItemGroupPanelBox,ServiceDetailModal,ServerDetailModal,NotificationPanel}
/*
render(
  <WholeSearch />,
  document.getElementById('wholeSearch')

);

var alertPanelIns=render(
  <AlertPanel url="" title="total" />,
  document.getElementById('alertPanel')

);

render(
  <HandlePanel url="" title=""/>,
  document.getElementById('handlePanel')

);


var myAlertPanelIns=render(
  <AlertPanel url=""  title="of my charge"/>,
  document.getElementById('myAlertPanel')

);



render(
  <CheckItemGroupPanelBox />,
  document.getElementById('checkItemGroupPanel')

);



var serviceDetailModalIns=render(
  <ServiceDetailModal />,
  document.getElementById('serviceDetail')

);

var serverDetailModalIns=render(
  <ServerDetailModal  />,
  document.getElementById('serverDetail')

);


var notificationPanelIns= render(
  <NotificationPanel />,
  document.getElementById('notificationPanel')

);



//-------------------------------------------------------------------

//websocket here, receive changed checkItem
//get checkItem according id and change its state
//test with setInterval


/*
var options = {
    protocol: 'https',
    hostname: '/websocket',
    port: 3400
};

// Initiate the connection to the server
var socket=socketCluster.connect(options);

// Listen to an event called 'noticeAlert' from the server
socket.on('noticeAlert', function (data) {
    console.log('data come:'+data);
});







//red=>green

setInterval(function()
  {
    var checkItem= {id:'1',name:'service1',ip:'192.023.2',status:"ok",type:"service"};
    //var checkItem= {id:'10',name:'service1',ip:'192.023.2',status:"ok",type:"server"};
    

    //update  checkItems
     for(var i=0;i<checkItems.length;i++)
        {
          if(checkItem.id==checkItems[i].id)
          {
            checkItems[i]=checkItem;
          }
        }


    //remove change node from checkItemComponentMap
    checkItemComponentMap.forEach(function(value,key,obj)
    {
       if(checkItem.id==key)
       {
         for(var i=0; i<value.length;i++)
         {
           if("alertPanel"==value[i].props.location)
           {
             value.splice(i,1);
           }
         }
       }
    });


    //change target state
    var checkItemIns=checkItemComponentMap.get(checkItem.id);
    for(var i=0;i<checkItemIns.length;i++)
    {
      //console.log(checkItemIns[i]);
      checkItemIns[i].setState({checkItem:checkItem});
    }

   //console.log(checkItemComponentMap);
   

   // update related data
   totalAlerts=0;
   initial("fromCheckItems");
   initial("fromServers");

  },5000);  



 
//green => red

setInterval(function()
  {
    var checkItem= {id:'1',name:'service1',ip:'192.023.2',status:"danger",type:'service'};
    

    //update  checkItems
     for(var i=0;i<checkItems.length;i++)
        {
          if(checkItem.id==checkItems[i].id)
          {
            checkItems[i]=checkItem;
          }
        }

    //console.log(checkItems);

    //change target state
    var checkItemIns=checkItemComponentMap.get(checkItem.id);
    for(var i=0;i<checkItemIns.length;i++)
    {
      //console.log(checkItemIns[i]);
      checkItemIns[i].setState({checkItem:checkItem});
    }

   //console.log(checkItemComponentMap);
   

   // update related data
   totalAlerts=0;
  
   initial();

  },8000);  

  

*/
  
  


       