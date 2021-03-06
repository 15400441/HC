

var getServices=function(url,params)
{ 
	$.ajax({
		      url: url,
		      dataType: 'json',
		      type:'get',
		      data:params,
		      cache: false,
		      success: function(data) {

		        dataTabelIns.setState({markets: data});
		        alert("success");

		      }.bind(this),
		      error: function(xhr, status, err) {
		        console.error(status);
		      }.bind(this)
		    });	

}



var FormGroup=React.createClass({
	
	getInitialState: function() {
		var value=this.props.value
	    return {value: value};
	  },

   handleChange: function(event)
   {
	   this.setState({value: event.target.value});
   },
   
   render: function()
	{
		return(
		    <div className="form-group">
				<label className="col-sm-2 control-label">{this.props.label}</label>
				<div className="col-sm-5">
					<input name={this.props.name} type="{this.props.type}" className="form-control"  value={this.state.value}  onChange={this.handleChange}/>
				</div>
			</div>				
		);
	}
});



// <FormGroupSelect name="id"  display="name"  value="2"  url="" />
//the attribute value is used to determine which one should be default select
//display is the attribute shouled be shown to the user
// name is the attribure used to represent the real value of the options
var FormGroupSelect=React.createClass({	
	getInitialState: function() {
		var url=this.props.url;
		var value=this.props.value;
		return {data:[
		              {id:"1",name:"dep1"},
		              {id:"2",name:"dep2"}           
		              ],
		              
		        value:value
		      
		        }
	  },

   handleChange: function(event)
   {
	   this.setState({ value:event.target.value})
   },
   
  
   render: function()
	{
	  var name=this.props.name;
	  var display=this.props.display
	  var options=this.state.data.map(function(option) {
		  
	  	 	 return (
	  	 	        
	  	 			<option value={option[name]}> {option[display]}</option>
	  	 			 
	  	 	      );
	  	 	    });
	
	   
		return(
			<div className="form-group">
				<label className="col-sm-2 control-label">{this.props.label}</label>
				<div className="col-sm-5">
					<select className="form-control" name={this.props.name} value={this.state.value} onChange={this.handleChange}>					         
							{options}	   
					</select>
				</div>
			</div>				
		);
								   
	}
	
});






var SubmitButton=React.createClass({
	render: function()
	{
		return(
			<div className="form-group">
				<div className="col-sm-offset-2 col-sm-10">
					<button type="submit" className="btn btn-primary">submit</button>
				</div>
			</div>	
		
		);
	}
});











var Form=React.createClass({
	getInitialState: function() {
		//initialize the form

		return {service:""};
	  },
	handleSubmit:function(e)
	{
		//e.preventDefault();
		/*$.ajax({
		      url: this.props.url,
		      dataType: 'json',
		      cache: false,
		      success: function(data) {
		        this.setState({data: data});
		      }.bind(this),
		      error: function(xhr, status, err) {
		        console.error(this.props.url, status, err.toString());
		      }.bind(this)
		    });	*/	
	},
	
	render: function()
	{	  
		return(
				<form action={this.props.url} className="form-horizontal" method="post" onSubmit={this.handleSubmit}>
				  <FormGroup label="Name" name="name" value={this.state.service.name} type="text"/>
				  <FormGroup label="IP" name="ip" value={this.state.service.ip} type="text"/>		  
				  <FormGroup label="Port" name="port" value={this.state.service.port} type="text"/> 
				  <FormGroup label="Peace time" name="peaceTime" value={this.state.service.peaceTime} type="text"/> 
				  <FormGroupSelect label="User" name="userID"  display="name"  value={this.state.service.userID}  url="" />
				  <FormGroupSelect label="Service Group" name="serviceGroupID"  display="name"  value={this.state.service.serviceGroupID}  url="" />
				  <FormGroupSelect label="Server" name="serverID"  display="name"  value={this.state.service.serverID}  url="" />
				  <FormGroupSelect label="Market" name="marketID"  display="name"  value={this.state.service.marketID}  url="" />
				  <SubmitButton />
			   </form>
		);
	}
});





