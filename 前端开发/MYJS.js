function drawTree(treeData,x) {
var  myChart = echarts.init(document.getElementById(x));//div元素节点的对象
myChart.setOption({
    tooltip : {
        trigger : 'item',
        triggerOn : 'none'
    },
    series : [ {
        type : 'tree',
        name : 'TREE_ECHARTS',
        data : treeData,
        top : '2%',
        left : '10%',
        bottom : '30%',
        right : '15%',
        symbolSize : 20,
        label : {
            normal : {
                position : 'left',
                verticalAlign : 'middle',
                align : 'right',
                fontSize: 30,
                color:"black"
            }
        },
        leaves : {
            label : {
                position : 'right',
                verticalAlign : 'middle',
                align : 'left'
            }
        },
        expandAndCollapse : true ,
        initialTreeDepth : 10  //展示层级数
    } ]
});

//树绑定事件
 myChart.on('click', function(params) {
    var name = params.data.name;//点击的节点的name
    var value = params.data.value;//点击的节点的value
    //调用点击事件
    
}); 
}



$('#input').click(function(){      //清空原本文本框的值
    $('#input').html('');
});
$("button").click(deal);
function deal(){
   
    var treeDate=Array();
    var i,j;
    var text=$("#input").val();  //获取输入
    var arr=Array();
    arr=text.split("\n");
    var l=0;

    for(i=0;i<arr.length;)
    {
        for(j=i+1;j<arr.length;j++)
        {
            if(arr[j]=='')
            {
                break;
            }

        }  //此时i~j-1为一组数据
        var k;
       
        var doctor=[],master=[],bachelor=[]; //用来存放学生数据
        for(k=i;k<j;k++)
        {
           
            var d=0,m=0,b=0; //用来记录级别
            if(k==i)
            {
                treeDate.push({"name":"",
                "children":[{"name":"博士生",
            "children":[]},{"name":"硕士生","children":[]},
        {"name":"本科生","children":[]}]
            });
            }
            if(arr[k].includes("导师")){
                treeDate[l]["name"]=arr[k].slice(3);
            }
            else if(arr[k].includes("博士生")){
                
                for(d=0;d<doctor.length;d++){
                    if(arr[k].slice(0,5)==doctor[d]["name"]){
                        var student=arr[k].slice(9);
                        var student1=student.split("、");//里面存放每个学生姓名
                        for(var x=0;x<student1.length;x++){
                            var studentName=student1[x];
                            student={"name":studentName,"children":[]};
                            doctor[d]["children"].push(student);
                        }
                        break;
                    }
                }
                if(d==doctor.length){
                    var student={"name":arr[k].slice(0,5),"children":[]};
                    doctor.push(student);
                    student=arr[k].slice(9).split("、");
                    
                    for(var x=0;x<student.length;x++){
                        var s={"name":student[x],"children":[]};
                        doctor[d]["children"].push(s);
                    }
                }
            }
            else if(arr[k].includes("硕士生")){
                for(d=0;d<master.length;d++){
                    if(arr[k].slice(0,5)==master[d]["name"]){
                        var student=arr[k].slice(9);
                        var student1=student.split("、");//里面存放每个学生姓名
                        for(var x=0;x<student1.length;x++){
                            var studentName=student1[x];
                            student={"name":studentName,"children":[]};
                            master[d]["children"].push(student);
                        }
                        break;
                    }
                }
                if(d==master.length){
                    var student={"name":arr[k].slice(0,5),"children":[]};
                    master.push(student);
                    student=arr[k].slice(9).split("、");
                    for(var x=0;x<student.length;x++){
                        var s={"name":student[x],"children":[]};
                        master[d]["children"].push(s);
                    }
                }
            }
            else{
                for(d=0;d<bachelor.length;d++){
                    if(arr[k].slice(0,5)==bachelor[d]["name"]){
                        var student=arr[k].slice(9);
                        var student1=student.split("、");//里面存放每个学生姓名
                        for(var x=0;x<student1.length;x++){
                            var studentName=student1[x];
                            student={"name":studentName,"children":[]};
                            bachelor[d]["children"].push(student);
                        }
                        break;
                    }
                }
                if(d==bachelor.length){
                    var student={"name":arr[k].slice(0,5),"children":[]};
                    bachelor.push(student);
                    student=arr[k].slice(9).split("、");
                    for(var x=0;x<student.length;x++){
                        var s={"name":student[x],"children":[]};
                        bachelor[d]["children"].push(s);
                    }
                }
            }

 
        }
        treeDate[l]["children"][0]["children"]=doctor;
        treeDate[l]["children"][1]["children"]=master;
        treeDate[l]["children"][2]["children"]=bachelor;


        l=l+1;
        i=j+1;
    }
   for(i=0;i<treeDate.length;i++)
   {
       var data=[];
       data[0]=treeDate[i];
       var x=i.toString();
       
       $("body").append("<div id='x' style=\"width:100px0;height:900px;\"></div>");
       $("#x").attr('id',x);
       data[0]=treeDate[i];
       drawTree(data,x);
   }
  
   

}

