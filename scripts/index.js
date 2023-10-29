(function (window) {
  var App = window.App || {};

  var myMsg = Ext.Msg.show({
    title: 'Approve Confirmation',
    message: 'Confirm to approve the selected items?',
    multiline: 'true',
    prompt:{
      placeHolder:"PLACEHOLDER TEXT HERE",
    },
    iconCls: 'fa fa-check-square-o',
    buttonText: {
      ok: 'Yes',
      cancel: 'No'
    },
    height:350,
    width:500,
    defaultTextHeight:210,
    fn:function(btn,text){
         //http processes
    }
  });

  //Set emptyString
  myMsg.textArea.setEmptyText('My Message');
  window.App = App;
})(window);