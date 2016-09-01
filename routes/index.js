var express = require('express');

var router = express.Router();


router.get('/test', function(req, res, next) {
  res.render('test/testVis');
});

router.get('/testEdit', function(req, res, next) {
  res.render('test/testEdit');
});

router.get('/testRedux', function(req, res, next) {
  res.render('test/testRedux');
});



router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/logout', function(req, res, next) {
  res.render('login');
});

router.get('/main', function(req, res, next) {
  res.render('main');
});


router.get('/services', function(req, res, next) {
  

    res.render('services');
  
  
});



//get services 
router.get('/api/checkItems', function(req, res, next) {

    var data=[
       {id:'1',name:'service1',type:'service',groupName:"g1",status:'danger'},
        {id:'2',name:'service2',type:'service',groupName:"g2",status:'ok'},
         {id:'3',name:'service3',type:'service',groupName:"g1",status:'danger'},
        {id:'4',name:'service4',type:'service',groupName:"g2",status:'ok'},
         {id:'5',name:'service5',type:'service',groupName:"g1",status:'danger'},
        {id:'6',name:'service6',type:'service',groupName:"g2",status:'ok'},
         {id:'7',name:'service7',type:'service',groupName:"g1",status:'danger'},
        {id:'8',name:'service8',type:'service',groupName:"g2",status:'ok'},
        {id:'9',name:'server1',type:'server',groupName:"g3",status:'ok'},
        {id:'10',name:'server2',type:'server',groupName:"g4",status:'danger'}
        ]

        for(var i=11;i<300;i++)
        {
          var s={id:i,name:'service6',type:'service',groupName:"g2",status:'ok'};
          data.push(s);
        }


        for(var i=300;i<600;i++)
        {
          var s={id:i,name:'server6',type:'server',groupName:"g3",status:'ok'};
          data.push(s);
        }
  
    res.send(
        
           data
      )

});


router.get('/api/serversPart', function(req, res, next) {
  
    res.send(
        [
        {id:'9',name:'server1',ip:'192.023.2',groupName:"g1",status:'ok'},
        {id:'10',name:'server2',ip:'192.023.3',groupName:"g2",status:'danger'}
       
        ]

      )

});


//get services view of administrator
router.get('/admin/services', function(req, res, next) {
  res.render('admin/services');
});

router.get('/api/checkItem/detail', function(req, res, next) {
  res.send(
        
        {id:'1',name:'service1',ip:'192.023.2', port:'8080',groupName:"g1",status:'danger',personName:"Dylan",todayAlertTimes:'5',serverName:"server1",type:"service"}
      
      )
});


router.get('/service/add', function(req, res, next) {
  res.render('admin/serviceEdit');
});

router.post('/service/add', function(req, res, next) {
  res.render('admin/services');
});

router.get('/service/update', function(req, res, next) {
  res.render('admin/serviceEdit');
});

router.get('/solutions', function(req, res, next) {
  res.render('solutions');
});

router.post('/service/update', function(req, res, next) {
  res.render('admin/services');
});

/*router.get('/tasks', function(req, res, next) {
  res.render('tasks');
});*/


router.get('/activities', function(req, res, next) {
  res.render('activities');
});





router.get('/servers', function(req, res, next) {
  
    res.render('servers');
  
  
});







router.get('/api/servers', function(req, res, next) {
  
    res.send(
        [
        {id:'1',name:'server1',serverLoad:'0.98'},
        {id:'2',name:'server2',serverLoad:'0.67'}
        ]

      )
 
});




router.get('/admin/servers', function(req, res, next) {
  res.render('admin/servers');
});

router.get('/server/add', function(req, res, next) {
  res.render('admin/serverEdit');
});

router.get('/server/update', function(req, res, next) {
  res.render('admin/serverEdit');
});

router.post('/server/update', function(req, res, next) {
  res.render('admin/servers');
});

router.post('/server/add', function(req, res, next) {
  res.render('admin/servers');
});

router.get('/admin/serverGroups', function(req, res, next) {
  res.render('admin/serverGroups');
});





router.get('/api/serverGroups', function(req, res, next) {
  //return json

  var serverGroups=[{
         id:'1',
        name: "serverGroup1"
                    },
        {
          id:'2',
          name: "serverGroup2"
        }];

  res.send(serverGroups);
});







router.get('/alerts', function(req, res, next) {
  res.render('alerts');
});





router.get('/admin/serviceGroups', function(req, res, next) {
  res.render('admin/serviceGroups');
});


router.get('/api/serviceGroups', function(req, res, next) {
  //return json
  var serviceGroups=[{
        id:'1',
        name: "ServiceGroup1"
                    },
        {
          id:'2',
          name: "ServiceGroup2"
        }];

  res.send(serviceGroups);
});





router.post('/serviceGroup/add', function(req, res, next) {

  
  res.render('admin/serviceGroups');
});

router.post('/serviceGroup/update', function(req, res, next) {
  res.render('admin/serviceGroups');
});





router.get('/admin/markets', function(req, res, next) {
  res.render('admin/markets');
});


router.get('/api/markets', function(req, res, next) {

  //return json
  var markets=[{
        id:'1',
        name: "market1"
                    },
        {
          id:'2',
          name: "market2"
        }];

  res.send(markets);


});

router.post('/api/market/add', function(req, res, next) {
  var markets=[{
        id:'1',
        name: "market1"
                    },
        {
          id:'2',
          name: "market2"
        },
        {
          id:'3',
          name: "market3"
        }

        ];

  res.send(markets);
});

router.post('/api/market/update', function(req, res, next) {
  var markets=[{
        id:'1',
        name: "market1"
                    },
        {
          id:'2',
          name: "market2"
        },
        {
          id:'3',
          name: "update"
        }

        ];

  res.send(markets);
});



router.get('/api/market/delete', function(req, res, next) {
  var markets=[{
        id:'1',
        name: "market1"
                    },
        {
          id:'2',
          name: "market2"
        },
        {
          id:'3',
          name: "delete"
        }

        ];

  res.send(markets);
});








module.exports = router;