var SearchForm=React.createClass({
	mixins: [React.addons.LinkedStateMixin],
	getInitialState: function() {
		//initialize the form
		return {name:'',pageNum:'',totalPages:''};

	  },
	handleSubmit:function(e)
	{
		e.preventDefault();
		alert("handleSubmit");
		console.log(this.state.name);

        var params={"name":this.state.name,"pageNum":this.state.pageNum,"totalPages":this.state.totalPages};
        getMarkets(this.props.url,params);
		
	},

	
	
	render: function()
	{	  
		return(
				<div className="form-group">
					<form action="/services" id="searchForm" method="get">
						<select className="form-control" name="serviceGroupID" style={{width:"20%", display:"inline"}} id="depSelect" placeholder="service group">
						  <option > service group</option>
						</select>{" "}
						<select className="form-control" name="serverID" style={{width:'10%', display:'inline'}} id="serverSelect" placeholder="server">
						  	<option > market</option>
						</select>{" "}
						<select className="form-control" name="marketID" style={{width:'10%', display:'inline'}} id="marketSelect" placeholder="market">
						  	<option > server</option>
						</select>{" "}
						 <input name="name" type="text"  className="form-control" style={{width:'10%', display:'inline'}} placeholder="name" />{" "}
						 <input name="status" type="text"  className="form-control" style={{width:'10%', display:'inline'}} placeholder="status" />{" "}
						 <input name="ip" type="text"  className="form-control" style={{width:'10%', display:'inline'}} placeholder="ip" /> {" "}
						 <input name="pageNum" id="pageNum" type="hidden"  /> 
						 <input id="totalPages" type="hidden" />
						<button type="submit" className="btn btn-primary">Search</button>{" "}
					    
					</form>
				</div>
		);
	}
});







var DataTabel=React.createClass({
	getInitialState: function() {
		//initialize the form
		return {serviceViews:[]};
	  },

	componentDidMount: function()
	{
	   var url=this.props.url;
       getServices(url,{});
	},

	updateClick: function(operation,serviceView)
	{

		$("#updateTab").attr("class", "show");
		addForm.setState({service:serviceView});
	},

	deleteClick: function(id)
	{
		//alert("id:"+id);
        $.ajax({
		      url: '/api/service/delete',
		      dataType: 'json',
		      type:'get',
		      data:{id:id},
		      cache: false,
		      success: function(data) {

		        dataTabelIns.setState({serviceViews: data});
		        alert(" delete success");

		      }.bind(this),
		      error: function(xhr, status, err) {
		        console.error(status);
		      }.bind(this)
		    });	
	},
	
	render: function()
	{	
		var rows=this.state.serviceViews.map(function(serviceView){
			
               return(
                    <tr>
						<td>{serviceView.name }</td>
						<td>{serviceView.groupName }</td>
						<td>{serviceView.serverName }</td>
						<td>{serviceView.ip }</td>
						<td>{serviceView.port }</td>
						<td>{serviceView.statusView }</td>
						<td>{serviceView.peaceTime }</td>
						<td>{serviceView.todayAlertTimes }</td>
						<td><a href="#" onClick={()=>this.updateClick("update",serviceView)} >update</a></td>
	                    <td><a href="#" onClick={()=>this.deleteClick(serviceView.id)}>delete</a></td>
					</tr>	
               	)
		},this)


		return(
				<div className="table-responsive">
					<table className="table table-bordered table-hover table-striped">
						<thead>
							<tr>
								<th>Name</th>
								<th>Service Group</th>
								<th>Server</th>
								<th>IP</th>
								<th>Port</th>
								<th>Status</th>
								<th>Peace Time</th>
								<th>Today alert times</th>
								<th>Update</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							  
					            {rows}						
																				
						</tbody>
					</table>
				</div>
		);
	}
});










var addForm=ReactDOM.render(	
		<Form url="/service/update"  data="" />,
		 document.getElementById('updateForm')
		   
		);


ReactDOM.render(	
		 <Form url="/service/add" />,
		 document.getElementById('addForm')
		   
		);

ReactDOM.render(	
		<SearchForm url="/api/services" />,
		 document.getElementById('searchForm')
		   
		);


var dataTabelIns=ReactDOM.render(	
				 <DataTabel />,
				 document.getElementById('dataTabel')
				   
				);


