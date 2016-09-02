import { List, Map } from 'immutable';
import React from 'react'

var init = Map({groups:[],
                  alertItems:{},
                  handleItmes:{},
                  count:{},
                  checkItemStructure:{}
                  });


var checkItems=[];  //store all checkItems
var alertCheckItems=[];   //store alert checkItems
var checkItemStructure={};  //sort checkItems via group  {server:{group1:[s1,s2],group2:[s3,s4]},  service:{group1:[],group2[]}}  Map{string:Map{string:array[]}}
var totalAlerts=0;
var notificationsContent={} // store notifications panel's data




//run after checkItems has been initalized
var initial=function()
{
    alertCheckItems=[];
    var serviceAbnormalCount=0;
    var serverAbnormalCount=0;
    var serviceCount=0;
    var serverCount=0;
    checkItems.map(function(checkItem){
       if("service"==checkItem.type)
          serviceCount++;
        if("server"==checkItem.type)
          serverCount++    


     //initial alertCheckItems and notificationContet
      if('danger'==checkItem.status)
      {
        alertCheckItems.push(checkItem);
        if("service"==checkItem.type)
          serviceAbnormalCount++;
        if("server"==checkItem.type)
          serverAbnormalCount++
        totalAlerts++;
      }
  

    });
     
    notificationsContent["serviceAbnormalCount"]=serviceAbnormalCount;
    notificationsContent["serviceCount"]=serviceCount;
    notificationsContent["serverAbnormalCount"]=serverAbnormalCount;
    notificationsContent["serverCount"]=serverCount;

 /*
    alertPanelIns.setState({checkItems:alertCheckItems});
    alertPanelIns.setState({totalAlerts:totalAlerts});
    notificationPanelIns.setState({"data":notificationsContent});
    */

}




 var initialCheckItems=function(url,params)
    {
      //alert("initialCheckItems");
      $.ajax({
              url: url,
              dataType: 'json',
              type:'get',
              data:params,
              async: false,   
              cache: false,
              success: function(data) {
                //alert("data:"+data)
                checkItems=data;
                
                initialCheckItemStructure();
                initial();

               
              },
              error: function(xhr, status, err) {
                console.error(status);
              }
            }); 
    }


  var initialCheckItemStructure=function()
    {   
        var type=''
        var groupName=""

        for(var i=0;i < checkItems.length;i++)
         {
          type=checkItems[i].type;
          groupName=checkItems[i].groupName;

          if(checkItemStructure.hasOwnProperty(type))
          {

                if(checkItemStructure[type].hasOwnProperty(groupName))
              {

                checkItemStructure[type][groupName].push(checkItems[i])
              }
              else
              {
                var array=[];
                array.push(checkItems[i]);
                checkItemStructure[type][groupName]=array;
              }
          }
          else
          {
            var content={};
            checkItemStructure[type]=content;
            var array=[];
            array.push(checkItems[i]);
            checkItemStructure[type][groupName]=array;
          }

      }

      var groups=[];
      console.log(checkItemStructure);  
      //alert("checkItemStructure:"+checkItemStructure);

      for(var key in checkItemStructure)
      {
         
         console.log(key);

         var types=Object.keys(checkItemStructure[key]);
         var arr=[]
         types.map(function(t){
            var typeObj={};
            typeObj.type=key;
            typeObj.groupName=t;
            arr.push(typeObj);
         })
        
         groups=groups.concat(arr);
         
      }
     
      console.log("before set groups:"+groups);
      init=init.set("groups",groups);
      console.log("set groups");
      console.log(init.get('groups'))
      init=init.set("checkItemStructure",checkItemStructure);
     
    }



 





initialCheckItems('/api/checkItems','');

 var reducer= function(state, action) {
  switch(action.type) {
    case 'ADD_TODO':
       return todos.push(Map(action.payload));
    case 'TOGGLE_TODO':
      return todos.map(t => {
		    if(t.get('id') === action.payload) {
		      return t.update('isDone', isDone => !isDone);
		    } else {
		      return t;
		    }
		  });
    default:
      {
      console.log("state");

      state=init;
      console.log(state);
      return state;
    }

}
}

export{reducer}