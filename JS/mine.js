var tdata = document.getElementById('tbody');
var tbodyone = document.getElementById('tbodyone');
var exit = document.getElementById('exit');
var input = document.querySelector("input");
var button=document.querySelector('button');
var bContainer=[];
var xValues = [0];
var yValues = [0];




$(document).ready(function(){

    $(".loading").fadeOut(1000,function () {
        $("body").css({overflow: 'auto'})
    })

})

async function data(displayData) {
    let customersData = await fetch('https://raw.githubusercontent.com/ahmedoweis72/jsonServer/main/db.json')
    let container = await customersData.json();
   console.log(container);
    localStorage.setItem('container',JSON.stringify(container))
    displayData()
}

data(displayData);
filter()

function displayData() {
    let container=JSON.parse(localStorage.getItem('container'))
    let customersData = structuredClone(container.customers);

    let transactionsData = structuredClone(container.transactions);


    let data = ''
    for (let i = 0; i < customersData.length; i++) {
        for (let j = 0; j < transactionsData.length; j++) {
            if (customersData[i].id == transactionsData[j].customer_id) {
                bContainer.push({
                    name:customersData[i].name,
                    date:transactionsData[j].date,
                    amount:transactionsData[j].amount
                })
                data += `<tbody >
       
                            <tr>
                            <td id="cName">${customersData[i].name}</td>
                            <td>${transactionsData[j].date}</td>
                            <td id="tAmount">${transactionsData[j].amount}</td>
                            </tr>
                            </tbody>`
            }

        }


    }

    tdata.innerHTML = data
    localStorage.setItem("compainedObj",JSON.stringify(bContainer))
    
}

function filter() {
    
    let bContainer=JSON.parse(localStorage.getItem("compainedObj"))
    button.addEventListener('click',function () {
            
        let data = ''
        for (let i = 0; i < bContainer.length; i++) {
            if (input.value==bContainer[i].amount||input.value.toLowerCase().includes(bContainer[i].name.toLowerCase())) {
                
                yValues.push(bContainer[i].amount)
                xValues.push(bContainer[i].date)


                data += `<tbody >
                <tr>
                <td id="cName"><i class="text-bg-success me-3  spinner-grow"></i> ${bContainer[i].name}</td>
                <td id="cDate">${bContainer[i].date}</td>
                <td id="tAmount">${bContainer[i].amount}</td>
                </tr>
                </tbody>`

                
            }
           
          
            
        }
              
    if (data.includes('<tbody >')) {
        tbodyone.innerHTML = data+` <canvas id="myChart" style="width:50%;max-width:500px"></canvas>`;

       
       
        
        
                
                
        var barColors = ["red", "green","blue","orange","brown"];
                
                new Chart("myChart", {
                  type: "bar",
                  data: {
                    labels: xValues,
                    datasets: [{
                      backgroundColor: barColors,
                      data: yValues
                    }]
                  },
                  options: {
                    legend: {display: false},
                    title: {
                      display: true,
                      text: "Customer amount per day"
                    }
                }
                });   
                
    }
    else
    {
        tbodyone.innerHTML=`    <h1 class="text-center "><i class="text-bg-danger  spinner-grow"></i> not found! try valid data <i class="text-bg-danger  spinner-grow"></i></h1>`
    }
        
        if (document.querySelector('#searched').classList.contains("d-none")) {
            document.querySelector('#searched').classList.replace("d-none","d-block")
            document.querySelector('#hide').classList.add("d-none")

        }
       
        
        
        
    })
  
   


}

exit.addEventListener('click',function(){
    document.querySelector('#searched').classList.replace("d-block","d-none")
    document.querySelector('#hide').classList.replace("d-none","d-block")
    document.querySelector("input").value=null;
    
        for (let i = 0; i < yValues.length; i++) {
            if (yValues.length!=0) {
                 yValues.pop()
        }
        
    }
        for (let i = 0; i < xValues.length; i++) {
            if (xValues.length!=0) {
                xValues.pop()
        }
        
    }
    
    


})










