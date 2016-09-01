
var map=new Map();


var getMarkets=function(url,params)
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


var editModal=function(operation)
	{
		
		if(operation=='add')
		{
		 $('#serviceGroupEdit').modal('show');
		 $('#modalTitle').text("Add market");
		 $('#marketEditForm').attr('action','/api/market/add');
		 $('#edit').text("Add");
		
		 //alert("reset");
		
		}

		else
		{
			//update
			//alert("udpate:"+market.name)
		 $('#serviceGroupEdit').modal('show');
		  $('#modalTitle').text("Update market")
		 $('#marketEditForm').attr('action','/api/market/update');
		  $('#edit').text("Update");
		
		}
	}



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

	addClick:function(operation)
	{
		map.get("editForm").setState({data:{name:'',address:'',id:''}});
		editModal(operation);
	},
	
	render: function()
	{	  
		return(
				<div className="form-group">
					<form  id="searchForm" method="get" onSubmit={this.handleSubmit}>
						<input name="name" type="text"  className="form-control" style={{width:'40%', display:'inline'}} placeholder="name" valueLink={this.linkState('name')} />
						<input name="pageNum" id="pageNum" type="hidden" valueLink={this.linkState('pageNum')}  /> 
						<input id="totalPages" type="hidden" valueLink={this.linkState('totalPages')} /> {" "}
						<button type="submit" className="btn btn-primary">Search</button>{" "}
						<a className="btn btn-primary" onClick={()=>this.addClick("add")} href="#">Add</a>
					</form>
				</div>
		);
	}
});





var DataTabel=React.createClass({
	getInitialState: function() {
		//initialize the form
		return {markets:[]};
	  },

	componentDidMount: function()
	{
       getMarkets("/api/markets",{});
	},

	updateClick: function(operation,market)
	{
		alert(market.name)
		var data={name:market.name,address:market.address,id:market.id};
     
		 map.get("editForm").setState({data:data});
         editModal(operation);
	},

	deleteClick: function(id)
	{
		//alert("id:"+id);
        $.ajax({
		      url: '/api/market/delete',
		      dataType: 'json',
		      type:'get',
		      data:{id:id},
		      cache: false,
		      success: function(data) {

		        dataTabelIns.setState({markets: data});
		        alert(" delete success");

		      }.bind(this),
		      error: function(xhr, status, err) {
		        console.error(status);
		      }.bind(this)
		    });	
	},
	
	render: function()
	{	
		var rows=this.state.markets.map(function(market){
			
               return(
                    <tr>
						<td>{market.name}</td>
						<td>{market.address}</td>
						<td><a href="#" onClick={()=>this.updateClick("update",market)} >update</a></td>
	                    <td><a href="#" onClick={()=>this.deleteClick(market.id)}>delete</a></td>
					</tr>	
               	)
		},this)


		return(
				<div className="table-responsive">
					<table className="table table-bordered table-hover table-striped">
						<thead>
							<tr>
								<th>Name</th>
								<th>Address</th>
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




var EditForm=React.createClass(
{
	getInitialState:function()
	{
		
		return {data:""};
	},

	componentDidMount: function()
	{
		map.set("editForm",this);
	},
	
	  
	handleChange: function(e)
	{

	   var name=e.target.name;
	   console.log(name);
	   var value=e.target.value; 
       var data=this.state.data;
       data[name]=value;
       this.setState({data:data});
       
	},
	
	handleSubmit:function(e)
	{
		e.preventDefault();
		//alert("handleSubmit");

		var url=$("#marketEditForm").attr("action");
		//alert(url);  add new markets and refresh data
		$.ajax({
		      url: url,
		      dataType: 'json',
		      type:'post',
		      cache: false,
		      success: function(data) {

		        dataTabelIns.setState({markets: data});
		        if(url.includes('add'))
		           alert("add success");
		       else{
		        alert("update success");
		    }

		      }.bind(this),
		      error: function(xhr, status, err) {
		        console.error("failure");
		      }.bind(this)
		    });	
	},

	
	render: function()
	{	  
		
		return(
		     <form action="" method="post"  id="marketEditForm" onSubmit={this.handleSubmit} >

						 <input name="name" type="text"  className="form-control" style={{width:"60%"}} placeholder="name" value={this.state.data.name} onChange={this.handleChange}/> 
						 <br />							
						 <input name="address" type="text" className="form-control" style={{width:"60%"}}  placeholder="address"  value={this.state.data.address} onChange={this.handleChange}/> 	                                                       
						 <br/>	
						  <input name="id" type="hidden"   value={this.state.data.id} onChange={this.handleChange}/> 					
						<button type="submit" className="btn btn-primary" id="edit"></button>
						
									    
			</form>
		)
	}
  
});





var EditModal=React.createClass(
{
	
	render :function()
	{
		
		return(
              <div className="modal fade " role="dialog" id="serviceGroupEdit">
				<div className="modal-dialog  " role="document">
					<div className="modal-content ">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">×</span>
							</button>
							<h4 className="modal-title" id="modalTitle"></h4>
						</div>
						<div className="modal-body">
				           
                            <EditForm />
							
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
							
						</div>
						</div>
					</div>
				</div>
           )
	}
})



ReactDOM.render(	
		<SearchForm url="/api/markets" />,
		 document.getElementById('searchForm')
		   
		);


var dataTabelIns=ReactDOM.render(	
				 <DataTabel />,
				 document.getElementById('dataTabel')
				   
				);


ReactDOM.render(	
				 <EditModal />,
				 document.getElementById('editModal')
				   
				);




