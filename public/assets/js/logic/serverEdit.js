


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
		return null;
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
				  <FormGroup label="Name" name="name" value="" type="text"/>
				  <FormGroup label="IP" name="ip" value="" type="text"/>			  
				  <FormGroup label="Located Address" name="address" value="" type="text"/> 
		
				   <FormGroup label="Serverload warn Level" name="serverLoadWarnLevel" value="" type="text"/> 
				  <FormGroup label="Serverload alert level" name="serverLoadAlertLevel" value="" type="text"/> 
				   <FormGroup label="Temperature warn Level" name="temperatureWarnLevel" value="" type="text"/> 
				  <FormGroup label="Temperature alert Level" name="temperatureAlertLevel" value="" type="text"/> 
				  <FormGroup label="Disk usage warn Level" name="diskUsageWarnLevel" value="" type="text"/> 
				  <FormGroup label="Disk usage alert Level" name="diskUsageAlertLevel" value="" type="text"/> 
				  


				  <SubmitButton />
			   </form>
		);
	}
});




ReactDOM.render(	
		<Form url="/server/update" />,
		 document.getElementById('updateForm')
		   
		);


ReactDOM.render(	
		 <Form url="/server/add" />,
		 document.getElementById('addForm')
		   
		);


